import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatBot } from './components/ChatBot';
import { Login } from './components/Login';
import { DocumentGenerator } from './components/DocumentGenerator';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
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
