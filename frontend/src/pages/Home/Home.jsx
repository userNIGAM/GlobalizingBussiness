import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Post from './Post';
import CreatePostModal from './CreatePostModal';

const Home = () => {
 const { isDark } = useContext(ThemeContext);
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
      comments: [
        { id: 1, author: 'Alex Turner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', content: 'Congratulations Sarah! This looks amazing!', timestamp: '1h ago' },
        { id: 2, author: 'Maria Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', content: 'Great work team! Can\'t wait to try it out.', timestamp: '30m ago' }
      ],
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
      comments: [
        { id: 1, author: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', content: 'The Pragmatic Programmer is my go-to recommendation!', timestamp: '3h ago' }
      ],
      shares: 12,
      liked: true
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
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [
              ...post.comments, 
              {
                id: Date.now(),
                author: 'You',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
                content: commentText,
                timestamp: 'Just now'
              }
            ]
          }
        : post
    ));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
  };

  const handleCreatePost = ({ content, imageUrl }) => {
    const newPost = {
      id: Date.now(),
      author: 'You',
      role: 'Professional at ConnectHub',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      timestamp: 'Just now',
      content,
      image: imageUrl || null,
      likes: 0,
      comments: [],
      shares: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-linear-to-b from-gray-50 to-white'} transition-colors duration-200`}>
      <Header onCreatePost={() => setShowCreatePost(true)} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 shrink-0">
            <Sidebar />
          </div>

          {/* Main Feed */}
          <div className="flex-1">
            {/* Welcome Card */}
            {/* <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-8 border border-purple-100"> */}
              {/* <div className="flex items-center justify-between"> */}
                {/* <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back! 👋</h2>
                  <p className="text-gray-600">Stay updated with what professionals in your network are talking about.</p>
                </div> */}
                {/* <div className="text-right">
                  <p className="text-sm text-gray-500">Your network</p>
                  <p className="text-2xl font-bold text-blue-700">1,248 professionals</p>
                </div> */}
              {/* </div> */}
            {/* </div> */}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

export default Home