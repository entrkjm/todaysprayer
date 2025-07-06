'use client';

import React, { useState } from 'react';

interface CommentFormProps {
  prayerId: string;
  onSubmit: (comment: { content: string; author: { name: string; isAnonymous: boolean } }) => void;
  onCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  prayerId,
  onSubmit,
  onCancel,
}) => {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      author: {
        name: isAnonymous ? authorName || '익명' : authorName,
        isAnonymous,
      },
    });

    setContent('');
    setAuthorName('');
    setIsAnonymous(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 작성해주세요..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`anonymous-${prayerId}`}
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded"
          />
          <label htmlFor={`anonymous-${prayerId}`} className="text-sm text-gray-600">
            익명으로 작성
          </label>
        </div>
        
        {!isAnonymous && (
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="이름 (선택사항)"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          댓글 작성
        </button>
      </div>
    </form>
  );
}; 