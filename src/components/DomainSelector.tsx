
import { useState } from "react";
import { Domain } from "@/lib/types";
import { domains } from "@/lib/data";
import { cn } from "@/lib/utils";

interface DomainSelectorProps {
  selectedDomains: Domain[];
  onSelectDomain: (domain: Domain) => void;
  className?: string;
}

const DomainSelector = ({
  selectedDomains,
  onSelectDomain,
  className
}: DomainSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <div 
          className={cn(
            "flex items-center space-x-2 mb-2",
            "text-sm font-medium text-muted-foreground"
          )}
        >
          <span>Browse Categories</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-xs"
          >
            {isExpanded ? "Show Less" : "Show All"}
          </button>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <div 
            className={cn(
              "flex space-x-2 pb-2 transition-all duration-300",
              isExpanded ? "flex-wrap gap-y-2" : "flex-nowrap"
            )}
          >
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => onSelectDomain(domain.id)}
                className={cn(
                  "flex items-center space-x-1.5 px-4 py-2 rounded-full transition-all",
                  "text-sm font-medium whitespace-nowrap",
                  selectedDomains.includes(domain.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  "transform transition duration-200 ease-out",
                  selectedDomains.includes(domain.id) 
                    ? "scale-105" 
                    : "hover:scale-105 active:scale-95"
                )}
              >
                <span>{domain.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSelector;
