import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Clock } from "lucide-react";

type SeverityType = "critical" | "high" | "medium" | "low" | "info";

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: SeverityType;
  timestamp: string;
  source: string;
  delay?: number;
}

const severityConfig: Record<SeverityType, { 
  icon: typeof AlertTriangle; 
  bg: string; 
  border: string; 
  text: string;
  badge: string;
}> = {
  critical: {
    icon: AlertTriangle,
    bg: "bg-critical/10",
    border: "border-critical/40 hover:border-critical",
    text: "text-critical",
    badge: "bg-critical/20 text-critical border-critical/40",
  },
  high: {
    icon: AlertCircle,
    bg: "bg-warning/10",
    border: "border-warning/40 hover:border-warning",
    text: "text-warning",
    badge: "bg-warning/20 text-warning border-warning/40",
  },
  medium: {
    icon: AlertCircle,
    bg: "bg-info/10",
    border: "border-info/40 hover:border-info",
    text: "text-info",
    badge: "bg-info/20 text-info border-info/40",
  },
  low: {
    icon: Info,
    bg: "bg-muted",
    border: "border-border hover:border-muted-foreground",
    text: "text-muted-foreground",
    badge: "bg-muted text-muted-foreground border-border",
  },
  info: {
    icon: CheckCircle,
    bg: "bg-success/10",
    border: "border-success/40 hover:border-success",
    text: "text-success",
    badge: "bg-success/20 text-success border-success/40",
  },
};

export function AlertCard({ id, title, description, severity, timestamp, source, delay = 0 }: AlertCardProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "glass-card p-4 border transition-all duration-300 cursor-pointer animate-slide-up",
        config.border
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-4">
        <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
          <Icon className={cn("h-5 w-5", config.text)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-foreground truncate">{title}</h4>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded border font-medium uppercase shrink-0",
              config.badge
            )}>
              {severity}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-mono">{id}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timestamp}
            </span>
            <span className="text-primary">{source}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
