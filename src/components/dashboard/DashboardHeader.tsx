import { StatusIndicator } from "./StatusIndicator";
import { Bell, Settings, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  lastUpdated: string;
  onRefresh?: () => void;
}

export function DashboardHeader({ lastUpdated, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-bold font-mono text-lg">SC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Security Operations Center
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              NOC Dashboard v2.4.1
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
          <StatusIndicator status="success" size="sm" pulse />
          <span className="text-xs font-medium text-success">All Systems Operational</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground font-mono hidden sm:block">
          Last updated: {lastUpdated}
        </span>
        
        <button
          onClick={onRefresh}
          className={cn(
            "p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        
        <button className={cn(
          "p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors relative",
          "text-muted-foreground hover:text-foreground"
        )}>
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-critical rounded-full flex items-center justify-center text-[10px] font-bold text-foreground">
            3
          </span>
        </button>
        
        <button className={cn(
          "p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors",
          "text-muted-foreground hover:text-foreground"
        )}>
          <Settings className="h-4 w-4" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
