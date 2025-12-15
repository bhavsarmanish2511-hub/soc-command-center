import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface ThreatLevelProps {
  level: "low" | "elevated" | "high" | "severe";
}

const levelConfig = {
  low: {
    label: "LOW",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/40",
    glow: "shadow-[0_0_30px_hsl(var(--success)/0.3)]",
    description: "No significant threats detected",
    bars: 1,
  },
  elevated: {
    label: "ELEVATED",
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/40",
    glow: "shadow-[0_0_30px_hsl(var(--info)/0.3)]",
    description: "Minor suspicious activity detected",
    bars: 2,
  },
  high: {
    label: "HIGH",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/40",
    glow: "shadow-[0_0_30px_hsl(var(--warning)/0.3)]",
    description: "Active threats require attention",
    bars: 3,
  },
  severe: {
    label: "SEVERE",
    color: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/40",
    glow: "shadow-[0_0_30px_hsl(var(--critical)/0.3)]",
    description: "Critical security incident in progress",
    bars: 4,
  },
};

export function ThreatLevel({ level }: ThreatLevelProps) {
  const config = levelConfig[level];

  return (
    <div className={cn(
      "glass-card p-6 border transition-all duration-500",
      config.border,
      config.glow
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("p-3 rounded-lg", config.bg)}>
          <Shield className={cn("h-8 w-8", config.color)} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Threat Level</p>
          <p className={cn("text-2xl font-bold font-mono", config.color)}>{config.label}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={cn(
              "flex-1 h-3 rounded transition-all duration-500",
              bar <= config.bars 
                ? level === "severe" ? "bg-critical animate-pulse-glow"
                  : level === "high" ? "bg-warning"
                  : level === "elevated" ? "bg-info"
                  : "bg-success"
                : "bg-muted"
            )}
          />
        ))}
      </div>
      
      <p className="text-sm text-muted-foreground">{config.description}</p>
    </div>
  );
}
