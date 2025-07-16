import { useState } from "react"
import { X, Calendar, Image, Video, Users, Radio } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { usePosts } from "@/contexts/PostsContext"
import { useToast } from "@/hooks/use-toast"

interface CreatePostModalProps {
  children: React.ReactNode
}

const prizeTypes = [
  "Cash", "Crypto", "Giftcard", "Merch", "Vacation", 
  "Meet & Greet", "Date", "Car", "Service", "Course", 
  "Discord Access", "Free Subscription", "Other"
]

export function CreatePostModal({ children }: CreatePostModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { addPost } = usePosts()
  const { toast } = useToast()
  const [caption, setCaption] = useState("")
  const [enableGiveaway, setEnableGiveaway] = useState(false)
  const [prizeType, setPrizeType] = useState("")
  const [endDate, setEndDate] = useState<Date>()
  const [endTime, setEndTime] = useState("23:59")
  const [entryRequirements, setEntryRequirements] = useState({
    follow: false,
    fan: false,
    like: false,
    comment: false,
    tag: false,
    share: false,
    hashtag: false
  })

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    setEntryRequirements(prev => ({
      ...prev,
      [requirement]: checked
    }))
  }

  const handlePost = () => {
    if (!caption.trim()) {
      toast({
        title: "Caption required",
        description: "Please add a caption to your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      author: {
        name: 'You',
        username: '@you',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      content: caption,
      contest: enableGiveaway ? {
        enabled: true,
        prizeType,
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
        endTime,
        entryRequirements: Object.keys(entryRequirements).filter(key => entryRequirements[key as keyof typeof entryRequirements])
      } : undefined,
      tags: []
    };

    addPost(newPost);
    
    // Reset form
    setCaption('');
    setEnableGiveaway(false);
    setPrizeType('');
    setEndDate(undefined);
    setEndTime('23:59');
    setEntryRequirements({
      follow: false,
      fan: false,
      like: false,
      comment: false,
      tag: false,
      share: false,
      hashtag: false
    });
    
    setIsOpen(false);
    
    toast({
      title: "Post created!",
      description: "Your post has been published successfully."
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create a new post</DialogTitle>
          <p className="text-sm text-muted-foreground">Share what's on your mind with your followers.</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption" className="text-sm font-medium">Caption</Label>
            <Textarea
              id="caption"
              placeholder="What's happening?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Add to your post */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Add to your post</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Image/Video
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tag users
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Go Live
              </Button>
            </div>
          </div>

          {/* Enable Giveaway */}
          <div className="flex items-center justify-between">
            <Label htmlFor="giveaway" className="text-sm font-medium">Enable Giveaway</Label>
            <Switch
              id="giveaway"
              checked={enableGiveaway}
              onCheckedChange={setEnableGiveaway}
            />
          </div>

          {/* Giveaway Settings */}
          {enableGiveaway && (
            <div className="space-y-4 border-t pt-4">
              {/* Prize Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Prize Type</Label>
                <Select value={prizeType} onValueChange={setPrizeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a prize type" />
                  </SelectTrigger>
                  <SelectContent>
                    {prizeTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contest Duration */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Contest Duration</Label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="w-24">
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Entry Requirements */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Entry Requirements</Label>
                <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="follow"
                      checked={entryRequirements.follow}
                      onCheckedChange={(checked) => handleRequirementChange('follow', checked as boolean)}
                    />
                    <Label htmlFor="follow" className="text-sm">Follow @alexdoe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fan"
                      checked={entryRequirements.fan}
                      onCheckedChange={(checked) => handleRequirementChange('fan', checked as boolean)}
                    />
                    <Label htmlFor="fan" className="text-sm">Fan @alexdoe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="like"
                      checked={entryRequirements.like}
                      onCheckedChange={(checked) => handleRequirementChange('like', checked as boolean)}
                    />
                    <Label htmlFor="like" className="text-sm">Like the giveaway post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="comment"
                      checked={entryRequirements.comment}
                      onCheckedChange={(checked) => handleRequirementChange('comment', checked as boolean)}
                    />
                    <Label htmlFor="comment" className="text-sm">Comment on the giveaway post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tag"
                      checked={entryRequirements.tag}
                      onCheckedChange={(checked) => handleRequirementChange('tag', checked as boolean)}
                    />
                    <Label htmlFor="tag" className="text-sm">Tag someone in the comments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="share"
                      checked={entryRequirements.share}
                      onCheckedChange={(checked) => handleRequirementChange('share', checked as boolean)}
                    />
                    <Label htmlFor="share" className="text-sm">Share the post to their feed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hashtag"
                      checked={entryRequirements.hashtag}
                      onCheckedChange={(checked) => handleRequirementChange('hashtag', checked as boolean)}
                    />
                    <Label htmlFor="hashtag" className="text-sm">Use a specified hashtag</Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePost} disabled={!caption.trim()}>
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}