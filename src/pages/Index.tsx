
import { useState } from "react";
import { Home, User } from "lucide-react";
import { Domain } from "@/lib/types";
import { currentUser } from "@/lib/data";
import DomainSelector from "@/components/DomainSelector";
import VideoFeed from "@/components/VideoFeed";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>(
    currentUser.selectedDomains
  );

  const toggleDomain = (domain: Domain) => {
    setSelectedDomains(prev => {
      if (prev.includes(domain)) {
        return prev.filter(d => d !== domain);
      } else {
        return [...prev, domain];
      }
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <header className="w-full px-4 py-3 glass-morphism sticky top-0 z-50 flex items-center justify-between">
        <h1 className="text-lg font-semibold">StreamVibe</h1>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-primary">
            <Home className="h-5 w-5" />
          </Link>
          <Link to="/profile" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </header>
      
      <div className="py-3 px-4 sticky top-[57px] z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <DomainSelector
          selectedDomains={selectedDomains}
          onSelectDomain={toggleDomain}
        />
      </div>
      
      <main className="flex-1 w-full overflow-hidden relative">
        <VideoFeed selectedDomains={selectedDomains} />
      </main>
    </div>
  );
};

export default Index;
