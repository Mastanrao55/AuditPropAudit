import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  Filter,
  Download,
  MapPin,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Mock RERA project data
const MOCK_PROJECTS = [
  {
    id: "RERA-2024-001",
    projectName: "Prestige Lakeside Residences",
    reraRegistrationNo: "P-01234567-890",
    builder: "Prestige Group",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    launchDate: "2020-06-15",
    estimatedCompletion: "2024-12-31",
    actualCompletion: null,
    reraStatus: "registered",
    projectStatus: "in-progress",
    unitsSold: 245,
    totalUnits: 312,
    landArea: "12.5 acres",
    totalConstructionArea: "2.8 million sqft",
    projectCost: "₹1200 Cr",
    escrowAccount: "Yes",
    escrowBalance: "₹450 Cr",
    complaints: 12,
    criticality: "medium",
    completionPercentage: 78,
  },
  {
    id: "RERA-2024-002",
    projectName: "Godrej Woodside",
    reraRegistrationNo: "P-98765432-101",
    builder: "Godrej Properties",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    launchDate: "2018-03-10",
    estimatedCompletion: "2023-12-31",
    actualCompletion: "2024-06-30",
    reraStatus: "completed",
    projectStatus: "completed",
    unitsSold: 186,
    totalUnits: 186,
    landArea: "8.2 acres",
    totalConstructionArea: "1.95 million sqft",
    projectCost: "₹950 Cr",
    escrowAccount: "Yes",
    escrowBalance: "₹25 Cr",
    complaints: 3,
    criticality: "low",
    completionPercentage: 100,
  },
  {
    id: "RERA-2024-003",
    projectName: "DLF Capital Greens",
    reraRegistrationNo: "P-55544433-202",
    builder: "DLF Limited",
    location: "Gurugram, Haryana",
    city: "Gurugram",
    launchDate: "2019-09-20",
    estimatedCompletion: "2024-06-30",
    actualCompletion: null,
    reraStatus: "registered",
    projectStatus: "delayed",
    unitsSold: 189,
    totalUnits: 250,
    landArea: "15.3 acres",
    totalConstructionArea: "3.1 million sqft",
    projectCost: "₹1450 Cr",
    escrowAccount: "Yes",
    escrowBalance: "₹380 Cr",
    complaints: 28,
    criticality: "high",
    completionPercentage: 62,
  },
  {
    id: "RERA-2024-004",
    projectName: "Lodha Luxuria",
    reraRegistrationNo: "P-11223344-555",
    builder: "Lodha Group",
    location: "Pune, Maharashtra",
    city: "Pune",
    launchDate: "2021-01-12",
    estimatedCompletion: "2025-06-30",
    actualCompletion: null,
    reraStatus: "registered",
    projectStatus: "in-progress",
    unitsSold: 142,
    totalUnits: 200,
    landArea: "9.8 acres",
    totalConstructionArea: "2.1 million sqft",
    projectCost: "₹850 Cr",
    escrowAccount: "Yes",
    escrowBalance: "₹320 Cr",
    complaints: 5,
    criticality: "low",
    completionPercentage: 45,
  },
];

const MOCK_COMPLAINTS = [
  {
    id: "CMP-001",
    projectId: "RERA-2024-001",
    complaintNo: "RERA/KA/2024/12345",
    complainant: "Rajesh Kumar",
    filedDate: "2024-03-15",
    complaintType: "Delay in Construction",
    description: "Construction work delayed by 6 months beyond promised timeline",
    status: "pending",
    severity: "high",
    lastUpdate: "2024-11-15",
  },
  {
    id: "CMP-002",
    projectId: "RERA-2024-001",
    complaintNo: "RERA/KA/2024/12346",
    complainant: "Priya Sharma",
    filedDate: "2024-04-20",
    complaintType: "Quality of Work",
    description: "Structural defects identified in foundation",
    status: "under-review",
    severity: "high",
    lastUpdate: "2024-11-10",
  },
  {
    id: "CMP-003",
    projectId: "RERA-2024-001",
    complaintNo: "RERA/KA/2024/12347",
    complainant: "Amit Patel",
    filedDate: "2024-05-10",
    complaintType: "Possession Delay",
    description: "Not provided possession as per agreement",
    status: "resolved",
    severity: "medium",
    lastUpdate: "2024-06-30",
  },
  {
    id: "CMP-004",
    projectId: "RERA-2024-003",
    complaintNo: "RERA/HR/2024/67890",
    complainant: "Neha Verma",
    filedDate: "2024-02-14",
    complaintType: "Refund Claim",
    description: "Requesting refund due to project delays",
    status: "pending",
    severity: "high",
    lastUpdate: "2024-11-12",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "registered":
      return "bg-emerald-500/10 text-emerald-700";
    case "completed":
      return "bg-blue-500/10 text-blue-700";
    case "delayed":
      return "bg-red-500/10 text-red-700";
    case "in-progress":
      return "bg-amber-500/10 text-amber-700";
    default:
      return "bg-gray-500/10 text-gray-700";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "registered":
      return <Badge className="bg-emerald-500">Registered</Badge>;
    case "completed":
      return <Badge className="bg-blue-500">Completed</Badge>;
    case "delayed":
      return <Badge className="bg-red-500">Delayed</Badge>;
    case "in-progress":
      return <Badge className="bg-amber-500">In Progress</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getComplaintStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-red-500">Pending</Badge>;
    case "under-review":
      return <Badge className="bg-amber-500">Under Review</Badge>;
    case "resolved":
      return <Badge className="bg-emerald-500">Resolved</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function RERADashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.reraRegistrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.builder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || project.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const selectedProjectData = selectedProject
    ? MOCK_PROJECTS.find((p) => p.id === selectedProject)
    : null;

  const projectComplaints = selectedProject
    ? MOCK_COMPLAINTS.filter((c) => c.projectId === selectedProject)
    : [];

  const handleDownloadReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your RERA verification report is being generated. Download will start shortly.",
    });
  };

  const uniqueCities = Array.from(new Set(MOCK_PROJECTS.map((p) => p.city)));

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">RERA Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Verify property and project status directly from RERA portal. View complaints, compliance status, and project details.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Search & Projects */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Search Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Name / RERA No.</label>
                    <Input
                      placeholder="Search project..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-rera-search"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Filter by City</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => setSelectedCity(null)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCity === null
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        data-testid="button-city-all"
                      >
                        All Cities
                      </button>
                      {uniqueCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCity === city
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                          data-testid={`button-city-${city}`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projects List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Projects ({filteredProjects.length})</h3>
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all ${
                      selectedProject === project.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                    data-testid={`card-project-${project.id}`}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm line-clamp-2">{project.projectName}</div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{project.city}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(project.reraStatus)}
                          {project.complaints > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {project.complaints} Issues
                            </Badge>
                          )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${project.completionPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">{project.completionPercentage}% Complete</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel - Project Details */}
            <div className="lg:col-span-2">
              {selectedProjectData ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview" data-testid="tab-overview">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="complaints" data-testid="tab-complaints">
                      Complaints ({projectComplaints.length})
                    </TabsTrigger>
                    <TabsTrigger value="compliance" data-testid="tab-compliance">
                      Compliance
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{selectedProjectData.projectName}</CardTitle>
                            <CardDescription>{selectedProjectData.builder}</CardDescription>
                          </div>
                          {getStatusBadge(selectedProjectData.reraStatus)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Key Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground">RERA Registration No.</label>
                            <p className="font-medium text-sm">{selectedProjectData.reraRegistrationNo}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Location</label>
                            <p className="font-medium text-sm">{selectedProjectData.location}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Launch Date</label>
                            <p className="font-medium text-sm">
                              {new Date(selectedProjectData.launchDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Estimated Completion</label>
                            <p className="font-medium text-sm">
                              {new Date(selectedProjectData.estimatedCompletion).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Project Status */}
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-4">Project Status</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Overall Completion</span>
                              <span className="font-semibold">{selectedProjectData.completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${selectedProjectData.completionPercentage}%` }}
                              ></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Units Sold</p>
                                <p className="text-lg font-semibold">
                                  {selectedProjectData.unitsSold}/{selectedProjectData.totalUnits}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Total Construction</p>
                                <p className="text-lg font-semibold">{selectedProjectData.totalConstructionArea}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Financial Details */}
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-4">Financial Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Project Cost</p>
                              <p className="font-semibold">{selectedProjectData.projectCost}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Escrow Account</p>
                              <p className="font-semibold text-emerald-600">✓ Yes</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Current Escrow Balance</p>
                              <p className="font-semibold text-blue-600">{selectedProjectData.escrowBalance}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Land Area</p>
                              <p className="font-semibold">{selectedProjectData.landArea}</p>
                            </div>
                          </div>
                        </div>

                        {/* Download Report */}
                        <Button onClick={handleDownloadReport} className="w-full gap-2" data-testid="button-download-rera">
                          <Download className="h-4 w-4" />
                          Download RERA Verification Report
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Complaints Tab */}
                  <TabsContent value="complaints" className="space-y-4 mt-6">
                    {projectComplaints.length > 0 ? (
                      projectComplaints.map((complaint) => (
                        <Card key={complaint.id} data-testid={`card-complaint-${complaint.id}`}>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold">{complaint.complaintType}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Complaint #{complaint.complaintNo}
                                  </p>
                                </div>
                                {getComplaintStatusBadge(complaint.status)}
                              </div>
                              <p className="text-sm">{complaint.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Filed By</p>
                                  <p className="font-medium">{complaint.complainant}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Filed Date</p>
                                  <p className="font-medium">
                                    {new Date(complaint.filedDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Severity</p>
                                  <p
                                    className={`font-medium ${
                                      complaint.severity === "high"
                                        ? "text-red-600"
                                        : complaint.severity === "medium"
                                        ? "text-amber-600"
                                        : "text-emerald-600"
                                    }`}
                                  >
                                    {complaint.severity.charAt(0).toUpperCase() +
                                      complaint.severity.slice(1)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Last Updated</p>
                                  <p className="font-medium">
                                    {new Date(complaint.lastUpdate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                          <p className="font-semibold">No Complaints</p>
                          <p className="text-sm text-muted-foreground">
                            This project has no registered complaints with RERA
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Compliance Tab */}
                  <TabsContent value="compliance" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">RERA Compliance Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="text-sm">RERA Registration</span>
                            </span>
                            <Badge className="bg-emerald-500">Compliant</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="text-sm">Escrow Account Maintained</span>
                            </span>
                            <Badge className="bg-emerald-500">Active</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="flex items-center gap-2">
                              {projectComplaints.length === 0 ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                              )}
                              <span className="text-sm">Complaint Resolution</span>
                            </span>
                            <Badge
                              className={
                                projectComplaints.length === 0
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }
                            >
                              {projectComplaints.length} Pending
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="text-sm">Project Updates (Within 60 days)</span>
                            </span>
                            <Badge className="bg-emerald-500">Updated</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="text-sm">Statutory Advertisement</span>
                            </span>
                            <Badge className="bg-emerald-500">Published</Badge>
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-4">
                          <h4 className="font-semibold mb-3">Compliance Score</h4>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-emerald-500 h-3 rounded-full"
                                  style={{
                                    width: `${projectComplaints.length > 10 ? 60 : 90}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-lg font-bold">
                              {projectComplaints.length > 10 ? "60" : "90"}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {projectComplaints.length > 10
                              ? "Moderate compliance issues detected"
                              : "Strong compliance track record"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold mb-2">Select a Project</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a project from the list to view details, complaints, and compliance status
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
