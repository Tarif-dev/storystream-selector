
import { Home, User, LogOut } from "lucide-react";
import ProfileSection from "@/components/ProfileSection";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useUserProfile } from "@/hooks/useDatabase";
import { signOut } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile(user?.id || '');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <header className="w-full px-4 py-3 glass-morphism sticky top-0 z-50 flex items-center justify-between">
        <h1 className="text-lg font-semibold">StreamVibe</h1>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-muted-foreground">
            <Home className="h-5 w-5" />
          </Link>
          <Link to="/profile" className="text-primary">
            <User className="h-5 w-5" />
          </Link>
          <button 
            onClick={handleSignOut} 
            className="text-muted-foreground"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 w-full overflow-y-auto">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : profile ? (
          <ProfileSection user={profile} />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Profile not found</p>
              <p className="text-sm text-muted-foreground">
                Try signing out and signing back in
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
