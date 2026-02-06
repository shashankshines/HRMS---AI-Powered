import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { policies, type Policy } from '../data/policies';
import './ChatBot.css';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    policy?: Policy;
}

interface ChatBotProps {
    activeCategory: string | null;
    onClearCategory: () => void;
}

const suggestedQuestions = [
    "How many casual leaves can I take?",
    "What is the notice period?",
    "Can I work from home during probation?",
    "Tell me about leave policies",
];

const greetings = [
    "Hello! I'm your HR Policy Assistant. How can I help you today?",
    "Hi there! Ask me anything about company policies.",
    "Welcome! I'm here to answer your HR-related questions.",
];

function findBestMatch(query: string): { exact: Policy | null; related: Policy[] } {
    const q = query.toLowerCase();

    // Keywords mapping for better understanding
    const keywordMap: Record<string, string[]> = {
        'leave': ['casual leave', 'leave policy', 'vacation', 'time off', 'day off', 'leaves', 'sick', 'holiday'],
        'notice': ['notice period', 'resignation', 'quit', 'leaving', 'exit', 'terminate'],
        'wfh': ['work from home', 'remote', 'wfh', 'hybrid', 'probation', 'office'],
        'salary': ['salary', 'pay', 'compensation', 'bonus', 'increment', 'payment', 'money'],
        'travel': ['travel', 'expense', 'reimbursement', 'trip', 'business travel'],
        'conduct': ['conduct', 'behavior', 'ethics', 'harassment', 'posh', 'complaint'],
        'hours': ['hours', 'timing', 'schedule', 'working hours', 'shift', 'overtime'],
    };

    let exactMatch: Policy | null = null;
    const relatedPolicies: Policy[] = [];

    // Check for keyword matches
    for (const [key, keywords] of Object.entries(keywordMap)) {
        if (keywords.some(kw => q.includes(kw))) {
            const found = policies.find(p =>
                p.id.startsWith(key) ||
                p.title.toLowerCase().includes(key) ||
                p.content.toLowerCase().includes(key)
            );
            if (found) {
                exactMatch = found;
                break;
            }
        }
    }

    // Fallback to basic matching
    if (!exactMatch) {
        exactMatch = policies.find(p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        ) || null;
    }

    // If no exact match, find related policies based on query words
    if (!exactMatch) {
        const queryWords = q.split(/\s+/).filter(word => word.length > 2);

        policies.forEach(policy => {
            const policyText = `${policy.title} ${policy.content} ${policy.category}`.toLowerCase();
            const hasRelation = queryWords.some(word => policyText.includes(word));
            if (hasRelation && !relatedPolicies.includes(policy)) {
                relatedPolicies.push(policy);
            }
        });

        // If still no related, suggest by category similarity
        if (relatedPolicies.length === 0) {
            // Pick 3 random policies as suggestions
            const shuffled = [...policies].sort(() => 0.5 - Math.random());
            relatedPolicies.push(...shuffled.slice(0, 3));
        }
    }

    return { exact: exactMatch, related: relatedPolicies.slice(0, 3) };
}

function generateBotResponse(result: { exact: Policy | null; related: Policy[] }): string {
    const { exact, related } = result;

    if (exact) {
        let response = exact.content;

        if (exact.conditions && exact.conditions.length > 0) {
            response += "\n\n📋 **Important conditions:**\n";
            exact.conditions.forEach(c => {
                response += `• ${c}\n`;
            });
        }

        return response;
    }

    // No exact match - provide helpful suggestions
    let response = "I couldn't find specific information about that in our current HR policies.\n\n";

    if (related.length > 0) {
        response += "💡 **You might be interested in:**\n\n";
        related.forEach(policy => {
            response += `• **${policy.title}** _(${policy.category})_\n`;
        });
        response += "\n_Try asking about one of these topics, or browse the categories in the sidebar._";
    } else {
        response += "For detailed assistance, please reach out to the HR team directly.";
    }

    return response;
}

export const ChatBot = ({ activeCategory, onClearCategory }: ChatBotProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'greeting',
            type: 'bot',
            content: greetings[Math.floor(Math.random() * greetings.length)],
            timestamp: new Date(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (activeCategory) {
            // Add a "user" message showing what category was selected
            const userQuery: Message = {
                id: `user-nav-${Date.now()}`,
                type: 'user',
                content: `Show me policies about ${activeCategory}`,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, userQuery]);
            setIsTyping(true);

            // Simulate typing delay
            setTimeout(() => {
                const categoryPolicies = policies.filter(
                    p => p.category.toLowerCase() === activeCategory.toLowerCase()
                );

                let botContent: string;
                if (categoryPolicies.length > 0) {
                    botContent = `Here are the **${categoryPolicies.length} policies** under **${activeCategory}**:\n\n`;
                    categoryPolicies.forEach((p, idx) => {
                        botContent += `📌 **${p.title}**\n${p.content}\n`;
                        if (p.conditions && p.conditions.length > 0) {
                            botContent += `\n*Conditions:*\n`;
                            p.conditions.forEach(c => {
                                botContent += `• ${c}\n`;
                            });
                        }
                        if (idx < categoryPolicies.length - 1) {
                            botContent += `\n---\n\n`;
                        }
                    });
                } else {
                    botContent = `I don't have any specific policies documented under **${activeCategory}** yet. This category may still be under development. Would you like to ask about something else, or should I connect you with HR?`;
                }

                const botMessage: Message = {
                    id: `bot-${Date.now()}`,
                    type: 'bot',
                    content: botContent,
                    timestamp: new Date(),
                };

                setIsTyping(false);
                setMessages(prev => [...prev, botMessage]);
            }, 600);
        }
    }, [activeCategory]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            type: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        onClearCategory();
        setIsTyping(true);

        // Simulate typing delay for natural feel
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

        const searchResult = findBestMatch(inputValue);
        const botResponse = generateBotResponse(searchResult);

        const botMessage: Message = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: botResponse,
            timestamp: new Date(),
            policy: searchResult.exact || undefined,
        };

        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (question: string) => {
        setInputValue(question);
        inputRef.current?.focus();
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <div className="chatbot-header-icon">
                    <Bot size={24} />
                </div>
                <div className="chatbot-header-info">
                    <h2>HR Policy Assistant</h2>
                    <span className="status-badge">
                        <span className="status-dot"></span>
                        Online
                    </span>
                </div>
            </div>

            <div className="chatbot-messages">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`message ${message.type}`}
                        >
                            <div className="message-avatar">
                                {message.type === 'bot' ? (
                                    <Bot size={18} />
                                ) : (
                                    <User size={18} />
                                )}
                            </div>
                            <div className="message-content">
                                <div className="message-bubble">
                                    {message.content.split('\n').map((line, i) => (
                                        <p key={i} dangerouslySetInnerHTML={{
                                            __html: line
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/^• /, '• ')
                                        }} />
                                    ))}
                                </div>
                                {message.policy && (
                                    <div className="message-source">
                                        <Info size={12} />
                                        <span>Source: {message.policy.documentName}, {message.policy.section}</span>
                                    </div>
                                )}
                                <span className="message-time">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="message bot"
                    >
                        <div className="message-avatar">
                            <Bot size={18} />
                        </div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
                <div className="suggestions-section">
                    <div className="suggestions-header">
                        <Sparkles size={16} />
                        <span>Suggested questions</span>
                    </div>
                    <div className="suggestions-list">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                className="suggestion-chip"
                                onClick={() => handleSuggestionClick(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="chatbot-input-area">
                <div className="input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask me anything about HR policies..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isTyping}
                    />
                    <button
                        className="send-button"
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                    >
                        <Send size={20} />
                    </button>
                </div>
                <p className="input-hint">Press Enter to send • Powered by AI</p>
            </div>
        </div>
    );
};
