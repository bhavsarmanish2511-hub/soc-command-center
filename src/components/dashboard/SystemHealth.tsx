import { MetricGauge } from "./MetricGauge";
import { StatusIndicator } from "./StatusIndicator";
import { Server, Database, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface SystemHealthProps {
  metrics: SystemMetrics;
  systems: Array<{
    name: string;
    status: "critical" | "warning" | "success" | "info";
    icon: "server" | "database" | "globe" | "cpu";
  }>;
}

const iconMap = {
  server: Server,
  database: Database,
  globe: Globe,
  cpu: Cpu,
};

export function SystemHealth({ metrics, systems }: SystemHealthProps) {
  return (
    <div className="glass-card p-6 border border-border/50">
      <h3 className="font-semibold text-foreground mb-6">System Health</h3>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
        <MetricGauge label="CPU Usage" value={metrics.cpu} />
        <MetricGauge label="Memory" value={metrics.memory} />
        <MetricGauge label="Disk I/O" value={metrics.disk} />
        <MetricGauge label="Network" value={metrics.network} />
      </div>

      <div className="border-t border-border/50 pt-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Connected Systems
        </p>
        <div className="grid grid-cols-2 gap-3">
          {systems.map((system) => {
            const Icon = iconMap[system.icon];
            return (
              <div
                key={system.name}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30",
                  "hover:bg-muted/50 transition-colors cursor-pointer"
                )}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground flex-1">{system.name}</span>
                <StatusIndicator status={system.status} size="sm" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
