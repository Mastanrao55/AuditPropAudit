import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download,
  Eye,
  Shield,
  AlertCircle,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DocumentAnalysis {
  id: string;
  fileName: string;
  documentType: string;
  uploadedAt: string;
  authenticityScore: number;
  forgerySuspicion: "low" | "medium" | "high";
  signatureVerified: boolean;
  stampValid: boolean;
  extractedText: string;
  inconsistencies: string[];
  matchesWithProperty: { field: string; match: boolean; details: string }[];
  aiRecommendation: string;
  manualReviewNeeded: boolean;
  issues: { type: string; severity: "low" | "medium" | "high" | "critical"; description: string }[];
}

const DOCUMENT_ANALYSES: DocumentAnalysis[] = [
  {
    id: "DOC-001",
    fileName: "Sale_Deed_Bangalore.pdf",
    documentType: "Sale Deed",
    uploadedAt: "2025-01-15T10:30:00Z",
    authenticityScore: 95,
    forgerySuspicion: "low",
    signatureVerified: true,
    stampValid: true,
    extractedText:
      "Sale Deed registered between Seller: Rajesh Kumar and Buyer: Priya Sharma for Property at MG Road, Bangalore. Price: ₹85,00,000. Date of Sale: 01-01-2025...",
    inconsistencies: [],
    matchesWithProperty: [
      { field: "Property Address", match: true, details: "123 MG Road, Bangalore matches perfectly" },
      { field: "Sale Price", match: true, details: "₹85,00,000 matches database record" },
      { field: "Buyer Name", match: true, details: "Priya Sharma verified" },
      { field: "Registration Date", match: true, details: "01-01-2025 properly registered" },
    ],
    aiRecommendation:
      "APPROVED - Document is authentic with no signs of forgery. All details match property records. Safe to proceed.",
    manualReviewNeeded: false,
    issues: [],
  },
  {
    id: "DOC-002",
    fileName: "Title_Deed_Mumbai.pdf",
    documentType: "Title Deed",
    uploadedAt: "2025-01-16T14:22:00Z",
    authenticityScore: 62,
    forgerySuspicion: "high",
    signatureVerified: false,
    stampValid: false,
    extractedText:
      "Title Deed for Property in Bandra, Mumbai. Seller: Unknown Entity ABC Ltd. Previous Owner: Multiple transfers. Document contains watermark inconsistencies...",
    inconsistencies: [
      "Watermark pattern differs from authentic government documents",
      "Signature does not match historical records",
      "Official stamp appears to be digitally altered",
    ],
    matchesWithProperty: [
      {
        field: "Property Address",
        match: false,
        details: "Document states 'Bandra Flat' but property records show 'Bandra Towers'",
      },
      { field: "Seller Identity", match: false, details: "Seller listed as 'ABC Ltd' but no registration found" },
      { field: "Price", match: false, details: "Document price ₹1.8Cr but market value ₹2.2Cr" },
      { field: "Title Chain", match: false, details: "Missing 2 years of ownership records (2020-2022)" },
    ],
    aiRecommendation:
      "ALERT - MANUAL REVIEW REQUIRED. Multiple red flags detected: forged signature, altered stamp, price anomaly, and broken title chain. DO NOT PROCEED without further investigation.",
    manualReviewNeeded: true,
    issues: [
      {
        type: "Signature Forgery",
        severity: "critical",
        description:
          "Seller's signature does not match previous document signatures. High probability of forgery.",
      },
      {
        type: "Stamp Tampering",
        severity: "critical",
        description: "Official government stamp shows signs of digital alteration using AI detection",
      },
      { type: "Price Anomaly", severity: "high", description: "Price is 18% below market rate - possible fraud" },
      {
        type: "Broken Title Chain",
        severity: "high",
        description: "Missing mutation records for 2020-2022 period",
      },
    ],
  },
  {
    id: "DOC-003",
    fileName: "Building_Approval_Delhi.pdf",
    documentType: "Building Approval",
    uploadedAt: "2025-01-14T09:15:00Z",
    authenticityScore: 78,
    forgerySuspicion: "medium",
    signatureVerified: true,
    stampValid: true,
    extractedText:
      "Building Approval Certificate for Construction at Gurgaon. Issued by Municipal Corporation. Approval Date: 15-06-2020. Project Stage: Completed...",
    inconsistencies: [
      "Approval date is 4+ years old - may need renewal",
      "Project completion status unclear in document",
    ],
    matchesWithProperty: [
      { field: "Property Location", match: true, details: "Gurgaon location verified" },
      { field: "Approval Authority", match: true, details: "Municipal Corporation authority valid" },
      { field: "Project Status", match: false, details: "Document says 'Completed' but property shows 'Under Construction'" },
    ],
    aiRecommendation:
      "CAUTION - Proceed with verification. Document is mostly authentic but requires clarification on project status mismatch. Recommend checking with municipal office.",
    manualReviewNeeded: true,
    issues: [
      {
        type: "Project Status Mismatch",
        severity: "medium",
        description: "Approval shows 'Completed' but property database shows 'Under Construction'",
      },
      {
        type: "Approval Expiry",
        severity: "medium",
        description:
          "Building approval is from 2020 - verify if renewal is required as per current municipal norms",
      },
    ],
  },
];

const DOCUMENT_TYPES = [
  "Sale Deed",
  "Title Deed",
  "Building Approval",
  "No Objection Certificate (NOC)",
  "Encumbrance Certificate",
  "Municipal Certificate",
  "Tax Receipt",
  "Power of Attorney",
];

export default function DocumentVerification() {
  const { toast } = useToast();
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentAnalysis[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selectedDocType) {
      toast({
        title: "Selection Required",
        description: "Please select a document type first.",
      });
      return;
    }

    setIsScanning(true);
    // Simulate AI scanning
    setTimeout(() => {
      const mockDoc =
        DOCUMENT_ANALYSES[Math.floor(Math.random() * DOCUMENT_ANALYSES.length)];
      const newDoc = {
        ...mockDoc,
        fileName: files[0].name,
        documentType: selectedDocType,
        uploadedAt: new Date().toISOString(),
      };
      setUploadedDocuments([newDoc, ...uploadedDocuments]);
      setSelectedDocument(newDoc);
      setIsScanning(false);
      toast({
        title: "Document Scanned",
        description: `${files[0].name} analyzed with AI verification complete.`,
      });
    }, 2000);
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getRiskColor = (level: string) => {
    if (level === "low") return "bg-emerald-50 border-emerald-200";
    if (level === "medium") return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "critical") return "bg-red-100 text-red-700";
    if (severity === "high") return "bg-orange-100 text-orange-700";
    if (severity === "medium") return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI Document Verification
            </h1>
            <p className="text-muted-foreground mt-1">
              Upload property documents for AI-powered verification, forgery detection, and inconsistency analysis
            </p>
          </div>
          <Button className="gap-2" data-testid="button-export-docs">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Property Document
            </CardTitle>
            <CardDescription>
              Upload PDFs, images, or scanned documents for AI verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Document Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DOCUMENT_TYPES.map((type) => (
                  <Button
                    key={type}
                    variant={selectedDocType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDocType(type)}
                    data-testid={`button-doctype-${type.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.tiff"
                onChange={handleFileUpload}
                disabled={isScanning || !selectedDocType}
                className="hidden"
                id="file-upload"
                data-testid="input-file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="font-medium">Scanning with AI...</p>
                    <p className="text-xs text-muted-foreground">
                      Analyzing document for authenticity, forgery, and inconsistencies
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG, or TIFF (Max 10MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Document History */}
        {uploadedDocuments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents ({uploadedDocuments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedDocument(doc)}
                    data-testid={`doc-history-${doc.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.documentType} • {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={getAuthenticityColor(doc.authenticityScore)}
                        variant={
                          doc.authenticityScore >= 90
                            ? "default"
                            : doc.authenticityScore >= 70
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {doc.authenticityScore}% Authentic
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Analysis */}
        {selectedDocument && (
          <>
            {/* Overall Assessment */}
            <Card
              className={
                selectedDocument.authenticityScore >= 90
                  ? "border-emerald-200 bg-emerald-50"
                  : selectedDocument.authenticityScore >= 70
                  ? "border-amber-200 bg-amber-50"
                  : "border-red-200 bg-red-50"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedDocument.fileName}</CardTitle>
                    <CardDescription>{selectedDocument.documentType}</CardDescription>
                  </div>
                  <Badge
                    className={`text-lg px-4 py-2 ${
                      selectedDocument.authenticityScore >= 90
                        ? "bg-emerald-100 text-emerald-700"
                        : selectedDocument.authenticityScore >= 70
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    data-testid="badge-authenticity"
                  >
                    {selectedDocument.authenticityScore}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Authenticity Score</span>
                    <span className={`text-sm font-semibold ${getAuthenticityColor(selectedDocument.authenticityScore)}`}>
                      {selectedDocument.authenticityScore >= 90
                        ? "Highly Authentic"
                        : selectedDocument.authenticityScore >= 70
                        ? "Questionable"
                        : "Likely Forged"}
                    </span>
                  </div>
                  <Progress value={selectedDocument.authenticityScore} className="h-3" />
                </div>

                <Alert className="bg-white border">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold mb-1">AI Recommendation:</p>
                    <p className="text-sm" data-testid="text-recommendation">
                      {selectedDocument.aiRecommendation}
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Signature Verified</p>
                    <p className="font-semibold flex items-center gap-1 mt-1">
                      {selectedDocument.signatureVerified ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Yes
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-red-600" /> No
                        </>
                      )}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Stamp Valid</p>
                    <p className="font-semibold flex items-center gap-1 mt-1">
                      {selectedDocument.stampValid ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Yes
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-red-600" /> No
                        </>
                      )}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Forgery Risk</p>
                    <Badge
                      className="mt-1"
                      variant={
                        selectedDocument.forgerySuspicion === "low"
                          ? "outline"
                          : selectedDocument.forgerySuspicion === "medium"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {selectedDocument.forgerySuspicion.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Manual Review</p>
                    <p className="font-semibold flex items-center gap-1 mt-1">
                      {selectedDocument.manualReviewNeeded ? (
                        <>
                          <AlertCircle className="h-4 w-4 text-amber-600" /> Needed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Not Needed
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed analysis */}
            <Tabs defaultValue="property-match" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="property-match">Property Match</TabsTrigger>
                <TabsTrigger value="inconsistencies">Inconsistencies</TabsTrigger>
                <TabsTrigger value="extracted-text">Text Extract</TabsTrigger>
                <TabsTrigger value="issues">Issues Found</TabsTrigger>
              </TabsList>

              {/* Property Matching */}
              <TabsContent value="property-match" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Document vs Property Database Matching</CardTitle>
                    <CardDescription>
                      Comparison of extracted document data with property records
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedDocument.matchesWithProperty.map((match, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border ${match.match ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}
                        data-testid={`match-${idx}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-sm">{match.field}</p>
                            <p className="text-sm text-muted-foreground mt-1">{match.details}</p>
                          </div>
                          {match.match ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inconsistencies */}
              <TabsContent value="inconsistencies" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detected Inconsistencies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDocument.inconsistencies.length === 0 ? (
                      <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50 text-center">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                        <p className="font-medium text-emerald-900">No inconsistencies detected</p>
                        <p className="text-xs text-emerald-700 mt-1">
                          Document is consistent with property records
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDocument.inconsistencies.map((inconsistency, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg border border-amber-200 bg-amber-50"
                            data-testid={`inconsistency-${idx}`}
                          >
                            <p className="text-sm font-medium text-amber-900">⚠️ {inconsistency}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Extracted Text */}
              <TabsContent value="extracted-text" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4" /> OCR Extracted Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                      {selectedDocument.extractedText}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Issues */}
              <TabsContent value="issues" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Issues & Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDocument.issues.length === 0 ? (
                      <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50 text-center">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                        <p className="font-medium text-emerald-900">No issues found</p>
                        <p className="text-xs text-emerald-700 mt-1">Document passed all AI verification checks</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDocument.issues.map((issue, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-lg border ${getRiskColor(issue.severity)}`}
                            data-testid={`issue-${idx}`}
                          >
                            <div className="flex items-start gap-3">
                              <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5`} />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-sm">{issue.type}</p>
                                  <Badge className={getSeverityColor(issue.severity)} data-testid={`badge-severity-${idx}`}>
                                    {issue.severity.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm">{issue.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Sample Documents Guide */}
        {uploadedDocuments.length === 0 && !selectedDocument && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                How AI Document Verification Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">1️⃣ Upload & Scan</p>
                  <p className="text-xs text-muted-foreground">
                    Upload property documents (PDF, images) and AI scans with OCR to extract all text and data
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">2️⃣ Authenticity Check</p>
                  <p className="text-xs text-muted-foreground">
                    AI analyzes signatures, stamps, watermarks, and document patterns for forgery detection
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">3️⃣ Data Verification</p>
                  <p className="text-xs text-muted-foreground">
                    Extracted data is matched against property database records to identify inconsistencies
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">4️⃣ Fraud Analysis</p>
                  <p className="text-xs text-muted-foreground">
                    AI flags suspicious patterns like altered stamps, signature mismatches, price anomalies
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">5️⃣ Risk Assessment</p>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive risk score (0-100) generated with severity levels and recommendations
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">6️⃣ Detailed Report</p>
                  <p className="text-xs text-muted-foreground">
                    Download complete analysis report with all findings and recommendations for manual review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Try Sample Documents */}
        {uploadedDocuments.length === 0 && !selectedDocument && (
          <Card>
            <CardHeader>
              <CardTitle>Try Sample Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DOCUMENT_ANALYSES.map((doc, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => {
                      setSelectedDocument(doc);
                      setUploadedDocuments([doc]);
                    }}
                    data-testid={`button-sample-${idx}`}
                  >
                    <div className="text-left">
                      <p className="font-medium">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.documentType} • Authenticity: {doc.authenticityScore}%
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
