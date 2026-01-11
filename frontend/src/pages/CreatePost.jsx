import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ImageIcon, X } from 'lucide-react';

export default function LinkedInFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'Senior Product Manager at TechCorp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      timestamp: '2h ago',
      content: 'Excited to share that our team just launched a new feature that will help thousands of users! Hard work pays off. 🚀',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
      likes: 142,
      comments: [],
      shares: 23,
      liked: false
    },
    {
      id: 2,
      author: 'Michael Chen',
      role: 'Software Engineer | AI Enthusiast',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      timestamp: '5h ago',
      content: 'Just finished reading "Clean Code" by Robert Martin. Key takeaway: Write code that humans can understand, not just machines. What\'s your favorite programming book?',
      image: null,
      likes: 87,
      comments: [],
      shares: 12,
      liked: false
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      role: 'UX Designer at DesignHub',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      timestamp: '1d ago',
      content: 'Design tip of the day: Always put your users first. Empathy is the foundation of great user experience.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      likes: 234,
      comments: [],
      shares: 45,
      liked: false
    },
    {
      id: 4,
      author: 'David Park',
      role: 'Marketing Director | Growth Strategist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      timestamp: '2d ago',
      content: 'Our Q4 campaign exceeded expectations by 150%! Grateful for an amazing team that never stops innovating. Here\'s to continued growth in 2026! 📊',
      image: null,
      likes: 198,
      comments: [],
      shares: 31,
      liked: false
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'You',
      role: 'Professional',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      timestamp: 'Just now',
      content: newPostContent,
      image: newPostImage || null,
      likes: 0,
      comments: [],
      shares: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage('');
    setShowCreatePost(false);
  };

  const handleAddComment = (postId) => {
    const commentText = commentTexts[postId];
    if (!commentText?.trim()) return;

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [
              ...post.comments, 
              {
                id: Date.now(),
                author: 'You',
                content: commentText,
                timestamp: 'Just now'
              }
            ]
          }
        : post
    ));

    setCommentTexts({ ...commentTexts, [postId]: '' });
    setActiveCommentBox(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Create Post Card */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex items-center space-x-3">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
              alt="Your avatar" 
              className="w-12 h-12 rounded-full"
            />
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50"
            >
              Start a post
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create a post</h2>
                <button onClick={() => setShowCreatePost(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
                    alt="Your avatar" 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">You</p>
                    <p className="text-sm text-gray-500">Professional</p>
                  </div>
                </div>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="w-full min-h-37.5 p-2 border-0 resize-none focus:outline-none text-lg"
                />
                {newPostImage && (
                  <div className="relative mt-2">
                    <img src={newPostImage} alt="Post" className="w-full rounded-lg" />
                    <button
                      onClick={() => setNewPostImage('')}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <div className="relative">
                    <input
                      type="text"
                      value={newPostImage}
                      onChange={(e) => setNewPostImage(e.target.value)}
                      placeholder="Image URL (optional)"
                      className="border rounded px-3 py-2 w-64 text-sm"
                    />
                    <ImageIcon size={20} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow mb-4">
            {/* Post Header */}
            <div className="p-4 flex items-start space-x-3">
              <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{post.author}</h3>
                <p className="text-xs text-gray-600">{post.role}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <img src={post.image} alt="Post content" className="w-full" />
            )}

            {/* Post Stats */}
            <div className="px-4 py-2 flex justify-between text-xs text-gray-600">
              <span>{post.likes} likes</span>
              <span>{post.comments.length} comments • {post.shares} shares</span>
            </div>

            {/* Action Buttons */}
            <div className="border-t px-2 py-1 flex justify-around">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 ${post.liked ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                <span className="text-sm font-semibold">Like</span>
              </button>
              <button
                onClick={() => setActiveCommentBox(post.id)}
                className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 text-gray-600"
              >
                <MessageCircle size={20} />
                <span className="text-sm font-semibold">Comment</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 text-gray-600">
                <Share2 size={20} />
                <span className="text-sm font-semibold">Share</span>
              </button>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="border-t px-4 py-3 space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-2">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
                      alt={comment.author} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            {activeCommentBox === post.id && (
              <div className="border-t px-4 py-3 flex space-x-2">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
                  alt="Your avatar" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={commentTexts[post.id] || ''}
                    onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-600"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!commentTexts[post.id]?.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}