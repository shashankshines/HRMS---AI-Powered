import { useState, useEffect } from 'react';
import { Search, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePolicySearch } from '../hooks/usePolicySearch';
import './ChatArea.css';

interface ChatAreaProps {
    activeCategory: string | null;
    onClearCategory: () => void;
}

export const ChatArea = ({ activeCategory, onClearCategory }: ChatAreaProps) => {
    const [searchValue, setSearchValue] = useState('');
    const { search, searchByCategory, result, results, isSearching, error, clearResults } = usePolicySearch();

    useEffect(() => {
        if (activeCategory) {
            searchByCategory(activeCategory);
            setSearchValue('');
        } else {
            clearResults();
        }
    }, [activeCategory, searchByCategory, clearResults]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            onClearCategory();
            search(searchValue);
        }
    };

    return (
        <div className="chat-area">
            <div className="chat-container">
                <header className="chat-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {activeCategory ? activeCategory : 'How can I help you with policies today?'}
                    </motion.h2>
                    <p>
                        {activeCategory
                            ? `Showing all policies under ${activeCategory}`
                            : 'Search across Employee Handbook, Leave Policies, and more.'}
                    </p>
                    {activeCategory && (
                        <button className="clear-filter-btn" onClick={onClearCategory}>
                            <X size={14} /> Clear filter
                        </button>
                    )}
                </header>

                <form className="search-box-container" onSubmit={handleSubmit}>
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="e.g., How many casual leaves can I take?"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            disabled={isSearching}
                        />
                        {isSearching && <div className="loading-spinner" />}
                    </div>
                    <button type="submit" className="search-button" disabled={isSearching}>
                        Search
                    </button>
                </form>

                <div className="results-container">
                    <AnimatePresence mode="wait">
                        {results && results.length > 0 && (
                            <motion.div
                                key="results-list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="results-list"
                            >
                                {results.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="result-card"
                                    >
                                        <div className="result-header">
                                            <div className="category-badge">{item.category}</div>
                                            <h3>{item.title}</h3>
                                        </div>
                                        <div className="result-content">
                                            <p className="answer-text"><strong>Answer:</strong> {item.content}</p>
                                            {item.conditions && item.conditions.length > 0 && (
                                                <div className="conditions-section">
                                                    <p className="section-label">Conditions:</p>
                                                    <ul>
                                                        {item.conditions.map((c, i) => (
                                                            <li key={i}>{c}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <div className="result-footer">
                                            <div className="source-info">
                                                <Info size={14} />
                                                <span>Source: {item.documentName}, Section {item.section}</span>
                                            </div>
                                            <div className="version-info">
                                                Effective: {item.effectiveDate} • v{item.version}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {result && !results?.length && (
                            <motion.div
                                key={result.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="result-card"
                            >
                                <div className="result-header">
                                    <div className="category-badge">{result.category}</div>
                                    <h3>{result.title}</h3>
                                </div>
                                <div className="result-content">
                                    <p className="answer-text"><strong>Answer:</strong> {result.content}</p>
                                    {result.conditions && result.conditions.length > 0 && (
                                        <div className="conditions-section">
                                            <p className="section-label">Conditions:</p>
                                            <ul>
                                                {result.conditions.map((c, i) => (
                                                    <li key={i}>{c}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="result-footer">
                                    <div className="source-info">
                                        <Info size={14} />
                                        <span>Source: {result.documentName}, Section {result.section}</span>
                                    </div>
                                    <div className="version-info">
                                        Effective: {result.effectiveDate} • v{result.version}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="error-card"
                            >
                                <AlertCircle size={20} />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!activeCategory && (
                    <div className="quick-suggestions">
                        <p>Quick pointers:</p>
                        <div className="suggestions-grid">
                            <button onClick={() => { setSearchValue('casual leave'); search('casual leave'); }}>Casual Leaves</button>
                            <button onClick={() => { setSearchValue('notice period'); search('notice period'); }}>Notice Period</button>
                            <button onClick={() => { setSearchValue('wfh probation'); search('wfh probation'); }}>WFH in Probation</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
