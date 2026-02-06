import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChatBot } from './components/ChatBot';
import { Login } from './components/Login';
import { DocumentGenerator } from './components/DocumentGenerator';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('hrms_user');
  });

  const handleLogin = (username: string) => {
    setUser(username);
    localStorage.setItem('hrms_user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
    setActiveCategory(null);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* Login screen disabled for now
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  */

  return (
    <div className="app-layout">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar
          activeCategory={activeCategory}
          onCategorySelect={(cat) => {
            setActiveCategory(cat);
            if (window.innerWidth <= 768) setIsSidebarOpen(false);
          }}
        />
      </div>

      <div className="sign-out-container">
        <button
          onClick={handleLogout}
          className="sign-out-btn"
        >
          Sign Out
        </button>
      </div>
      <main className="content">
        {activeCategory === 'doc-gen' ? (
          <DocumentGenerator />
        ) : (
          <ChatBot
            activeCategory={activeCategory}
            onClearCategory={() => setActiveCategory(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
