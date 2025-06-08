'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PrayerPostProps {
  id: string;
  content: string;
  author: {
    name: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  likes: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
  isBookmarked?: boolean;
}

export const PrayerPost: React.FC<PrayerPostProps> = ({
  content,
  author,
  createdAt,
  likes,
  onLike,
  onComment,
  onShare,
  onBookmark,
  isBookmarked = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="font-medium text-gray-800">
          {author.isAnonymous ? `익명${author.name}` : author.name}
        </div>
        <span className="mx-2 text-gray-400">•</span>
        <div className="text-sm text-gray-500">
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ko })}
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{content}</p>
      
      <div className="flex items-center space-x-4 text-gray-500">
        <button
          onClick={onLike}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <span>❤️</span>
          <span>{likes}</span>
        </button>
        
        <button
          onClick={onComment}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <span>💬</span>
          <span>댓글</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <span>📤</span>
          <span>공유</span>
        </button>
        
        <button
          onClick={onBookmark}
          className={`flex items-center space-x-1 ${
            isBookmarked ? 'text-yellow-500' : 'hover:text-yellow-500'
          }`}
        >
          <span>{isBookmarked ? '🔖' : '📑'}</span>
          <span>북마크</span>
        </button>
      </div>
    </div>
  );
}; 