import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, FileText, Scale, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  required: boolean;
  documents?: string[];
}

interface CompliancePhase {
  name: string;
  phase: "pre-purchase" | "post-purchase";
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const PRE_PURCHASE_CHECKLIST: ChecklistItem[] = [
  {
    id: "passport",
    name: "Passport Verification",
    description: "Verify passport validity and authenticity",
    completed: true,
    required: true,
    documents: ["Passport copy", "Visa copy"],
  },
  {
    id: "pan",
    name: "PAN Card Registration",
    description: "Register with Indian tax authorities using PAN",
    completed: true,
    required: true,
    documents: ["PAN application", "PAN certificate"],
  },
  {
    id: "oci",
    name: "OCI/PIO Verification",
    description: "Verify Overseas Citizen of India or Person of Indian Origin status",
    completed: false,
    required: false,
    documents: ["OCI certificate", "PIO registration"],
  },
  {
    id: "nre-nro",
    name: "NRE/NRO Account Verification",
    description: "Verify Non-Resident External or Non-Resident Ordinary bank account",
    completed: true,
    required: true,
    documents: ["Account statement", "Bank certification"],
  },
  {
    id: "income-proof",
    name: "Income Proof Submission",
    description: "Submit income documentation for financial eligibility",
    completed: false,
    required: true,
    documents: ["Recent tax returns", "Bank statements", "Salary slips"],
  },
  {
    id: "poa",
    name: "Power of Attorney (POA)",
    description: "Execute notarized POA for property transaction",
    completed: false,
    required: true,
    documents: ["Notarized POA", "Apostille certificate"],
  },
];

const POST_PURCHASE_CHECKLIST: ChecklistItem[] = [
  {
    id: "form15ca",
    name: "Form 15CA/15CB Filing",
    description: "File Form 15CA for TDS exemption and Form 15CB from Chartered Accountant",
    completed: false,
    required: true,
    documents: ["CA certificate", "Form 15CA", "Form 15CB"],
  },
  {
    id: "femal",
    name: "FEMAL Compliance",
    description: "Ensure compliance with Foreign Exchange Management Act Liberalized",
    completed: false,
    required: true,
    documents: ["FEMAL form", "Bank remittance proof"],
  },
  {
    id: "repatriation",
    name: "Repatriation Eligibility",
    description: "Verify eligibility for fund repatriation (typically USD 1 Million per financial year)",
    completed: false,
    required: false,
    documents: ["Repatriation form", "Investment proof"],
  },
  {
    id: "registration",
    name: "Property Registration",
    description: "Complete property registration with state authorities",
    completed: false,
    required: true,
    documents: ["Registered deed", "Registration certificate"],
  },
  {
    id: "mutation",
    name: "Mutation/Land Record Update",
    description: "Update land records with NRI as owner",
    completed: false,
    required: true,
    documents: ["Mutation form", "Revenue receipt"],
  },
  {
    id: "tax-filing",
    name: "Annual Tax Filing",
    description: "File income tax returns reporting rental income or capital gains",
    completed: false,
    required: true,
    documents: ["ITR form", "Income statement"],
  },
];

export default function NRI() {
  const { toast } = useToast();
  const [preItems, setPreItems] = useState(PRE_PURCHASE_CHECKLIST);
  const [postItems, setPostItems] = useState(POST_PURCHASE_CHECKLIST);
  const [email, setEmail] = useState("nri.user@example.com");

  const handleToggleItem = (id: string, phase: "pre" | "post") => {
    const items = phase === "pre" ? preItems : postItems;
    const setter = phase === "pre" ? setPreItems : setPostItems;
    setter(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    toast({
      title: "Checklist Updated",
      description: "Your compliance checklist has been saved.",
    });
  };

  const calculateCompletion = (items: ChecklistItem[]) => {
    const completed = items.filter((i) => i.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  const preCompletion = calculateCompletion(preItems);
  const postCompletion = calculateCompletion(postItems);
  const overallCompletion = Math.round((preCompletion + postCompletion) / 2);

  const ChecklistSection = ({
    title,
    items,
    phase,
    icon,
  }: {
    title: string;
    items: ChecklistItem[];
    phase: "pre" | "post";
    icon: React.ReactNode;
  }) => {
    const completed = items.filter((i) => i.completed).length;
    const progress = Math.round((completed / items.length) * 100);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  {completed} of {items.length} items completed
                </CardDescription>
              </div>
            </div>
            <Badge variant={progress === 100 ? "secondary" : "outline"}>
              {progress}%
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-muted hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => handleToggleItem(item.id, phase)}
                  className="mt-1"
                  data-testid={`checkbox-${item.id}`}
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={item.id}
                    className="cursor-pointer block"
                    data-testid={`label-${item.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </label>
                  {item.documents && item.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.documents.map((doc, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                          data-testid={`doc-badge-${item.id}-${idx}`}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                {item.completed && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-1" data-testid={`check-icon-${item.id}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">NRI Compliance Suite</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive compliance and document verification for NRI property transactions
            </p>
          </div>
          <Button data-testid="button-download-guide">
            <FileText className="h-4 w-4 mr-2" />
            Download Guide
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-overall-completion">{overallCompletion}%</div>
              <Progress value={overallCompletion} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pre-Purchase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-pre-completion">{preCompletion}%</div>
              <Progress value={preCompletion} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Post-Purchase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-post-completion">{postCompletion}%</div>
              <Progress value={postCompletion} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Repatriation Limit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-repatriation">USD 1M</div>
              <p className="text-xs text-muted-foreground mt-2">Per financial year</p>
            </CardContent>
          </Card>
        </div>

        {/* NRI Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              NRI Registration Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Registered Email</p>
                <p className="font-medium mt-1" data-testid="text-nri-email">{email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1 bg-amber-100 text-amber-700" data-testid="badge-status">
                  In Progress
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium mt-1" data-testid="text-last-updated">November 24, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklists */}
        <Tabs defaultValue="pre" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pre">Pre-Purchase</TabsTrigger>
            <TabsTrigger value="post">Post-Purchase</TabsTrigger>
          </TabsList>

          <TabsContent value="pre" className="space-y-4 mt-6">
            <ChecklistSection
              title="Pre-Purchase Compliance"
              items={preItems}
              phase="pre"
              icon={<Scale className="h-5 w-5 text-blue-600" />}
            />
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Pre-Purchase Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Complete all identity and financial verification before proceeding</p>
                <p>• Ensure NRE/NRO account is activated for fund transfers</p>
                <p>• Obtain and notarize Power of Attorney if buying through representative</p>
                <p>• Verify all documents are apostilled for international validity</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="post" className="space-y-4 mt-6">
            <ChecklistSection
              title="Post-Purchase Compliance"
              items={postItems}
              phase="post"
              icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
            />
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Post-Purchase Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• File Form 15CA/15CB within 30 days for TDS exemption</p>
                <p>• Register property within 2 months of purchase</p>
                <p>• Update land records via mutation process within 3 months</p>
                <p>• File annual income tax returns if earning rental income</p>
                <p>• Maintain documentation for repatriation eligibility</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Compliance Dates */}
        <Card>
          <CardHeader>
            <CardTitle>Important Compliance Dates & Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-muted">
                <div>
                  <p className="font-medium">Form 15CA/15CB Filing</p>
                  <p className="text-sm text-muted-foreground">TDS exemption request</p>
                </div>
                <Badge variant="outline" data-testid="badge-15ca">Within 30 days</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-muted">
                <div>
                  <p className="font-medium">Property Registration</p>
                  <p className="text-sm text-muted-foreground">Sub-registrar office</p>
                </div>
                <Badge variant="outline" data-testid="badge-registration">Within 2 months</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-muted">
                <div>
                  <p className="font-medium">Land Record Mutation</p>
                  <p className="text-sm text-muted-foreground">District revenue office</p>
                </div>
                <Badge variant="outline" data-testid="badge-mutation">Within 3 months</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-muted">
                <div>
                  <p className="font-medium">Annual Tax Filing</p>
                  <p className="text-sm text-muted-foreground">Income tax department</p>
                </div>
                <Badge variant="outline" data-testid="badge-tax">By July 31st</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
