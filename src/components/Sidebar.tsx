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
