import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Send, Smile, Image as ImageIcon } from 'lucide-react';
import Avatar from './Avatar';
import ActionButton from './ActionButton';

export default function Post({ post, onLike, onComment, onShare, onSave }) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
      setShowCommentInput(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar src={post.avatar} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{post.author}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                  {post.role.split('at')[0].trim()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{post.role.split('at')[1] ? 'at ' + post.role.split('at')[1] : post.role}</p>
              <p className="text-xs text-gray-400 mt-1">🕒 {post.timestamp}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
              </div>
              <span className="ml-3">{post.likes} reactions</span>
            </div>
            <span>{post.comments.length} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
        <div className="flex justify-around">
          <ActionButton
            icon={<Heart size={20} />}
            activeIcon={<Heart size={20} fill="currentColor" />}
            label="Like"
            isActive={post.liked}
            onClick={() => onLike(post.id)}
            activeColor="text-red-500"
            count={post.likes}
          />
          
          <ActionButton
            icon={<MessageCircle size={20} />}
            label="Comment"
            onClick={() => setShowCommentInput(!showCommentInput)}
            count={post.comments.length}
          />
          
          <ActionButton
            icon={<Share2 size={20} />}
            label="Share"
            onClick={() => onShare(post.id)}
            count={post.shares}
          />
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <form onSubmit={handleCommentSubmit} className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" size="sm" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
                <button type="button" className="absolute right-14 top-3 text-gray-400 hover:text-gray-600">
                  <Smile size={20} />
                </button>
                <button type="button" className="absolute right-8 top-3 text-gray-400 hover:text-gray-600">
                  <ImageIcon size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="p-3 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        )}

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="mt-4 space-y-4">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar src={comment.avatar} size="sm" />
                <div className="flex-1">
                  <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-4">
                    <button className="text-xs text-gray-500 hover:text-purple-600">Like</button>
                    <button className="text-xs text-gray-500 hover:text-purple-600">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}