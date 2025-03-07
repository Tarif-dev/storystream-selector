
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { signUp } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !username || !email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await signUp(email, password, username, name);
      
      if (error) throw error;
      
      toast({
        title: 'Registration successful',
        description: 'Please check your email to verify your account',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Failed to register',
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
      
      <main className="flex-1 w-full flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6 p-6 rounded-lg border bg-card shadow-sm">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="text-sm text-muted-foreground">Sign up to get started</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" className="px-0" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
