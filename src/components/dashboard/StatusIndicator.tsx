import { cn } from "@/lib/utils";

type StatusType = "critical" | "warning" | "success" | "info";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusStyles: Record<StatusType, string> = {
  critical: "bg-critical shadow-[0_0_12px_hsl(var(--critical)/0.6)]",
  warning: "bg-warning shadow-[0_0_12px_hsl(var(--warning)/0.6)]",
  success: "bg-success shadow-[0_0_12px_hsl(var(--success)/0.6)]",
  info: "bg-info shadow-[0_0_12px_hsl(var(--info)/0.6)]",
};

const sizeStyles = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function StatusIndicator({ status, label, pulse = false, size = "md" }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={cn(
            "rounded-full",
            sizeStyles[size],
            statusStyles[status],
            pulse && "animate-pulse"
          )}
        />
        {pulse && (
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-ping",
              statusStyles[status],
              "opacity-50"
            )}
          />
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
    </div>
  );
}
