'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  likes: number;
}

interface PrayerPostProps {
  id: string;
  content: string;
  author: {
    name: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  likes: number;
  comments: Comment[];
  onLike: () => void;
  onComment: (comment: { content: string; author: { name: string; isAnonymous: boolean } }) => void;
  onLikeComment: (commentId: string) => void;
  onShare: () => void;
  onBookmark: () => void;
  isBookmarked?: boolean;
}

export const PrayerPost: React.FC<PrayerPostProps> = ({
  id,
  content,
  author,
  createdAt,
  likes,
  comments,
  onLike,
  onComment,
  onLikeComment,
  onShare,
  onBookmark,
  isBookmarked = false,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentClick = () => {
    setShowComments(!showComments);
    if (!showComments) {
      setShowCommentForm(false);
    }
  };

  const handleAddComment = () => {
    setShowCommentForm(true);
    setShowComments(true);
  };

  const handleCommentSubmit = (comment: { content: string; author: { name: string; isAnonymous: boolean } }) => {
    onComment(comment);
    setShowCommentForm(false);
  };

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
          onClick={handleCommentClick}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <span>💬</span>
          <span>댓글 {comments.length > 0 && `(${comments.length})`}</span>
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

      {/* 댓글 섹션 */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-800">댓글</h4>
            <button
              onClick={handleAddComment}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              댓글 작성
            </button>
          </div>
          
          {showCommentForm && (
            <CommentForm
              prayerId={id}
              onSubmit={handleCommentSubmit}
              onCancel={() => setShowCommentForm(false)}
            />
          )}
          
          <CommentList
            comments={comments}
            onLikeComment={onLikeComment}
          />
        </div>
      )}
    </div>
  );
}; 