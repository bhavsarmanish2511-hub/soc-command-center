import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "critical" | "warning" | "success";
  delay?: number;
}

const variantStyles = {
  default: "border-border/50 hover:border-primary/50",
  critical: "border-critical/30 hover:border-critical/60",
  warning: "border-warning/30 hover:border-warning/60",
  success: "border-success/30 hover:border-success/60",
};

const iconVariantStyles = {
  default: "text-primary bg-primary/10",
  critical: "text-critical bg-critical/10",
  warning: "text-warning bg-warning/10",
  success: "text-success bg-success/10",
};

export function StatCard({ title, value, icon: Icon, trend, variant = "default", delay = 0 }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-5 border transition-all duration-300 animate-slide-up",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold font-mono text-foreground animate-count-up">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-critical"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last hour
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          iconVariantStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
