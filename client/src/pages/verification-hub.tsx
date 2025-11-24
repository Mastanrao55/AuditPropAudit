import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Globe,
  Building2,
  BarChart3,
  Shield,
  Zap,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function VerificationHub() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("ec");

  const handleSearch = (feature: string) => {
    toast({
      title: `${feature} Search`,
      description: "Integration ready with state portals for real-time data.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Verification Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive property verification and compliance tools
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verifications Done
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-emerald-600 mt-1">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Fraud Flags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-red-600 mt-1">2 high risk</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                EC Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-blue-600 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-emerald-600 mt-1">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Verification Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="ec">EC</TabsTrigger>
                <TabsTrigger value="rera">RERA</TabsTrigger>
                <TabsTrigger value="litigation">Cases</TabsTrigger>
                <TabsTrigger value="title">Title</TabsTrigger>
                <TabsTrigger value="fraud">Fraud</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
              </TabsList>

              {/* Encumbrance Certificate */}
              <TabsContent value="ec" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Enter Property ID" data-testid="input-property-id" />
                    <Input placeholder="Select State" data-testid="input-state" />
                    <Button onClick={() => handleSearch("Encumbrance Certificate")} data-testid="button-search-ec">
                      <Search className="h-4 w-4 mr-2" /> Search EC
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Integrated with state portals: TNREGINET (Tamil Nadu), Kaveri (Karnataka), DORIS (Delhi), PEARL
                      (Kerala), and others for real-time EC verification and historical 30-year encumbrance tracking.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* RERA Status */}
              <TabsContent value="rera" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="RERA Registration Number" data-testid="input-rera-number" />
                    <Input placeholder="City" data-testid="input-city" />
                    <Button onClick={() => handleSearch("RERA Status")} data-testid="button-search-rera">
                      <Building2 className="h-4 w-4 mr-2" /> Check RERA
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Project: Prestige Central Park</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs">Status: <span className="text-emerald-600 font-semibold">Completed</span></p>
                        <p className="text-xs">Completion: 100%</p>
                        <p className="text-xs">Units: 450/450 sold</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Litigation Cases */}
              <TabsContent value="litigation" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Property Address" data-testid="input-property-address" />
                    <Input placeholder="Case Number" data-testid="input-case-number" />
                    <Button onClick={() => handleSearch("Litigation")} data-testid="button-search-litigation">
                      <FileText className="h-4 w-4 mr-2" /> Search Cases
                    </Button>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        Case: CS-2023-001
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs">Type: Title Dispute</p>
                      <p className="text-xs">Status: Pending</p>
                      <p className="text-xs">Risk Level: High</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Title Verification */}
              <TabsContent value="title" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Property ID" data-testid="input-title-property-id" />
                    <Input placeholder="Owner Name" data-testid="input-owner-name" />
                    <Button onClick={() => handleSearch("Title Verification")} data-testid="button-search-title">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Verify Title
                    </Button>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <p className="font-semibold text-sm text-emerald-900">30-Year Title Chain: Clean</p>
                    <p className="text-xs text-emerald-700 mt-1">✓ No mortgages | ✓ Tax clear | ✓ No litigation</p>
                  </div>
                </div>
              </TabsContent>

              {/* Fraud Detection */}
              <TabsContent value="fraud" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Property ID" data-testid="input-fraud-property-id" />
                    <Input placeholder="Sale Price (₹)" data-testid="input-sale-price" />
                    <Button onClick={() => handleSearch("Fraud Detection")} data-testid="button-search-fraud">
                      <Zap className="h-4 w-4 mr-2" /> Analyze
                    </Button>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Fraud Risk Score: 5/100</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Price Anomaly</span>
                        <span>2/100</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Document Forgery</span>
                        <span>1/100</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Double Sale Risk</span>
                        <span>2/100</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Market Intelligence */}
              <TabsContent value="market" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="City" data-testid="input-market-city" />
                    <Input placeholder="Locality" data-testid="input-locality" />
                    <Button onClick={() => handleSearch("Market Intelligence")} data-testid="button-search-market">
                      <BarChart3 className="h-4 w-4 mr-2" /> Analyze
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Bangalore - Whitefield</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs">Avg Price: ₹85,00,000</p>
                        <p className="text-xs">Price/Sqft: ₹8,500</p>
                        <p className="text-xs">Investment Score: 78/100</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-5 w-5" />
                NRI Compliance Suite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Document verification and FEMA compliance for overseas investors</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-nri-suite">
                Manage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Developer Audits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">RERA compliance and audit submission tracking</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-developer-audit">
                View Audits
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Land Records
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Multi-state land records aggregation and verification</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-land-records">
                Search Records
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                AI Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Authenticity verification and forgery detection</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-doc-verify">
                Upload Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Market trends, fraud rates, and investment scores</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-market-intel">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Generate comprehensive audit and compliance reports</p>
              <Button variant="outline" className="w-full" size="sm" data-testid="button-compliance-report">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
