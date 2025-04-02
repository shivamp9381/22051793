import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import TopUsers from './Components/Topusers';
import TrendingPosts from './Components/Trendingposts';
import Feed from './Components/Feed';
import './styles.css';

function App() {
  const [activePage, setActivePage] = useState('top-users');
  
  const renderActivePage = () => {
    switch (activePage) {
      case 'top-users':
        return <TopUsers />;
      case 'trending-posts':
        return <TrendingPosts />;
      case 'feed':
        return <Feed />;
      default:
        return <TopUsers />;
    }
  };
  
  return (
    <div className="app">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;