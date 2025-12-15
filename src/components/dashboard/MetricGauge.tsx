import { cn } from "@/lib/utils";

interface MetricGaugeProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  variant?: "default" | "critical" | "warning" | "success";
}

const variantStyles = {
  default: "bg-primary",
  critical: "bg-critical",
  warning: "bg-warning",
  success: "bg-success",
};

export function MetricGauge({ label, value, max = 100, unit = "%", variant = "default" }: MetricGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  // Auto-determine variant based on value if default
  const autoVariant = variant === "default" 
    ? percentage > 90 ? "critical" 
      : percentage > 70 ? "warning" 
      : "success"
    : variant;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-mono font-semibold text-foreground">
          {value}{unit}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            variantStyles[autoVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
