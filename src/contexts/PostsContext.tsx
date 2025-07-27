import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  duration: {
    days: number;
    hours: number;
    minutes: number;
  };
  endTime: string;
  totalVotes: number;
  userVoted?: string; // ID of the option the user voted for
}

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  poll?: Poll;
  contest?: {
    enabled: boolean;
    prizeType: string;
    endDate: string;
    endTime: string;
    entryRequirements: string[];
  };
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked?: boolean;
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => void;
  voteOnPoll: (postId: string, optionId: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

// Mock posts data
const initialPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Just launched my new photography course! 📸 Enter my giveaway for a chance to win a FREE spot + camera gear worth $2000! 🎁',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=400&fit=crop'
    },
    contest: {
      enabled: true,
      prizeType: 'Course + Equipment',
      endDate: '2024-01-20',
      endTime: '23:59',
      entryRequirements: ['Follow', 'Like', 'Share', 'Tag 2 friends']
    },
    tags: ['@photography', '@giveaway'],
    likes: 1243,
    comments: 89,
    shares: 156,
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Building something amazing with the team today! The energy in the office is incredible 🚀',
    media: {
      type: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    tags: ['@startup', '@teamwork'],
    likes: 567,
    comments: 34,
    shares: 23,
    timestamp: '2024-01-15T08:15:00Z'
  },
  {
    id: '3',
    author: {
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Sunday morning vibes ☀️ Nothing beats a good cup of coffee and a great book. What are you reading this weekend?',
    tags: ['@coffee', '@books', '@weekend'],
    likes: 234,
    comments: 12,
    shares: 8,
    timestamp: '2024-01-14T11:45:00Z'
  }
];

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0
    };
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const voteOnPoll = (postId: string, optionId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId && post.poll) {
          const updatedOptions = post.poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));
          
          return {
            ...post,
            poll: {
              ...post.poll,
              options: updatedOptions,
              totalVotes: post.poll.totalVotes + 1,
              userVoted: optionId
            }
          };
        }
        return post;
      })
    );
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, voteOnPoll }}>
      {children}
    </PostsContext.Provider>
  );
};