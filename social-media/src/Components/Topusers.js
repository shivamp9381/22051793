import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchUserPosts } from '../Services/api';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTopUsers = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        
        let usersWithPostCounts = [];
        
        const batchSize = 5;
        for (let i = 0; i < Object.keys(users).length; i += batchSize) {
          const batch = Object.keys(users).slice(i, i + batchSize);
          const batchPromises = batch.map(async (userId) => {
            const posts = await fetchUserPosts(userId);
            return {
              id: userId,
              name: users[userId],
              postCount: posts.length,
              avatar: `https://picsum.photos/200?random=${userId}`
            };
          });
          
          const batchResults = await Promise.all(batchPromises);
          usersWithPostCounts = [...usersWithPostCounts, ...batchResults];
        }
        
        const sortedUsers = usersWithPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error loading top users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTopUsers();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading top users...</div>;
  }
  
  return (
    <div className="top-users-container">
      <h2>Top 5 Users by Post Count</h2>
      <div className="users-grid">
        {topUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
            <h3>{user.name}</h3>
            <p>{user.postCount} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopUsers;