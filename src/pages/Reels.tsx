import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Music, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reelsData = [
  {
    id: "1",
    author: {
      name: "Alex Doe",
      username: "alexdoe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Coding at 3 AM hits different 💻✨ #coding #developer #latenight",
    music: "Lofi Hip Hop - Coding Vibes",
    likes: 1200,
    comments: 89,
    shares: 45,
    isLiked: false
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Quick design tips that will save you hours! 🎨 Part 1/3 #design #tips #ui",
    music: "Upbeat Music - Creative Flow",
    likes: 890,
    comments: 67,
    shares: 23,
    isLiked: true
  },
  {
    id: "3",
    author: {
      name: "Chris Lee",
      username: "chrislee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Behind the scenes of building SocialSpark! 🚀 #startup #building #tech",
    music: "Electronic Beats - Tech Vibes",
    likes: 2100,
    comments: 156,
    shares: 78,
    isLiked: false
  }
]

interface ReelCardProps {
  reel: typeof reelsData[0]
  isActive: boolean
}

function ReelCard({ reel, isActive }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState(reel.isLiked)
  const [likesCount, setLikesCount] = useState(reel.likes)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isActive])

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-full h-screen snap-start bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video}
        className="w-full h-full object-cover cursor-pointer"
        loop
        muted={isMuted}
        playsInline
        onClick={handleVideoClick}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
        {/* Top Actions */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
          </Button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <div className="flex items-end justify-between">
            {/* Left Side - Content */}
            <div className="flex-1 space-y-3">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={reel.author.avatar} alt={reel.author.name} />
                  <AvatarFallback>{reel.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-semibold text-sm">@{reel.author.username}</p>
                </div>
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Follow
                </Button>
              </div>

              {/* Description */}
              <p className="text-white text-sm max-w-xs">{reel.description}</p>

              {/* Music */}
              <div className="flex items-center gap-2 text-white text-xs">
                <Music className="h-4 w-4" />
                <span className="truncate max-w-xs">{reel.music}</span>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex flex-col items-center gap-4 ml-4">
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  className={`h-12 w-12 rounded-full ${isLiked ? 'text-red-500' : 'text-white'} hover:bg-white/20`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <p className="text-white text-xs mt-1">{likesCount}</p>
              </div>

              <div className="text-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <p className="text-white text-xs mt-1">{reel.comments}</p>
              </div>

              <div className="text-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                  <Share className="h-6 w-6" />
                </Button>
                <p className="text-white text-xs mt-1">{reel.shares}</p>
              </div>

              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Play/Pause Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Reels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollTop = container.scrollTop
    const itemHeight = container.clientHeight
    const index = Math.round(scrollTop / itemHeight)
    setCurrentReelIndex(index)
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reelsData.map((reel, index) => (
          <ReelCard 
            key={reel.id} 
            reel={reel} 
            isActive={index === currentReelIndex}
          />
        ))}
      </div>
    </div>
  )
}