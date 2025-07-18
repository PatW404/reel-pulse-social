import { useState } from "react"
import { ArrowLeft, User, Shield, Eye, Database, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const settingsCategories = [
  {
    id: "account",
    title: "Account preferences",
    icon: User,
    description: "Manage your account settings"
  },
  {
    id: "security", 
    title: "Sign in & security",
    icon: Shield,
    description: "Password, 2FA, and login settings"
  },
  {
    id: "visibility",
    title: "Visibility", 
    icon: Eye,
    description: "Control who can see your profile"
  },
  {
    id: "privacy",
    title: "Data privacy",
    icon: Database, 
    description: "Manage your data and privacy"
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Email and push notification preferences"
  }
]

export default function Settings() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("account")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-background p-6">
          <div className="space-y-2">
            {settingsCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-12"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{category.title}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {selectedCategory === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile information</CardTitle>
                    <CardDescription>
                      Update your profile details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Name, location, and industry</h4>
                        <p className="text-sm text-muted-foreground">Basic profile information</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Personal demographic information</h4>
                        <p className="text-sm text-muted-foreground">Optional information for better recommendations</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Verifications</h4>
                        <p className="text-sm text-muted-foreground">Verify your identity and credentials</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display preferences</CardTitle>
                    <CardDescription>
                      Customize how the app looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dark mode</h4>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                      <Switch 
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>General preferences</CardTitle>
                    <CardDescription>
                      Language and other general settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Language</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                      </div>
                      <Button variant="outline" size="sm">English</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedCategory === "security" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign in & security</CardTitle>
                    <CardDescription>
                      Manage your login credentials and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-muted-foreground">Change your account password</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-factor authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">Setup</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedCategory === "visibility" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile visibility</CardTitle>
                    <CardDescription>
                      Control who can see your profile and activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Public profile</h4>
                        <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Activity status</h4>
                        <p className="text-sm text-muted-foreground">Show when you're online</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedCategory === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data privacy</CardTitle>
                    <CardDescription>
                      Manage how your data is used and stored
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data download</h4>
                        <p className="text-sm text-muted-foreground">Download a copy of your data</p>
                      </div>
                      <Button variant="outline" size="sm">Request</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Delete account</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                      </div>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedCategory === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}