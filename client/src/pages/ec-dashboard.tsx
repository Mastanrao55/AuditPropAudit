import { Layout } from "@/components/layout";
import { SEO, seoData } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  FileText,
  Search,
  Download,
  AlertCircle,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Mock EC property data with multiple search identifiers
const MOCK_PROPERTIES = [
  {
    id: "EC-KA-2024-001",
    surveyNumber: "SV-123-456",
    houseNumber: "12A, 3rd Cross Road",
    registeredDocNo: "DOC-20240001-KA",
    propertyAddress: "Koramangala, Bangalore",
    state: "Karnataka",
    district: "Bangalore Urban",
    taluk: "Bangalore South",
    village: "Koramangala",
    owner: "Rajesh Kumar Sharma",
    ownerId: "OWNER-001",
    ownerPhone: "+91-98765-43210",
    ownerEmail: "rajesh@example.com",
    propertyType: "Residential - Apartment",
    propertyStatus: "verified",
    registrationStatus: "registered",
    registrationDate: "2023-05-15",
    documentDate: "2023-05-10",
    landArea: "1200 sqft",
    builtupArea: "950 sqft",
    marketValue: "₹65 Lakhs",
    taxStatus: "current",
    propertyTaxPaid: "₹12,500",
    propertyTaxDue: "None",
    mortgageStatus: "none",
    encumbrances: [],
    complaints: 0,
    lastVerified: "2024-11-15",
    verificationScore: 95,
  },
  {
    id: "EC-MH-2024-002",
    surveyNumber: "SV-789-012",
    houseNumber: "5B, Marine Drive",
    registeredDocNo: "DOC-20240002-MH",
    propertyAddress: "Colaba, Mumbai",
    state: "Maharashtra",
    district: "Mumbai",
    taluk: "Mumbai Island",
    village: "Colaba",
    owner: "Priya Desai",
    ownerId: "OWNER-002",
    ownerPhone: "+91-87654-32109",
    ownerEmail: "priya.d@example.com",
    propertyType: "Residential - Villa",
    propertyStatus: "verified",
    registrationStatus: "registered",
    registrationDate: "2022-08-20",
    documentDate: "2022-08-15",
    landArea: "2500 sqft",
    builtupArea: "1800 sqft",
    marketValue: "₹2.5 Crores",
    taxStatus: "current",
    propertyTaxPaid: "₹50,000",
    propertyTaxDue: "None",
    mortgageStatus: "none",
    encumbrances: [],
    complaints: 0,
    lastVerified: "2024-11-10",
    verificationScore: 98,
  },
  {
    id: "EC-DL-2024-003",
    surveyNumber: "SV-345-678",
    houseNumber: "42, Sector-12",
    registeredDocNo: "DOC-20240003-DL",
    propertyAddress: "Vasant Kunj, New Delhi",
    state: "Delhi",
    district: "South Delhi",
    taluk: "Vasant Kunj",
    village: "Vasant Kunj",
    owner: "Amit Verma",
    ownerId: "OWNER-003",
    ownerPhone: "+91-76543-21098",
    ownerEmail: "amit.v@example.com",
    propertyType: "Commercial - Office",
    propertyStatus: "flagged",
    registrationStatus: "registered",
    registrationDate: "2021-03-10",
    documentDate: "2021-03-05",
    landArea: "3000 sqft",
    builtupArea: "2800 sqft",
    marketValue: "₹4.2 Crores",
    taxStatus: "overdue",
    propertyTaxPaid: "₹75,000",
    propertyTaxDue: "₹25,000",
    mortgageStatus: "mortgage-active",
    mortgageAmount: "₹1.5 Cr",
    mortgageeBank: "HDFC Bank",
    encumbrances: ["Mortgage - HDFC Bank"],
    complaints: 2,
    complaintDetails: ["Tax payment overdue", "Mortgage payment pending"],
    lastVerified: "2024-10-20",
    verificationScore: 62,
  },
  {
    id: "EC-GJ-2024-004",
    surveyNumber: "SV-567-890",
    houseNumber: "78, Ahmedabad Road",
    registeredDocNo: "DOC-20240004-GJ",
    propertyAddress: "Ahmedabad, Gujarat",
    state: "Gujarat",
    district: "Ahmedabad",
    taluk: "Ahmedabad",
    village: "Ahmedabad",
    owner: "Neha Patel",
    ownerId: "OWNER-004",
    ownerPhone: "+91-65432-10987",
    ownerEmail: "neha.p@example.com",
    propertyType: "Residential - Plot",
    propertyStatus: "pending",
    registrationStatus: "pending-registration",
    registrationDate: null,
    documentDate: "2024-09-12",
    landArea: "1500 sqft",
    builtupArea: "0 sqft",
    marketValue: "₹40 Lakhs",
    taxStatus: "pending",
    propertyTaxPaid: "None",
    propertyTaxDue: "Awaiting registration",
    mortgageStatus: "none",
    encumbrances: [],
    complaints: 1,
    complaintDetails: ["Registration under process"],
    lastVerified: "2024-11-12",
    verificationScore: 78,
  },
  {
    id: "EC-TG-2024-005",
    surveyNumber: "SV-234-567",
    houseNumber: "90C, Jubilee Hills",
    registeredDocNo: "DOC-20240005-TG",
    propertyAddress: "Hyderabad, Telangana",
    state: "Telangana",
    district: "Hyderabad",
    taluk: "Hyderabad",
    village: "Hyderabad",
    owner: "Vikram Singh",
    ownerId: "OWNER-005",
    ownerPhone: "+91-54321-09876",
    ownerEmail: "vikram.s@example.com",
    propertyType: "Residential - Apartment",
    propertyStatus: "flagged",
    registrationStatus: "registered",
    registrationDate: "2020-12-01",
    documentDate: "2020-11-25",
    landArea: "1800 sqft",
    builtupArea: "1400 sqft",
    marketValue: "₹90 Lakhs",
    taxStatus: "overdue",
    propertyTaxPaid: "₹18,000",
    propertyTaxDue: "₹6,500",
    mortgageStatus: "mortgage-active",
    mortgageAmount: "₹50 Lakhs",
    mortgageeBank: "SBI",
    encumbrances: ["Mortgage - SBI", "Lien - Municipal Corporation"],
    complaints: 3,
    complaintDetails: ["Property tax overdue", "Municipal violation - unapproved structure", "Encumbrance complaint"],
    lastVerified: "2024-11-08",
    verificationScore: 45,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-emerald-500/10 text-emerald-700";
    case "flagged":
      return "bg-red-500/10 text-red-700";
    case "pending":
      return "bg-amber-500/10 text-amber-700";
    default:
      return "bg-gray-500/10 text-gray-700";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-emerald-500">Verified</Badge>;
    case "flagged":
      return <Badge className="bg-red-500">Flagged</Badge>;
    case "pending":
      return <Badge className="bg-amber-500">Pending</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function ECDashboard() {
  const { toast } = useToast();
  const [searchType, setSearchType] = useState<"survey" | "house" | "document">("survey");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    let matchesSearch = true;
    if (searchQuery) {
      if (searchType === "survey") {
        matchesSearch = property.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "house") {
        matchesSearch = property.houseNumber.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "document") {
        matchesSearch = property.registeredDocNo.toLowerCase().includes(searchQuery.toLowerCase());
      }
    }
    const matchesState = !selectedState || property.state === selectedState;
    return matchesSearch && matchesState;
  });

  const selectedPropertyData = selectedProperty
    ? MOCK_PROPERTIES.find((p) => p.id === selectedProperty)
    : null;

  const uniqueStates = Array.from(new Set(MOCK_PROPERTIES.map((p) => p.state)));

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Download Started",
      description: "Your property verification certificate is being generated. Download will start shortly.",
    });
  };

  return (
    <Layout>
      <SEO {...seoData.ecDashboard} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">EC Property Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              State-wise property verification and registration status. Search by survey number, house number, or registered document number.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Search */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Property Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search Type</label>
                    <div className="space-y-2">
                      {["survey", "house", "document"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSearchType(type as any)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            searchType === type
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                          data-testid={`button-search-type-${type}`}
                        >
                          {type === "survey" && "Survey Number"}
                          {type === "house" && "House Number"}
                          {type === "document" && "Document Number"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {searchType === "survey" && "Survey Number (e.g., SV-123-456)"}
                      {searchType === "house" && "House Number/Address"}
                      {searchType === "document" && "Document Number (e.g., DOC-20240001)"}
                    </label>
                    <Input
                      placeholder={
                        searchType === "survey"
                          ? "SV-123-456"
                          : searchType === "house"
                          ? "12A, 3rd Cross"
                          : "DOC-20240001"
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-ec-search"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Filter by State</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => setSelectedState(null)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedState === null
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        data-testid="button-state-all"
                      >
                        All States
                      </button>
                      {uniqueStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => setSelectedState(state)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedState === state
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                          data-testid={`button-state-${state}`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Properties List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Properties Found ({filteredProperties.length})</h3>
                {filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className={`cursor-pointer transition-all ${
                      selectedProperty === property.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedProperty(property.id)}
                    data-testid={`card-property-${property.id}`}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm">{property.houseNumber}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{property.state}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(property.propertyStatus)}
                          {property.complaints > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {property.complaints} Issues
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Score: {property.verificationScore}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel - Property Details */}
            <div className="lg:col-span-2">
              {selectedPropertyData ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview" className="text-xs" data-testid="tab-property-overview">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="owner" className="text-xs" data-testid="tab-property-owner">
                      Owner
                    </TabsTrigger>
                    <TabsTrigger value="financial" className="text-xs" data-testid="tab-property-financial">
                      Financial
                    </TabsTrigger>
                    <TabsTrigger value="complaints" className="text-xs" data-testid="tab-property-complaints">
                      Status
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{selectedPropertyData.houseNumber}</CardTitle>
                            <CardDescription>{selectedPropertyData.propertyAddress}</CardDescription>
                          </div>
                          {getStatusBadge(selectedPropertyData.propertyStatus)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Search Identifiers */}
                        <div className="border-b pb-4">
                          <h4 className="font-semibold mb-3">Property Identifiers</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Survey No.</p>
                              <p className="font-mono font-medium">{selectedPropertyData.surveyNumber}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Document No.</p>
                              <p className="font-mono font-medium">{selectedPropertyData.registeredDocNo}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Verification Score</p>
                              <p className="font-bold text-emerald-600">{selectedPropertyData.verificationScore}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Location Details */}
                        <div className="border-b pb-4">
                          <h4 className="font-semibold mb-3">Location Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">State</p>
                              <p className="font-medium">{selectedPropertyData.state}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">District</p>
                              <p className="font-medium">{selectedPropertyData.district}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Taluk</p>
                              <p className="font-medium">{selectedPropertyData.taluk}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Village</p>
                              <p className="font-medium">{selectedPropertyData.village}</p>
                            </div>
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="border-b pb-4">
                          <h4 className="font-semibold mb-3">Property Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Type</p>
                              <p className="font-medium">{selectedPropertyData.propertyType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Land Area</p>
                              <p className="font-medium">{selectedPropertyData.landArea}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Builtup Area</p>
                              <p className="font-medium">{selectedPropertyData.builtupArea}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Market Value</p>
                              <p className="font-medium text-blue-600">{selectedPropertyData.marketValue}</p>
                            </div>
                          </div>
                        </div>

                        {/* Registration Status */}
                        <div>
                          <h4 className="font-semibold mb-3">Registration Status</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Status</p>
                              <p className="font-medium">
                                {selectedPropertyData.registrationStatus === "registered" ? "✓ Registered" : "⏳ Pending"}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Registration Date</p>
                              <p className="font-medium">
                                {selectedPropertyData.registrationDate
                                  ? new Date(selectedPropertyData.registrationDate).toLocaleDateString()
                                  : "Pending"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button onClick={handleDownloadCertificate} className="w-full gap-2" data-testid="button-download-ec">
                          <Download className="h-4 w-4" />
                          Download Verification Certificate
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Owner Tab */}
                  <TabsContent value="owner" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Owner Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{selectedPropertyData.owner}</h4>
                              <p className="text-sm text-muted-foreground">ID: {selectedPropertyData.ownerId}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{selectedPropertyData.ownerPhone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium break-all">{selectedPropertyData.ownerEmail}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-xs text-muted-foreground">Last Verified: {new Date(selectedPropertyData.lastVerified).toLocaleDateString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Financial Tab */}
                  <TabsContent value="financial" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Financial & Tax Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Tax Status */}
                        <div className="border-b pb-4">
                          <h4 className="font-semibold mb-3">Property Tax</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Tax Status</p>
                              <Badge className={selectedPropertyData.taxStatus === "current" ? "bg-emerald-500" : "bg-red-500"}>
                                {selectedPropertyData.taxStatus === "current" ? "Current" : "Overdue"}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Tax Paid</p>
                              <p className="font-medium">{selectedPropertyData.propertyTaxPaid}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Tax Due</p>
                              <p className={`font-medium ${selectedPropertyData.propertyTaxDue === "None" ? "text-emerald-600" : "text-red-600"}`}>
                                {selectedPropertyData.propertyTaxDue}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mortgage Status */}
                        <div>
                          <h4 className="font-semibold mb-3">Mortgage & Encumbrances</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="text-sm text-muted-foreground">Mortgage Status</p>
                              <p className="font-medium">
                                {selectedPropertyData.mortgageStatus === "none"
                                  ? "✓ No Mortgage"
                                  : selectedPropertyData.mortgageStatus === "mortgage-active"
                                  ? "Active Mortgage"
                                  : "Unknown"}
                              </p>
                              {selectedPropertyData.mortgageAmount && (
                                <>
                                  <p className="text-sm text-muted-foreground mt-2">Mortgage Amount</p>
                                  <p className="font-medium">{selectedPropertyData.mortgageAmount}</p>
                                </>
                              )}
                              {selectedPropertyData.mortgageeBank && (
                                <>
                                  <p className="text-sm text-muted-foreground mt-2">Mortgagee Bank</p>
                                  <p className="font-medium">{selectedPropertyData.mortgageeBank}</p>
                                </>
                              )}
                            </div>

                            {selectedPropertyData.encumbrances.length > 0 && (
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Encumbrances</p>
                                <div className="space-y-2">
                                  {selectedPropertyData.encumbrances.map((enc, idx) => (
                                    <Badge key={idx} variant="outline" className="block text-left">
                                      {enc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Complaints Tab */}
                  <TabsContent value="complaints" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Property Status & Complaints</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedPropertyData.complaints === 0 ? (
                          <div className="text-center py-6">
                            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                            <p className="font-semibold">No Issues Found</p>
                            <p className="text-sm text-muted-foreground">
                              This property has a clean record with no complaints
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {selectedPropertyData.complaintDetails &&
                              selectedPropertyData.complaintDetails.map((complaint, idx) => (
                                <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{complaint}</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}

                        <div className="border-t pt-4 mt-4">
                          <h4 className="font-semibold mb-3">Verification Timeline</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Document Date:</span>
                              <span className="font-medium">
                                {new Date(selectedPropertyData.documentDate).toLocaleDateString()}
                              </span>
                            </div>
                            {selectedPropertyData.registrationDate && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Registration Date:</span>
                                <span className="font-medium">
                                  {new Date(selectedPropertyData.registrationDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Verified:</span>
                              <span className="font-medium">
                                {new Date(selectedPropertyData.lastVerified).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold mb-2">Select a Property</h3>
                    <p className="text-sm text-muted-foreground">
                      Search and select a property to view detailed information, registration status, and complaints
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
