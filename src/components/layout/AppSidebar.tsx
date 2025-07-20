import { useState } from "react";
import { Home, Video, MessageCircle, User, Plus, Sun, Moon, Sparkles, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
const navigationItems = [{
  title: "Home",
  url: "/",
  icon: Home
}, {
  title: "Reels",
  url: "/reels",
  icon: Video
}, {
  title: "Messages",
  url: "/messages",
  icon: MessageCircle
}, {
  title: "Profile",
  url: "/profile",
  icon: User
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDark, setIsDark] = useState(false);
  const {
    signOut
  } = useAuth();
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  return <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo and Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            {!isCollapsed && <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">SocialCSpark</h1>
              </div>}
          </div>
        </div>


        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme Toggle & Logout */}
        <div className="mt-auto p-4 border-t border-sidebar-border space-y-2">
          <Button variant="ghost" size={isCollapsed ? "icon" : "default"} onClick={toggleTheme} className="w-full">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span className="ml-2">{isDark ? 'Light' : 'Dark'} Mode</span>}
          </Button>
          
          <Button variant="ghost" size={isCollapsed ? "icon" : "default"} onClick={signOut} className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>;
}