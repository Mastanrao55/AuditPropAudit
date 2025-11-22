import { LucideIcon, ShieldAlert, ShieldCheck, AlertTriangle, Gavel, Landmark, Users } from "lucide-react";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface RiskFactor {
  id: string;
  category: "LEGAL" | "FINANCIAL" | "IDENTITY" | "REGULATORY";
  severity: RiskLevel;
  title: string;
  description: string;
}

export interface Owner {
  id: string;
  name: string;
  type: "INDIVIDUAL" | "COMPANY";
  maskedPan: string;
  maskedAadhaar?: string;
  kycStatus: "VERIFIED" | "PENDING" | "FAILED";
  sharePercentage: number;
}

export interface LegalCase {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  status: "OPEN" | "CLOSED" | "DISPOSED";
  type: "CIVIL" | "CRIMINAL" | "REVENUE";
  date: string;
  summary: string;
}

export interface Loan {
  id: string;
  bankName: string;
  amount: number;
  status: "ACTIVE" | "CLOSED" | "DEFAULTED";
  dateSanctioned: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  surveyNumber: string;
  type: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
  marketValue: number;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  image: string;
  owners: Owner[];
  cases: LegalCase[];
  loans: Loan[];
  riskFactors: RiskFactor[];
  reraId?: string;
  lastAudited: string;
}

// Helper to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Mock Data
import stockImage1 from "@assets/stock_images/modern_office_buildi_fceaff61.jpg";
import stockImage2 from "@assets/stock_images/luxury_apartment_bui_44589a5a.jpg";
import stockImage3 from "@assets/stock_images/luxury_apartment_bui_6e69de91.jpg";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "PROP-001",
    title: "Sunrise Heights, Wing A",
    address: "Plot No. 45, Sector 18, Vashi",
    city: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "400703",
    surveyNumber: "S-12/45-A",
    type: "RESIDENTIAL",
    marketValue: 25000000,
    riskScore: 85,
    riskLevel: "LOW",
    image: stockImage2,
    lastAudited: "2023-11-15",
    reraId: "P51700001234",
    owners: [
      {
        id: "OWN-001",
        name: "Rajesh Kumar Gupta",
        type: "INDIVIDUAL",
        maskedPan: "ABC*****12F",
        maskedAadhaar: "********9023",
        kycStatus: "VERIFIED",
        sharePercentage: 100
      }
    ],
    cases: [],
    loans: [
      {
        id: "LN-101",
        bankName: "HDFC Bank",
        amount: 15000000,
        status: "ACTIVE",
        dateSanctioned: "2021-05-20"
      }
    ],
    riskFactors: []
  },
  {
    id: "PROP-002",
    title: "Tech Park One - Office 304",
    address: "IT Park Road, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
    surveyNumber: "SY-88/2",
    type: "COMMERCIAL",
    marketValue: 45000000,
    riskScore: 45,
    riskLevel: "HIGH",
    image: stockImage1,
    lastAudited: "2023-10-01",
    owners: [
      {
        id: "OWN-002",
        name: "Innovate Solutions Pvt Ltd",
        type: "COMPANY",
        maskedPan: "AAAC*****1H",
        kycStatus: "VERIFIED",
        sharePercentage: 100
      }
    ],
    cases: [
      {
        id: "CS-501",
        title: "Land Acquisition Dispute",
        caseNumber: "OS/2022/451",
        court: "Civil Court, Bengaluru",
        status: "OPEN",
        type: "CIVIL",
        date: "2022-03-15",
        summary: "Dispute regarding the southern boundary wall encroachment."
      }
    ],
    loans: [
      {
        id: "LN-202",
        bankName: "SBI",
        amount: 30000000,
        status: "DEFAULTED",
        dateSanctioned: "2019-08-10"
      }
    ],
    riskFactors: [
      {
        id: "RF-001",
        category: "LEGAL",
        severity: "HIGH",
        title: "Active Litigation",
        description: "Property is subject to an ongoing civil suit regarding boundary disputes."
      },
      {
        id: "RF-002",
        category: "FINANCIAL",
        severity: "CRITICAL",
        title: "Loan Default",
        description: "Primary mortgage with SBI is currently classified as NPA."
      }
    ]
  },
  {
    id: "PROP-003",
    title: "Green Valley Plot 12",
    address: "Survey 44, Village Marunji",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411057",
    surveyNumber: "7/12-44",
    type: "LAND",
    marketValue: 12000000,
    riskScore: 65,
    riskLevel: "MEDIUM",
    image: stockImage3,
    lastAudited: "2023-12-05",
    owners: [
      {
        id: "OWN-003",
        name: "Suresh Patil",
        type: "INDIVIDUAL",
        maskedPan: "BKP*****45K",
        kycStatus: "VERIFIED",
        sharePercentage: 50
      },
      {
        id: "OWN-004",
        name: "Ramesh Patil",
        type: "INDIVIDUAL",
        maskedPan: "BKP*****46L",
        kycStatus: "PENDING",
        sharePercentage: 50
      }
    ],
    cases: [],
    loans: [],
    riskFactors: [
      {
        id: "RF-003",
        category: "IDENTITY",
        severity: "MEDIUM",
        title: "KYC Pending",
        description: "One of the co-owners (Ramesh Patil) has not completed video KYC."
      }
    ]
  }
];

export const stats = [
  { title: "Properties Audited", value: "12,450", change: "+12% this month" },
  { title: "High Risk Flags", value: "843", change: "+5% this month", alert: true },
  { title: "Verified Owners", value: "24,102", change: "+18% this month" },
  { title: "API Calls", value: "1.2M", change: "+25% this month" },
];
