
import { Home, User } from "lucide-react";
import { currentUser } from "@/lib/data";
import ProfileSection from "@/components/ProfileSection";
import { Link } from "react-router-dom";

const Profile = () => {
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
        </div>
      </header>
      
      <main className="flex-1 w-full overflow-y-auto">
        <ProfileSection user={currentUser} />
      </main>
    </div>
  );
};

export default Profile;
