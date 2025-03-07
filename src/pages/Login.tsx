
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) throw error;
      
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Failed to login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <header className="w-full px-4 py-3 glass-morphism sticky top-0 z-50 flex items-center justify-center">
        <h1 className="text-lg font-semibold">StreamVibe</h1>
      </header>
      
      <main className="flex-1 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 p-6 rounded-lg border bg-card shadow-sm">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="px-0" type="button">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="px-0" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
