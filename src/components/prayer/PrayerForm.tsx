'use client';

import React, { useState } from 'react';

interface PrayerFormProps {
  onSubmit: (content: string, isAnonymous: boolean) => void;
}

export const PrayerForm: React.FC<PrayerFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    onSubmit(content.trim(), isAnonymous);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="기도문을 작성해주세요..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        <div className="text-sm text-gray-500 mt-1">
          {content.length}/1000자
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">익명으로 작성</span>
        </label>

        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            !content.trim() || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? '작성 중...' : '기도문 작성'}
        </button>
      </div>
    </form>
  );
};
