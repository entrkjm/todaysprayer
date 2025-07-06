'use client';

import { useState } from 'react';
import { PrayerFeed } from '../components/prayer/PrayerFeed';
import { PrayerForm } from '../components/prayer/PrayerForm';

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
    comments: [
      {
        id: '1-1',
        content: '함께 기도하겠습니다. 가족의 건강이 가장 중요하죠.',
        author: {
          name: '김철수',
          isAnonymous: false,
        },
        createdAt: new Date(Date.now() - 1800000),
        likes: 2,
      },
      {
        id: '1-2',
        content: '감사한 마음으로 기도합니다 🙏',
        author: {
          name: '5678',
          isAnonymous: true,
        },
        createdAt: new Date(Date.now() - 900000),
        likes: 1,
      },
    ],
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
    comments: [],
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
      comments: [],
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

  const handleComment = (id: string, comment: { content: string; author: { name: string; isAnonymous: boolean } }) => {
    const newComment: Comment = {
      id: `${id}-${Date.now()}`,
      content: comment.content,
      author: comment.author,
      createdAt: new Date(),
      likes: 0,
    };

    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === id
          ? { ...prayer, comments: [...prayer.comments, newComment] }
          : prayer
      )
    );
  };

  const handleLikeComment = (prayerId: string, commentId: string) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === prayerId
          ? {
              ...prayer,
              comments: prayer.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : prayer
      )
    );
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
          onLikeComment={handleLikeComment}
          onShare={handleShare}
          onBookmark={handleBookmark}
        />
      </div>
    </main>
  );
}
