import { Layout } from "@/components/layout";
import { SEO, seoData } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Calendar,
  Home,
  User,
  FileText,
  Shield,
  TrendingUp,
  Download,
  Filter,
  Lock,
  Landmark,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface TitleVerification {
  id: string;
  propertyId: string;
  ownerName: string;
  currentSalePrice: number;
  verificationStatus: "clean" | "flagged" | "disputed" | "unclear";
  titleChainComplete: boolean;
  yearsVerified: number;
  mortgageStatus: "clear" | "mortgaged" | "released";
  taxClearance: boolean;
  litigationFound: boolean;
  ownershipChain: { owner: string; period: string; document: string }[];
  riskScore: number;
  redFlags: string[];
  verificationDate: string;
}

const TITLE_VERIFICATIONS: TitleVerification[] = [
  {
    id: "TV-001",
    propertyId: "PROP-001",
    ownerName: "Rajesh Kumar",
    currentSalePrice: 8500000,
    verificationStatus: "clean",
    titleChainComplete: true,
    yearsVerified: 30,
    mortgageStatus: "clear",
    taxClearance: true,
    litigationFound: false,
    ownershipChain: [
      { owner: "Rajesh Kumar", period: "2020-2025", document: "Sale Deed 2020" },
      { owner: "Priya Sharma", period: "2015-2020", document: "Sale Deed 2015" },
      { owner: "Suresh Reddy", period: "2010-2015", document: "Sale Deed 2010" },
      { owner: "Original Owner", period: "1995-2010", document: "Sale Deed 1995" },
    ],
    riskScore: 5,
    redFlags: [],
    verificationDate: "2025-01-20",
  },
  {
    id: "TV-002",
    propertyId: "PROP-002",
    ownerName: "Meena Devi",
    currentSalePrice: 6500000,
    verificationStatus: "flagged",
    titleChainComplete: false,
    yearsVerified: 15,
    mortgageStatus: "mortgaged",
    taxClearance: false,
    litigationFound: true,
    ownershipChain: [
      { owner: "Meena Devi", period: "2015-2025", document: "Sale Deed 2015" },
      { owner: "Unknown Entity", period: "2010-2015", document: "Missing Records" },
      { owner: "Previous Owner", period: "1995-2010", document: "Partial Documents" },
    ],
    riskScore: 62,
    redFlags: [
      "Missing mutation records (2010-2015)",
      "Active mortgage on property",
      "Tax arrears pending - ₹5 lakhs",
      "Litigation case pending - CS-2023-001",
    ],
    verificationDate: "2025-01-19",
  },
  {
    id: "TV-003",
    propertyId: "PROP-003",
    ownerName: "Vikram Singh",
    currentSalePrice: 7200000,
    verificationStatus: "disputed",
    titleChainComplete: false,
    yearsVerified: 8,
    mortgageStatus: "released",
    taxClearance: true,
    litigationFound: true,
    ownershipChain: [
      { owner: "Vikram Singh", period: "2017-2025", document: "Sale Deed 2017" },
      { owner: "Conflicting Claim", period: "2017-2025", document: "Disputed Deed" },
    ],
    riskScore: 78,
    redFlags: [
      "Title dispute with previous owner",
      "Broken chain - 22 years missing",
      "Two conflicting ownership claims",
      "High court litigation ongoing",
    ],
    verificationDate: "2025-01-18",
  },
  {
    id: "TV-004",
    propertyId: "PROP-004",
    ownerName: "Anand Patel",
    currentSalePrice: 5500000,
    verificationStatus: "clean",
    titleChainComplete: true,
    yearsVerified: 30,
    mortgageStatus: "clear",
    taxClearance: true,
    litigationFound: false,
    ownershipChain: [
      { owner: "Anand Patel", period: "2022-2025", document: "Sale Deed 2022" },
      { owner: "Priya Menon", period: "2018-2022", document: "Sale Deed 2018" },
      { owner: "Raj Kumar", period: "2012-2018", document: "Sale Deed 2012" },
      { owner: "Original Owner", period: "1995-2012", document: "Original Deed 1995" },
    ],
    riskScore: 8,
    redFlags: [],
    verificationDate: "2025-01-20",
  },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function TitleVerification() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedVerification, setSelectedVerification] = useState<TitleVerification | null>(null);
  const [propertyIdInput, setPropertyIdInput] = useState("");

  const filteredVerifications = TITLE_VERIFICATIONS.filter((v) => {
    const matchesSearch =
      v.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus ? v.verificationStatus === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = () => {
    if (!propertyIdInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a property ID to verify.",
      });
      return;
    }

    const found = TITLE_VERIFICATIONS.find((v) =>
      v.propertyId.toLowerCase().includes(propertyIdInput.toLowerCase())
    );

    if (found) {
      setSelectedVerification(found);
      toast({
        title: "Title Verification Found",
        description: `Verification for ${found.propertyId} loaded.`,
      });
    } else {
      toast({
        title: "Not Found",
        description: "Try PROP-001, PROP-002, PROP-003, or PROP-004",
      });
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "clean") return "bg-emerald-100 text-emerald-700";
    if (status === "flagged") return "bg-amber-100 text-amber-700";
    if (status === "disputed") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return "text-emerald-600";
    if (score <= 50) return "text-amber-600";
    return "text-red-600";
  };

  const statusStats = {
    clean: TITLE_VERIFICATIONS.filter((v) => v.verificationStatus === "clean").length,
    flagged: TITLE_VERIFICATIONS.filter((v) => v.verificationStatus === "flagged").length,
    disputed: TITLE_VERIFICATIONS.filter((v) => v.verificationStatus === "disputed").length,
  };

  const riskDistribution = [
    { name: "Low (0-20)", value: TITLE_VERIFICATIONS.filter((v) => v.riskScore <= 20).length },
    { name: "Medium (21-50)", value: TITLE_VERIFICATIONS.filter((v) => v.riskScore > 20 && v.riskScore <= 50).length },
    { name: "High (51-100)", value: TITLE_VERIFICATIONS.filter((v) => v.riskScore > 50).length },
  ];

  const yearsData = [
    { years: "30 years", count: TITLE_VERIFICATIONS.filter((v) => v.yearsVerified === 30).length },
    { years: "15-20 years", count: TITLE_VERIFICATIONS.filter((v) => v.yearsVerified >= 15 && v.yearsVerified < 30).length },
    { years: "< 15 years", count: TITLE_VERIFICATIONS.filter((v) => v.yearsVerified < 15).length },
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Title verification report is being generated...",
    });
  };

  return (
    <Layout>
      <SEO {...seoData.titleVerification} />
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Title Verification Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              30-year title chain verification, ownership history, and risk assessment
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport} data-testid="button-export-title">
              <Download className="h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Verify Title
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Property ID (e.g., PROP-001)"
                value={propertyIdInput}
                onChange={(e) => setPropertyIdInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                data-testid="input-property-id-title"
              />
              <div />
              <Button onClick={handleSearch} className="gap-2" data-testid="button-verify-title">
                <Shield className="h-4 w-4" /> Verify Title
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clean Titles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600" data-testid="text-clean-count">
                {statusStats.clean}
              </div>
              <p className="text-xs text-emerald-600 mt-1">No issues detected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Flagged Titles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600" data-testid="text-flagged-count">
                {statusStats.flagged}
              </div>
              <p className="text-xs text-amber-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Disputed Titles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600" data-testid="text-disputed-count">
                {statusStats.disputed}
              </div>
              <p className="text-xs text-red-600 mt-1">High risk cases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">30-Year Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600" data-testid="text-30year-count">
                {TITLE_VERIFICATIONS.filter((v) => v.titleChainComplete && v.yearsVerified === 30).length}
              </div>
              <p className="text-xs text-blue-600 mt-1">Full verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Verification List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Title Verifications ({filteredVerifications.length})</span>
              <div className="flex gap-1 flex-wrap">
                {["clean", "flagged", "disputed"].map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    data-testid={`button-filter-${status}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by property ID or owner..."
                className="pl-9 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-title"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredVerifications.map((v, idx) => (
                <div
                  key={v.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedVerification(v)}
                  data-testid={`verification-row-${idx}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{v.propertyId}</p>
                      <p className="text-sm text-muted-foreground">{v.ownerName}</p>
                    </div>
                    <Badge className={getStatusColor(v.verificationStatus)} data-testid={`badge-status-${idx}`}>
                      {v.verificationStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {v.yearsVerified} years verified • ₹{(v.currentSalePrice / 1000000).toFixed(1)}Cr
                    </span>
                    <span className={`font-semibold ${getRiskColor(v.riskScore)}`}>
                      Risk: {v.riskScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Verification */}
        {selectedVerification && (
          <>
            <Card className={`border-2 ${
              selectedVerification.verificationStatus === "clean"
                ? "border-emerald-200 bg-emerald-50"
                : selectedVerification.verificationStatus === "disputed"
                ? "border-red-200 bg-red-50"
                : "border-amber-200 bg-amber-50"
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedVerification.propertyId}</CardTitle>
                    <CardDescription className="mt-1">Owner: {selectedVerification.ownerName}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedVerification.verificationStatus)} data-testid="badge-detail-status">
                    {selectedVerification.verificationStatus.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription data-testid="text-verification-summary">
                    {selectedVerification.verificationStatus === "clean"
                      ? "✓ Title is clean with no issues detected. All documents verified. 30-year clear chain. Safe to proceed."
                      : selectedVerification.verificationStatus === "disputed"
                      ? "⚠️ TITLE DISPUTE - Multiple conflicting ownership claims found. HIGH RISK. Do NOT proceed without legal intervention."
                      : "⚠️ Title flagged - Issues found but may be resolvable. Review red flags carefully before proceeding."}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border bg-white">
                    <p className="text-xs text-muted-foreground mb-1">Current Sale Price</p>
                    <p className="font-semibold" data-testid="text-price">
                      ₹{(selectedVerification.currentSalePrice / 1000000).toFixed(1)}Cr
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-white">
                    <p className="text-xs text-muted-foreground mb-1">Title Chain Verified</p>
                    <p className="font-semibold" data-testid="text-chain">
                      {selectedVerification.yearsVerified} years
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-white">
                    <p className="text-xs text-muted-foreground mb-1">Mortgage Status</p>
                    <Badge variant={selectedVerification.mortgageStatus === "clear" ? "default" : "secondary"} data-testid="badge-mortgage">
                      {selectedVerification.mortgageStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg border bg-white">
                    <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                    <p className={`font-semibold text-lg ${getRiskColor(selectedVerification.riskScore)}`} data-testid="text-risk-score">
                      {selectedVerification.riskScore}/100
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold">Tax Clearance</p>
                      {selectedVerification.taxClearance ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm" data-testid="text-tax">
                      {selectedVerification.taxClearance ? "Clear" : "Arrears Pending"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold">Litigation Status</p>
                      {!selectedVerification.litigationFound ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm" data-testid="text-litigation">
                      {selectedVerification.litigationFound ? "Cases Found" : "No Cases"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold">Title Chain</p>
                      {selectedVerification.titleChainComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm" data-testid="text-chain-status">
                      {selectedVerification.titleChainComplete ? "Complete" : "Broken"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ownership Chain */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5" />
                  Ownership Chain ({selectedVerification.yearsVerified} years)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedVerification.ownershipChain.map((entry, idx) => (
                    <div key={idx} className="p-4 border rounded-lg" data-testid={`chain-entry-${idx}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{entry.owner}</p>
                          <p className="text-sm text-muted-foreground">{entry.period}</p>
                          <p className="text-xs text-muted-foreground mt-1">Document: {entry.document}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Red Flags */}
            {selectedVerification.redFlags.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    Red Flags ({selectedVerification.redFlags.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedVerification.redFlags.map((flag, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100" data-testid={`flag-${idx}`}>
                        <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{flag}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Charts */}
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">By Status</TabsTrigger>
            <TabsTrigger value="risk">Risk Distribution</TabsTrigger>
            <TabsTrigger value="years">Years Verified</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Title Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Clean", value: statusStats.clean },
                        { name: "Flagged", value: statusStats.flagged },
                        { name: "Disputed", value: statusStats.disputed },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="years" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Title Chain Verification Years</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yearsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="years" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" name="Properties" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Verification Process */}
        <Card>
          <CardHeader>
            <CardTitle>30-Year Title Verification Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1. Document Collection",
                  desc: "Gather all property deeds, sale agreements, and registrations for past 30 years",
                },
                {
                  step: "2. Chain Verification",
                  desc: "Verify continuous ownership chain with no gaps or discrepancies",
                },
                {
                  step: "3. Encumbrance Check",
                  desc: "Check for mortgages, tax liens, and legal encumbrances against property",
                },
                {
                  step: "4. Litigation Search",
                  desc: "Search court records for any pending cases or disputes",
                },
                {
                  step: "5. Tax Compliance",
                  desc: "Verify property tax payments and tax clearance certificates",
                },
                {
                  step: "6. Risk Assessment",
                  desc: "Generate comprehensive risk score based on all findings",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg border" data-testid={`process-${idx}`}>
                  <p className="font-semibold text-sm mb-1">{item.step}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
