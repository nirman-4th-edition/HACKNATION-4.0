import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', user_id: 1 });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // Fetch details of a selected post
  const handlePostClick = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:5001/posts/${postId}`);
      setSelectedPost(response.data);
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  // Create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/posts', newPost);
      setNewPost({ title: '', content: '', user_id: 1 });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5001/posts/${postId}`);
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  // Update a post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/posts/${selectedPost.id}`, selectedPost);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  // Add a comment to a post
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5001/posts/${selectedPost.id}/comments`, {
        content: newComment,
        user_id: 1, // dummy user_id for commenter
      });
      const response = await axios.get(`http://localhost:5001/posts/${selectedPost.id}`);
      setSelectedPost(response.data);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        

        {/* Create New Post */}
        <h3>Create New Post</h3>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>

      {/* Post Details */}
      <div className="main-content">
        {selectedPost ? (
          <div>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button onClick={() => handleDeletePost(selectedPost.id)} className="delete-btn">
              Delete Post
            </button>

            <h3>Edit Post</h3>
            <form onSubmit={handleUpdatePost}>
              <input
                type="text"
                value={selectedPost.title}
                onChange={e => setSelectedPost({ ...selectedPost, title: e.target.value })}
                required
              />
              <textarea
                value={selectedPost.content}
                onChange={e => setSelectedPost({ ...selectedPost, content: e.target.value })}
                required
              />
              <button type="submit">Update Post</button>
            </form>

            {/* Comments Section */}
            <h3>Comments</h3>
            <ul>
              {selectedPost.comments && selectedPost.comments.map(comment => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>

            {/* Add Comment */}
            <form onSubmit={handleAddComment}>
              <textarea
                placeholder="Add a comment"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        ) : (
          <p>Select a post to see details and comments.</p>
        )}
      </div>
    </div>
  );
}

export default Forum;
