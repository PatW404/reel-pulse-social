import { PostCard } from "@/components/feed/PostCard"

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Alex Doe",
      username: "alexdoe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    content: "Building cool things with code! 🚀 Just launched my new portfolio website and I'm super excited to share it with everyone. What do you think about the design?",
    media: {
      type: 'image' as const,
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    contest: {
      isActive: true,
      endTime: "2h",
      prize: "MacBook Pro"
    },
    tags: ["webdev", "portfolio", "coding"],
    likes: 45,
    comments: 12,
    shares: 5,
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    content: "Hey! Did you see the new SocialSpark features? They added an AI-powered fake account filter for giveaways. Pretty neat.",
    tags: ["socialspark", "ai", "features"],
    likes: 128,
    comments: 34,
    shares: 18,
    timestamp: "2024-01-15T08:15:00Z"
  },
  {
    id: "3",
    author: {
      name: "Chris Lee",
      username: "chrislee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    content: "Working on some exciting new projects! Can't wait to share more details soon. Stay tuned! 🎯",
    media: {
      type: 'video' as const,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    tags: ["projects", "excited"],
    likes: 89,
    comments: 23,
    shares: 11,
    timestamp: "2024-01-15T06:45:00Z"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Home Feed</h1>
          <p className="text-muted-foreground">See what's happening in your network</p>
        </div>

        {/* Post Creation Quick Access */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">You</span>
              </div>
              <div className="flex-1">
                <button className="w-full text-left px-4 py-3 bg-muted rounded-full text-muted-foreground hover:bg-muted/80 transition-colors">
                  Start a post...
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                📹 Video
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                📷 Photo
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                📝 Write article
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
            Load more posts
          </button>
        </div>
      </div>
    </div>
  )
}