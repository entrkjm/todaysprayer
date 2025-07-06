'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

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

interface CommentListProps {
  comments: Comment[];
  onLikeComment: (commentId: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onLikeComment,
}) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <div className="font-medium text-sm text-gray-800">
              {comment.author.isAnonymous ? `익명${comment.author.name}` : comment.author.name}
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: ko })}
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-2 whitespace-pre-wrap">{comment.content}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <button
              onClick={() => onLikeComment(comment.id)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <span>❤️</span>
              <span>{comment.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 