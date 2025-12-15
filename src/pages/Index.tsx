import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { ThreatLevel } from "@/components/dashboard/ThreatLevel";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { IncidentTable } from "@/components/dashboard/IncidentTable";
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";

const mockAlerts = [
  {
    id: "ALT-2024-001",
    title: "Brute Force Attack Detected",
    description: "Multiple failed login attempts from IP 192.168.1.105 targeting admin accounts. Rate limiting applied.",
    severity: "critical" as const,
    timestamp: "2 min ago",
    source: "Firewall",
  },
  {
    id: "ALT-2024-002",
    title: "Unusual Outbound Traffic",
    description: "Spike in outbound traffic to unknown external IP detected on server PROD-WEB-03.",
    severity: "high" as const,
    timestamp: "8 min ago",
    source: "Network Monitor",
  },
  {
    id: "ALT-2024-003",
    title: "SSL Certificate Expiring",
    description: "SSL certificate for api.company.com will expire in 7 days. Renewal recommended.",
    severity: "medium" as const,
    timestamp: "15 min ago",
    source: "Certificate Manager",
  },
  {
    id: "ALT-2024-004",
    title: "Security Patch Available",
    description: "New security update available for Apache HTTP Server. Version 2.4.58 addresses CVE-2024-0001.",
    severity: "low" as const,
    timestamp: "1 hour ago",
    source: "Vulnerability Scanner",
  },
];

const mockIncidents = [
  {
    id: "INC-001",
    title: "DDoS Mitigation Active",
    status: "critical" as const,
    assignee: "John Smith",
    lastUpdate: "2 min ago",
    priority: 1,
  },
  {
    id: "INC-002",
    title: "Database Connection Pool Exhausted",
    status: "warning" as const,
    assignee: "Sarah Johnson",
    lastUpdate: "15 min ago",
    priority: 2,
  },
  {
    id: "INC-003",
    title: "API Rate Limit Exceeded",
    status: "info" as const,
    assignee: "Mike Chen",
    lastUpdate: "1 hour ago",
    priority: 3,
  },
  {
    id: "INC-004",
    title: "Backup Verification Pending",
    status: "success" as const,
    assignee: "Emily Davis",
    lastUpdate: "2 hours ago",
    priority: 4,
  },
];

const mockSystems = [
  { name: "Primary DB", status: "success" as const, icon: "database" as const },
  { name: "Web Cluster", status: "success" as const, icon: "server" as const },
  { name: "CDN Edge", status: "warning" as const, icon: "globe" as const },
  { name: "Auth Service", status: "success" as const, icon: "cpu" as const },
];

export default function Index() {
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString("en-US", { hour12: false }));
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <DashboardHeader lastUpdated={lastUpdated} onRefresh={handleRefresh} />
      
      <main className="p-6 space-y-6 max-w-[1800px] mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Alerts"
            value={247}
            icon={AlertTriangle}
            trend={{ value: 12, isPositive: false }}
            variant="critical"
            delay={0}
          />
          <StatCard
            title="Active Threats"
            value={3}
            icon={Shield}
            variant="warning"
            delay={100}
          />
          <StatCard
            title="Events/sec"
            value="1.2K"
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
            delay={200}
          />
          <StatCard
            title="Resolved Today"
            value={42}
            icon={CheckCircle}
            variant="success"
            delay={300}
          />
          <StatCard
            title="Mean Response"
            value="4.2m"
            icon={Clock}
            delay={400}
          />
          <StatCard
            title="Monitored Assets"
            value={856}
            icon={Eye}
            delay={500}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Alerts</h2>
              <span className="text-xs text-muted-foreground font-mono">
                Showing 4 of 247
              </span>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((alert, index) => (
                <AlertCard key={alert.id} {...alert} delay={index * 100} />
              ))}
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-6">
            <ThreatLevel level="elevated" />
            <SystemHealth
              metrics={{
                cpu: 67,
                memory: 82,
                disk: 45,
                network: 34,
              }}
              systems={mockSystems}
            />
          </div>
        </div>

        {/* Incidents Table */}
        <IncidentTable incidents={mockIncidents} />
      </main>
    </div>
  );
}
