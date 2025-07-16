import { useState } from "react"
import { Settings, MessageCircle, Calendar, MapPin, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const profileData = {
  name: "Alex Doe",
  username: "alexdoe",
  bio: "Building cool things with code. 🚀",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=300&fit=crop",
  stats: {
    posts: 45,
    followers: 1250,
    following: 300
  },
  location: "San Francisco, CA",
  website: "alexdoe.dev",
  joinDate: "January 2023"
}

const userPosts = [
  {
    id: "1",
    content: "Just finished my latest project! 🎉",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
    likes: 45,
    comments: 12
  },
  {
    id: "2",
    content: "Working late but loving every minute of it",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
    likes: 32,
    comments: 8
  },
  {
    id: "3",
    content: "Beautiful sunset today 🌅",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
    likes: 89,
    comments: 23
  }
]

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Cover Image */}
        <div className="relative mb-6">
          <div 
            className="w-full h-48 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg"
            style={{
              backgroundImage: `url(${profileData.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-16 mb-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-muted-foreground">@{profileData.username}</p>
              <p className="text-foreground max-w-md">{profileData.bio}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-primary">{profileData.website}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isFollowing ? "secondary" : "default"}
                onClick={() => setIsFollowing(!isFollowing)}
                className="min-w-24"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">{profileData.stats.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{profileData.stats.followers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{profileData.stats.following}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-square relative">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-sm font-medium">{post.likes} likes</div>
                        <div className="text-sm">{post.comments} comments</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm line-clamp-2">{post.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contests" className="space-y-4">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No active contests</h3>
              <p className="text-muted-foreground">Create your first contest to engage with your audience!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {userPosts.map((post) => (
                <div key={post.id} className="aspect-square relative overflow-hidden rounded-lg">
                  <img 
                    src={post.image} 
                    alt="Media content" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}