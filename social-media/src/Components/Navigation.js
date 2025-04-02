import React from 'react';

const Navigation = ({ activePage, setActivePage }) => {
  return (
    <nav className="navbar">
      <div className="logo">Social Media Analytics</div>
      <ul className="nav-links">
        <li 
          className={activePage === 'top-users' ? 'active' : ''} 
          onClick={() => setActivePage('top-users')}
        >
          Top Users
        </li>
        <li 
          className={activePage === 'trending-posts' ? 'active' : ''} 
          onClick={() => setActivePage('trending-posts')}
        >
          Trending Posts
        </li>
        <li 
          className={activePage === 'feed' ? 'active' : ''} 
          onClick={() => setActivePage('feed')}
        >
          Feed
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;