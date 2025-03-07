
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, getSession, getCurrentUser } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get the current session
        const { data: { session: currentSession } } = await getSession();
        setSession(currentSession);
        
        if (currentSession) {
          // Get the user details
          const { data: { user: currentUser } } = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize auth'));
        toast({
          title: 'Authentication Error',
          description: 'Failed to initialize authentication',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession) {
          const { data } = await getCurrentUser();
          setUser(data.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
