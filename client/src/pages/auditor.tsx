import { Layout } from "@/components/layout";
import { useAuth } from "@/store/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText,
  Zap
} from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AuditorDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (user?.role !== "auditor") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user?.role !== "auditor") {
    return null;
  }

  const auditQueue = [
    { id: 1, property: "Sunset Heights Complex", status: "pending", priority: "high" },
    { id: 2, property: "Green Valley Apartments", status: "in_progress", priority: "high" },
    { id: 3, property: "Marina Bay Towers", status: "pending", priority: "medium" },
    { id: 4, property: "Downtown Office Block", status: "pending", priority: "medium" },
  ];

  const stats = [
    { label: "Assigned Audits", value: "12", icon: FileText, color: "text-blue-500" },
    { label: "In Progress", value: "3", icon: Clock, color: "text-amber-500" },
    { label: "Completed Today", value: "5", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Flagged Issues", value: "8", icon: AlertTriangle, color: "text-red-500" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              Auditor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Review and verify property audits</p>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            View All Audits
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    <span>{stat.label}</span>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Audit Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Audit Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditQueue.map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{audit.property}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        audit.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {audit.priority === "high" ? "High Priority" : "Medium Priority"}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        audit.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {audit.status === "in_progress" ? "In Progress" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant={audit.status === "in_progress" ? "default" : "outline"}>
                    {audit.status === "in_progress" ? "Continue" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submit Audit Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Finalize and submit completed audit reports</p>
              <Button variant="outline" className="w-full">
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Access audit standards and procedures</p>
              <Button variant="outline" className="w-full">
                View Guidelines
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">My Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Track your audit completion metrics</p>
              <Button variant="outline" className="w-full">
                View Stats
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
