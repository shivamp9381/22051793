const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return {};
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};

export const fetchPostComments = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};