'use client';

import React, { useState } from 'react';
import { PrayerPost } from './PrayerPost';

interface Prayer {
  id: string;
  content: string;
  author: {
    name: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  likes: number;
  isBookmarked?: boolean;
}

interface PrayerFeedProps {
  prayers: Prayer[];
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onBookmark: (id: string) => void;
}

export const PrayerFeed: React.FC<PrayerFeedProps> = ({
  prayers,
  onLike,
  onComment,
  onShare,
  onBookmark,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-4">
      {prayers.map((prayer) => (
        <PrayerPost
          key={prayer.id}
          id={prayer.id}
          content={prayer.content}
          author={prayer.author}
          createdAt={prayer.createdAt}
          likes={prayer.likes}
          isBookmarked={prayer.isBookmarked}
          onLike={() => onLike(prayer.id)}
          onComment={() => onComment(prayer.id)}
          onShare={() => onShare(prayer.id)}
          onBookmark={() => onBookmark(prayer.id)}
        />
      ))}
    </div>
  );
}; 