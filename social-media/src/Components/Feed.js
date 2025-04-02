import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchUserPosts } from '../Services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadFeed = async () => {
    setLoading(true);
    try {
      const users = await fetchUsers();
      
      let allPosts = [];
      
      const userIds = Object.keys(users);
      const batchSize = 3;
      
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        const batchPromises = batch.map(async (userId) => {
          const userPosts = await fetchUserPosts(userId);
          return userPosts.map(post => ({
            ...post,
            author: users[post.userid],
            image: `https://picsum.photos/400/200?random=${post.id}`
          }));
        });
        
        const batchResults = await Promise.all(batchPromises);
        allPosts = [...allPosts, ...batchResults.flat()];
      }
      
      const sortedPosts = allPosts.sort((a, b) => b.id - a.id);
      
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadFeed();
    
    const pollingInterval = setInterval(() => {
      loadFeed();
    }, 10000); 
    
    return () => clearInterval(pollingInterval);
  }, []);
  
  if (loading && posts.length === 0) {
    return <div className="loading">Loading feed...</div>;
  }
  
  return (
    <div className="feed-container">
      <h2>Recent Posts Feed</h2>
      <button className="refresh-button" onClick={loadFeed}>Refresh Feed</button>
      <div className="feed-posts">
        {posts.map((post) => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <h3>{post.author}</h3>
              <span className="post-id">#{post.id}</span>
            </div>
            <img src={post.image} alt="Post content" className="post-image" />
            <div className="post-content">
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;