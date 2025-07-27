import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { RightPanel } from "./RightPanel"
import { Search, Bell, Plus, User, Settings, Trophy, DollarSign, Crown, Shield, Moon, LogOut, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CreatePostModal } from "@/components/post/CreatePostModal"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 px-4">
            {/* Left side with trigger and logo */}
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">SocialSpark</h2>
            </div>
            
            {/* Center search bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search SocialSpark"
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              <CreatePostModal>
                <Button variant="default" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
              </CreatePostModal>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Your profile" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end" forceMount>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">@{user?.user_metadata?.username || user?.email?.split('@')[0] || 'user'}</h4>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10" onClick={() => navigate('/profile')}>
                          <User className="h-4 w-4" />
                          <span className="text-sm">View Profile</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Edit Avatar</span>
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Dark Mode</span>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10" onClick={() => navigate('/settings')}>
                          <Settings className="h-4 w-4" />
                          <span className="text-sm">Settings & Privacy</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10" onClick={signOut}>
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Log Out</span>
                        </Button>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10">
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">Advertise on SocialSpark</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Button variant="ghost" className="justify-start gap-2 h-10">
                          <Star className="h-4 w-4" />
                          <span className="text-sm">Try SocialSpark Pro</span>
                          <span className="ml-auto text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded">BETA</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>
          
          {/* Main content with right panel */}
          <div className="flex flex-1">
            <main className="flex-1 bg-background">
              {children}
            </main>
            <RightPanel />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}