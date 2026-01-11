import React, { useState } from 'react';
import { X, Image, Video, FileText, Globe, Smile } from 'lucide-react';
import Avatar from './Avatar';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audience, setAudience] = useState('public');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ content, imageUrl, audience });
    setContent('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] border border-gray-200 flex flex-col">

        {/* Header (fixed) */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Create Post
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                <Globe size={14} />
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="public">Public</option>
                  <option value="connections">Connections</option>
                  <option value="private">Only me</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* Author */}
          <div className="flex items-start gap-4 pt-6">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
              size="lg"
            />
            <div>
              <p className="font-bold text-gray-900">You</p>
              <p className="text-sm text-gray-600">Professional Network</p>
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
              className="w-full min-h-24 p-4 resize-none focus:outline-none text-lg bg-gray-50 rounded-2xl border border-gray-200 focus:border-blue-800"
              rows={4}
            />

            {/* Image Preview */}
            {imageUrl && (
              <div className="mt-4 relative group">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full rounded-xl max-h-64 object-cover"
                />
                <button
                  onClick={() => setImageUrl('')}
                  className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Media Options */}
            <div className="mt-6 p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Add to your post
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:shadow-md transition-shadow">
                  <Image size={20} className="text-green-500" />
                  <span className="text-sm">Photo</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:shadow-md transition-shadow">
                  <Video size={20} className="text-red-500" />
                  <span className="text-sm">Video</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:shadow-md transition-shadow">
                  <FileText size={20} className="text-blue-500" />
                  <span className="text-sm">Document</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:shadow-md transition-shadow">
                  <Smile size={20} className="text-amber-500" />
                  <span className="text-sm">Feeling</span>
                </button>
              </div>

              {/* Image URL Input */}
              <div className="mt-4">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste an image URL..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="mt-6 w-full py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
