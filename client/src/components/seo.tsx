import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://replit.com/public/images/opengraph.png"
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("AssetzAudit") ? title : `${title} | AssetzAudit`;
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMetaTag("description", description);
    if (keywords) updateMetaTag("keywords", keywords);
    
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    if (ogImage) updateMetaTag("og:image", ogImage, true);
    
    updateMetaTag("twitter:title", fullTitle, true);
    updateMetaTag("twitter:description", description, true);
    if (ogImage) updateMetaTag("twitter:image", ogImage, true);

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    return () => {
      document.title = "AssetzAudit — 360° Property Due-Diligence";
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage]);

  return null;
}

export const seoData = {
  home: {
    title: "AssetzAudit — 360° Property Due-Diligence Platform",
    description: "Enterprise-grade property audit platform for Indian real estate. Verified identity checks, financial encumbrances, legal history, fraud detection, and comprehensive risk scoring.",
    keywords: "property verification, real estate due diligence, property fraud detection, encumbrance certificate, title verification, RERA compliance, property audit India"
  },
  dashboard: {
    title: "Dashboard",
    description: "View and manage your property audits, search properties, and access comprehensive due-diligence reports.",
    keywords: "property dashboard, audit management, property search, due diligence reports"
  },
  solutions: {
    title: "Solutions",
    description: "Comprehensive property verification solutions including fraud detection, title verification, encumbrance checks, and RERA compliance for Indian real estate.",
    keywords: "property solutions, verification services, fraud detection, title verification, RERA compliance"
  },
  pricing: {
    title: "Pricing",
    description: "Flexible pricing plans for property audits. Choose from individual, professional, and enterprise plans with comprehensive verification features.",
    keywords: "property audit pricing, verification costs, due diligence plans, enterprise pricing"
  },
  blog: {
    title: "Property Risk Assessment Blog",
    description: "Expert guides, analysis, and best practices for property due-diligence, fraud detection, and risk assessment in Indian real estate.",
    keywords: "property blog, real estate guides, fraud prevention, due diligence tips, property risk assessment"
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with AssetzAudit for property verification inquiries, partnership opportunities, or enterprise solutions.",
    keywords: "contact AssetzAudit, property verification inquiry, enterprise solutions"
  },
  dataSources: {
    title: "Data Sources",
    description: "AssetzAudit integrates with 26+ authoritative data sources including revenue departments, court databases, RERA portals, and financial institutions.",
    keywords: "data sources, property databases, revenue records, court databases, RERA integration"
  },
  api: {
    title: "API Documentation",
    description: "Integrate AssetzAudit's property verification API into your applications. RESTful endpoints for fraud detection, title verification, and compliance checks.",
    keywords: "property API, verification API, real estate integration, developer documentation"
  },
  nriSolutions: {
    title: "NRI Property Solutions",
    description: "Specialized property verification services for Non-Resident Indians. FEMA compliance, remote verification, and comprehensive due-diligence from abroad.",
    keywords: "NRI property, FEMA compliance, overseas property investment, NRI verification"
  },
  signIn: {
    title: "Sign In",
    description: "Sign in to your AssetzAudit account to access property audits, verification reports, and comprehensive due-diligence tools.",
    keywords: "login, sign in, property audit access"
  },
  signUp: {
    title: "Create Account",
    description: "Create your AssetzAudit account to start verifying properties with comprehensive fraud detection and due-diligence tools.",
    keywords: "register, create account, property verification signup"
  },
  fraudDetection: {
    title: "Fraud Detection",
    description: "AI-powered property fraud detection with 6-factor analysis including price anomaly detection, document forgery analysis, and benami transaction detection.",
    keywords: "fraud detection, property fraud, AI analysis, benami detection, document forgery"
  },
  titleVerification: {
    title: "Title Verification",
    description: "30-year property title verification with complete ownership chain analysis, mortgage status, tax clearance, and litigation history.",
    keywords: "title verification, ownership chain, property title, mortgage status, clean title"
  },
  ecDashboard: {
    title: "Encumbrance Certificate Dashboard",
    description: "Comprehensive encumbrance certificate analysis with 30-year history, mortgage tracking, and financial liability verification.",
    keywords: "encumbrance certificate, EC verification, mortgage tracking, property liabilities"
  },
  reraDashboard: {
    title: "RERA Compliance Dashboard",
    description: "Verify RERA registration, project completion status, developer track record, and buyer complaint history for real estate projects.",
    keywords: "RERA compliance, project registration, developer verification, buyer complaints"
  },
  litigationSearch: {
    title: "Litigation Search",
    description: "Multi-state court database search for property-related litigation, case status tracking, and legal risk assessment.",
    keywords: "litigation search, court cases, property disputes, legal risk assessment"
  },
  marketIntelligence: {
    title: "Market Intelligence",
    description: "Real-time property market data with price trends, investment scores, fraud rates, and demand-supply analysis for major Indian cities.",
    keywords: "market intelligence, price trends, investment analysis, property market data"
  },
  news: {
    title: "Property & Finance News",
    description: "Stay updated with the latest news on real estate regulations, fraud alerts, market trends, and property investment insights.",
    keywords: "real estate news, property updates, market news, fraud alerts"
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Navigate back to AssetzAudit home or dashboard.",
    keywords: "404, page not found, error"
  }
};
