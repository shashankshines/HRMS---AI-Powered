import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatBot } from './components/ChatBot';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="app-layout">
      <Sidebar
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />
      <main className="content">
        <ChatBot
          activeCategory={activeCategory}
          onClearCategory={() => setActiveCategory(null)}
        />
      </main>
    </div>
  );
}

export default App;
