import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Gift, Clock } from "lucide-react"

// Mock data
const popularPeople = [
  { id: 1, name: "Alex Johnson", username: "@alexj", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", followers: "12.3K" },
  { id: 2, name: "Sarah Wilson", username: "@sarahw", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", followers: "8.7K" },
  { id: 3, name: "Mike Chen", username: "@mikechen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", followers: "15.2K" },
]

const popularGiveaways = [
  { id: 1, title: "MacBook Pro Giveaway", prize: "MacBook Pro", endTime: "2h 30m", participants: 245 },
  { id: 2, title: "Cash Prize Contest", prize: "$500 Cash", endTime: "1d 5h", participants: 892 },
  { id: 3, title: "Gaming Setup", prize: "RTX 4090", endTime: "3h 15m", participants: 1250 },
]

const recentPost = {
  id: 1,
  author: "Emma Davis",
  content: "Just finished my morning workout! Feeling energized and ready to tackle the day 💪",
  timestamp: "5 minutes ago",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
}

export function RightPanel() {
  return (
    <div className="w-80 bg-background border-l border-border p-4 space-y-6">
      {/* Popular People */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Popular People
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularPeople.map((person) => (
            <div key={person.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.followers} followers</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Follow</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Giveaways */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Popular Giveaways
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularGiveaways.map((giveaway) => (
            <div key={giveaway.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{giveaway.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{giveaway.prize}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {giveaway.endTime}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{giveaway.participants} participants</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Post */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={recentPost.avatar} alt={recentPost.author} />
                <AvatarFallback>{recentPost.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{recentPost.author}</p>
                <p className="text-xs text-muted-foreground">{recentPost.timestamp}</p>
              </div>
            </div>
            <p className="text-sm">{recentPost.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}