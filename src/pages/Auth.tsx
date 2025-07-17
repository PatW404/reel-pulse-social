import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import socialCyrculeLogo from '@/assets/social-cyrcule-logo.png';
import oceanBackground from '@/assets/ocean-background.jpg';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Error signing in",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, username, displayName);
        if (error) {
          toast({
            title: "Error creating account",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${oceanBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={socialCyrculeLogo} 
              alt="Social Cyrcule" 
              className="w-16 h-16"
            />
          </div>
          
          {/* Brand name */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#357ABD] tracking-wide">
              SOCIAL CYRCULE
            </h1>
            {!isLogin && (
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                "Create Something Special"
              </p>
            )}
          </div>
          
          {/* Page title */}
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create a new account'}
            </CardTitle>
            {isLogin && (
              <CardDescription className="text-gray-600">
                Sign in to your Social Cyrcule account
              </CardDescription>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    className="h-12 bg-gray-50 border-2 border-blue-200 rounded-lg px-4 text-gray-700 placeholder:text-gray-500 focus:border-[#4A90E2] focus:bg-white transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Display Name (Optional)"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="h-12 bg-gray-50 border-2 border-blue-200 rounded-lg px-4 text-gray-700 placeholder:text-gray-500 focus:border-[#4A90E2] focus:bg-white transition-all"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder={isLogin ? "Email" : "Email Address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-gray-50 border-2 border-blue-200 rounded-lg px-4 text-gray-700 placeholder:text-gray-500 focus:border-[#4A90E2] focus:bg-white transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-gray-50 border-2 border-blue-200 rounded-lg px-4 text-gray-700 placeholder:text-gray-500 focus:border-[#4A90E2] focus:bg-white transition-all"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading 
                ? 'Loading...' 
                : isLogin 
                  ? 'Sign In' 
                  : 'Create an account'
              }
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#4A90E2] hover:text-[#357ABD] font-medium underline transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}