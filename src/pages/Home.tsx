import { PostCard } from "@/components/feed/PostCard"
import { CreatePostModal } from "@/components/post/CreatePostModal"
import { CreatePollModal } from "@/components/post/CreatePollModal"
import { usePosts } from "@/contexts/PostsContext"
import { BarChart3 } from "lucide-react"

export default function Home() {
  const { posts } = usePosts();
  
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
                <CreatePostModal>
                  <button className="w-full text-left px-4 py-3 bg-muted rounded-full text-muted-foreground hover:bg-muted/80 transition-colors">
                    Start a post...
                  </button>
                </CreatePostModal>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <CreatePollModal>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  Create Poll
                </button>
              </CreatePollModal>
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
          {posts.map((post) => (
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