'use client';

import React, { useState } from 'react';
import { PrayerPost } from './PrayerPost';

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

interface Prayer {
  id: string;
  content: string;
  author: {
    name: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isBookmarked?: boolean;
}

interface PrayerFeedProps {
  prayers: Prayer[];
  onLike: (id: string) => void;
  onComment: (id: string, comment: { content: string; author: { name: string; isAnonymous: boolean } }) => void;
  onLikeComment: (prayerId: string, commentId: string) => void;
  onShare: (id: string) => void;
  onBookmark: (id: string) => void;
}

export const PrayerFeed: React.FC<PrayerFeedProps> = ({
  prayers,
  onLike,
  onComment,
  onLikeComment,
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
          comments={prayer.comments}
          isBookmarked={prayer.isBookmarked}
          onLike={() => onLike(prayer.id)}
          onComment={(comment) => onComment(prayer.id, comment)}
          onLikeComment={(commentId) => onLikeComment(prayer.id, commentId)}
          onShare={() => onShare(prayer.id)}
          onBookmark={() => onBookmark(prayer.id)}
        />
      ))}
    </div>
  );
}; 