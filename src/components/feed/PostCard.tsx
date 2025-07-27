import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Calendar, Clock, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Post, usePosts } from "@/contexts/PostsContext"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { voteOnPoll } = usePosts()

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleVote = (optionId: string) => {
    if (post.poll && !post.poll.userVoted) {
      voteOnPoll(post.id, optionId)
    }
  }

  const isPollEnded = () => {
    if (!post.poll) return false
    return new Date() > new Date(post.poll.endTime)
  }

  const getTimeRemaining = () => {
    if (!post.poll) return ''
    const now = new Date()
    const endTime = new Date(post.poll.endTime)
    const diff = endTime.getTime() - now.getTime()
    
    if (diff <= 0) return 'Poll ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h left`
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay failed, which is normal in some browsers
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 } // Play when 50% of video is visible
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [post.media?.type])

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
                ref={videoRef}
                src={post.media.url} 
                className="w-full h-auto max-h-96 object-cover"
                controls
                muted
                loop
                playsInline
              />
            </div>
          )}

          {/* Poll */}
          {post.poll && (
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Poll</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {getTimeRemaining()}
                </span>
              </div>
              
              <div className="space-y-2">
                {post.poll.options.map((option) => {
                  const percentage = post.poll!.totalVotes > 0 
                    ? Math.round((option.votes / post.poll!.totalVotes) * 100) 
                    : 0
                  const hasVoted = post.poll!.userVoted
                  const isSelected = post.poll!.userVoted === option.id
                  const canVote = !hasVoted && !isPollEnded()

                  return (
                    <div key={option.id} className="space-y-1">
                      <button
                        onClick={() => handleVote(option.id)}
                        disabled={!canVote}
                        className={`w-full p-3 text-left rounded-lg border transition-colors relative overflow-hidden ${
                          canVote 
                            ? 'hover:bg-muted border-border' 
                            : 'cursor-default'
                        } ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border'
                        }`}
                      >
                        {hasVoted && (
                          <div 
                            className="absolute inset-0 bg-primary/10"
                            style={{ width: `${percentage}%` }}
                          />
                        )}
                        <div className="relative flex items-center justify-between">
                          <span className="text-sm font-medium">{option.text}</span>
                          {hasVoted && (
                            <span className="text-xs text-muted-foreground">
                              {percentage}% ({option.votes})
                            </span>
                          )}
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
              
              <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                {post.poll.totalVotes} {post.poll.totalVotes === 1 ? 'vote' : 'votes'}
              </div>
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