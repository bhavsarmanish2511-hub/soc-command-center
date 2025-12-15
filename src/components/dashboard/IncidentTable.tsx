import { cn } from "@/lib/utils";
import { StatusIndicator } from "./StatusIndicator";
import { ExternalLink } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  status: "critical" | "warning" | "success" | "info";
  assignee: string;
  lastUpdate: string;
  priority: number;
}

interface IncidentTableProps {
  incidents: Incident[];
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  return (
    <div className="glass-card border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold text-foreground">Active Incidents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assignee</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Update</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident, index) => (
              <tr 
                key={incident.id}
                className={cn(
                  "border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer animate-slide-up",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-3">
                  <StatusIndicator status={incident.status} pulse={incident.status === "critical"} />
                </td>
                <td className="p-3 font-mono text-sm text-muted-foreground">{incident.id}</td>
                <td className="p-3 font-medium text-foreground">{incident.title}</td>
                <td className="p-3 text-sm text-muted-foreground">{incident.assignee}</td>
                <td className="p-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    incident.priority === 1 && "bg-critical/20 text-critical",
                    incident.priority === 2 && "bg-warning/20 text-warning",
                    incident.priority === 3 && "bg-info/20 text-info",
                    incident.priority >= 4 && "bg-muted text-muted-foreground"
                  )}>
                    P{incident.priority}
                  </span>
                </td>
                <td className="p-3 text-sm text-muted-foreground font-mono">{incident.lastUpdate}</td>
                <td className="p-3">
                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
