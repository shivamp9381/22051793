import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../Services/api';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTrendingPosts = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        
        let allPosts = [];
        
        const userIds = Object.keys(users);
        const batchSize = 3;
        
        for (let i = 0; i < userIds.length; i += batchSize) {
          const batch = userIds.slice(i, i + batchSize);
          const batchPromises = batch.map(async (userId) => {
            const posts = await fetchUserPosts(userId);
            
            const postPromises = posts.map(async (post) => {
              const comments = await fetchPostComments(post.id);
              return {
                ...post,
                author: users[post.userid],
                commentCount: comments.length,
                comments: comments,
                image: `https://picsum.photos/400/200?random=${post.id}`
              };
            });
            
            return await Promise.all(postPromises);
          });
          
          const batchResults = await Promise.all(batchPromises);
          allPosts = [...allPosts, ...batchResults.flat()];
        }
        
        const maxCommentCount = Math.max(...allPosts.map(post => post.commentCount), 0);
        
        const trending = allPosts.filter(post => post.commentCount === maxCommentCount);
        
        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error loading trending posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTrendingPosts();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading trending posts...</div>;
  }
  
  return (
    <div className="trending-posts-container">
      <h2>Trending Posts</h2>
      {trendingPosts.length === 0 ? (
        <p>No trending posts found</p>
      ) : (
        <div className="posts-grid">
          {trendingPosts.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.image} alt="Post content" className="post-image" />
              <div className="post-content">
                <h3>{post.author}</h3>
                <p>{post.content}</p>
                <div className="post-stats">
                  <span>{post.commentCount} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;