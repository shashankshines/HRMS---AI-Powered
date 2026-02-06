import { Book, Shield, Calendar, Plane, DoorOpen, Briefcase, FileText, Home } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
    activeCategory: string | null;
    onCategorySelect: (category: string | null) => void;
}

const categories = [
    { name: 'Employee Handbook', icon: Book },
    { name: 'Leave & Attendance', icon: Calendar },
    { name: 'Code of Conduct', icon: Shield },
    { name: 'Compensation', icon: Briefcase },
    { name: 'Travel & Expense', icon: Plane },
    { name: 'Exit & Separation', icon: DoorOpen },
    { name: 'Ethics & POSH', icon: Shield },
    { name: 'Remote & Hybrid Work', icon: FileText },
];

export const Sidebar = ({ activeCategory, onCategorySelect }: SidebarProps) => {
    return (
        <div className="sidebar glass-effect">
            <div className="sidebar-header">
                <div className="logo-section">
                    <div className="logo-circle" />
                    <h1>HR Portal</h1>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-group">
                    <p className="nav-label">POLICIES</p>
                    <button
                        className={`nav-item ${activeCategory === null ? 'active' : ''}`}
                        onClick={() => onCategorySelect(null)}
                    >
                        <Home size={18} />
                        <span>All Policies</span>
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            className={`nav-item ${activeCategory === cat.name ? 'active' : ''}`}
                            onClick={() => onCategorySelect(cat.name)}
                        >
                            <cat.icon size={18} />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className="nav-group">
                    <p className="nav-label">AI TOOLS</p>
                    <button
                        className={`nav-item ${activeCategory === 'doc-gen' ? 'active' : ''}`}
                        onClick={() => onCategorySelect('doc-gen')}
                    >
                        <div className="icon-wrapper" style={{
                            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                            borderRadius: '6px',
                            padding: '4px',
                            display: 'flex'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <span style={{ fontWeight: 600, background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Document Assistant
                        </span>
                    </button>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">JD</div>
                    <div className="user-info">
                        <p className="user-name">John Doe</p>
                        <p className="user-role">Product Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
