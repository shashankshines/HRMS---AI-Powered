import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, UserCircle } from 'lucide-react';
import './Login.css';

interface LoginProps {
    onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock authentication - Case insensitive email, ignore whitespace
        if (email.toLowerCase().trim() === 'demo@company.com' && password === 'hrms2026') {
            setIsLoading(false);
            onLogin('John Doe'); // Passing mock user name
        } else {
            setIsLoading(false);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <motion.div
                className="login-card glass-effect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="login-header">
                    <div className="logo-circle-lg">
                        <UserCircle size={40} color="white" />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your HR Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            className="error-message"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="spinner"></span>
                        ) : (
                            <>
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </button>

                    <div className="login-footer">
                        <p>Credentials for demo:</p>
                        <code>demo@company.com / hrms2026</code>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
