'use client';

import { useState } from 'react';
import { PrayerFeed } from '../components/prayer/PrayerFeed';
import { PrayerForm } from '../components/prayer/PrayerForm';

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

// 샘플 데이터
const initialPrayers: Prayer[] = [
  {
    id: '1',
    content: '오늘 하루도 감사합니다. 가족들의 건강과 평안을 위해 기도합니다.',
    author: {
      name: '1234',
      isAnonymous: true,
    },
    createdAt: new Date(),
    likes: 5,
    isBookmarked: false,
  },
  {
    id: '2',
    content: '내일 있을 중요한 회의를 위해 기도합니다. 하나님의 지혜와 은혜가 함께하시길 바랍니다.',
    author: {
      name: '홍길동',
      isAnonymous: false,
    },
    createdAt: new Date(Date.now() - 3600000),
    likes: 3,
    isBookmarked: true,
  },
];

export default function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>(initialPrayers);

  const handleSubmit = (content: string, isAnonymous: boolean) => {
    const newPrayer: Prayer = {
      id: Date.now().toString(),
      content,
      author: {
        name: isAnonymous ? Math.floor(Math.random() * 10000).toString() : '홍길동', // 임시로 고정된 이름 사용
        isAnonymous,
      },
      createdAt: new Date(),
      likes: 0,
      isBookmarked: false,
    };

    setPrayers((prev) => [newPrayer, ...prev]);
  };

  const handleLike = (id: string) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === id
          ? { ...prayer, likes: prayer.likes + 1 }
          : prayer
      )
    );
  };

  const handleComment = (id: string) => {
    console.log('Comment on prayer:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share prayer:', id);
  };

  const handleBookmark = (id: string) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === id
          ? { ...prayer, isBookmarked: !prayer.isBookmarked }
          : prayer
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">모두의 기도</h1>
        <PrayerForm onSubmit={handleSubmit} />
        <PrayerFeed
          prayers={prayers}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onBookmark={handleBookmark}
        />
      </div>
    </main>
  );
}
