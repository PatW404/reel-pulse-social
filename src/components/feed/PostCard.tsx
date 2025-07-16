import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Post } from "@/contexts/PostsContext"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 post-enter">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">@{post.author.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contest Badge */}
        {post.contest?.enabled && (
          <div className="contest-badge rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium text-sm">🎉 Giveaway Contest</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3" />
              <span>Ends {post.contest.endDate} at {post.contest.endTime}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{post.content}</p>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  @{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Media */}
          {post.media && post.media.type === 'image' && post.media.url && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={post.media.url} 
                alt="Post content" 
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {post.media && post.media.type === 'video' && post.media.url && (
            <div className="rounded-lg overflow-hidden bg-black">
              <video 
                src={post.media.url} 
                className="w-full h-auto max-h-96 object-cover"
                controls
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`like-button ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{likesCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="comment-button">
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-xs">{post.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="share-button">
              <Share className="h-4 w-4" />
              <span className="ml-1 text-xs">{post.shares}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}