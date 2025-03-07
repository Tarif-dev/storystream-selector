
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Settings, LogOut, Film, Bookmark, Heart } from "lucide-react";

interface ProfileSectionProps {
  user: User;
  className?: string;
}

const ProfileSection = ({ user, className }: ProfileSectionProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto px-6 py-8 space-y-8",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover border-2 border-primary"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs">
              +
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="mt-1 text-sm">{user.bio}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between text-center border-y border-border py-4">
        <div>
          <p className="text-2xl font-bold">{user.followersCount}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.followingCount}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
        <div>
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">Videos</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Content</h3>
          <Button variant="link" size="sm">
            See All
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-[9/16] rounded-md overflow-hidden relative bg-secondary group"
            >
              <img
                src={`https://picsum.photos/seed/${item}/200/350`}
                alt={`Content ${item}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white flex flex-col items-center">
                  <Heart className="h-5 w-5" />
                  <span className="text-xs mt-1">123</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 flex">
        <Button
          variant="ghost"
          size="lg"
          className="flex-1 flex justify-center items-center"
        >
          <Film className="h-5 w-5 mr-2" />
          <span>Videos</span>
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="flex-1 flex justify-center items-center"
        >
          <Bookmark className="h-5 w-5 mr-2" />
          <span>Saved</span>
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="flex-1 flex justify-center items-center"
        >
          <Heart className="h-5 w-5 mr-2" />
          <span>Liked</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
