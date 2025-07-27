import { useState, useRef } from "react"
import { Camera, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"

interface EditProfileModalProps {
  children: React.ReactNode
  profileData?: {
    name: string
    username: string
    bio: string
    avatar: string
    coverImage: string
    location: string
    website: string
  }
}

export function EditProfileModal({ children, profileData }: EditProfileModalProps) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    username: profileData?.username || user?.user_metadata?.username || "",
    displayName: profileData?.name || user?.user_metadata?.display_name || "",
    bio: profileData?.bio || "",
    location: profileData?.location || "",
    website: profileData?.website || "",
    avatar: profileData?.avatar || "",
    coverImage: profileData?.coverImage || ""
  })

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarClick = () => {
    avatarInputRef.current?.click()
  }

  const handleBannerClick = () => {
    bannerInputRef.current?.click()
  }

  const handleFileChange = (field: 'avatar' | 'coverImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData(prev => ({ ...prev, [field]: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality with Supabase
    console.log("Saving profile data:", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Banner Image */}
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <div 
              className="relative w-full h-32 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg cursor-pointer overflow-hidden group"
              onClick={handleBannerClick}
              style={{
                backgroundImage: formData.coverImage ? `url(${formData.coverImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange('coverImage', e)}
            />
          </div>

          {/* Profile Picture */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div 
                className="relative cursor-pointer group"
                onClick={handleAvatarClick}
              >
                <Avatar className="w-20 h-20">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    {(formData.displayName || formData.username || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Click to change your profile picture
              </div>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange('avatar', e)}
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="pl-8"
                placeholder="casinonumberz"
              />
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              placeholder="Casino Numberz"
              maxLength={40}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.displayName.length}/40
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Getting Money!"
              rows={3}
              maxLength={150}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.bio.length}/150
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="New York, NY"
              maxLength={64}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.location.length}/64
            </div>
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              maxLength={100}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.website.length}/100
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}