import { Link } from "wouter";
import { Shield, Home, Search, FileText, Users, Building2, Scale, TrendingUp, CreditCard, Code, Mail, Newspaper, BookOpen, Settings, ExternalLink } from "lucide-react";
import { SEO, seoData } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sitemapSections = [
  {
    title: "Main Pages",
    icon: Home,
    links: [
      { href: "/", label: "Home", description: "360° Property Due-Diligence Platform" },
      { href: "/solutions", label: "Solutions", description: "Comprehensive property verification services" },
      { href: "/pricing", label: "Pricing", description: "Credit-based pricing plans" },
      { href: "/contact", label: "Contact Us", description: "Get in touch with our team" },
    ]
  },
  {
    title: "Property Search & Dashboard",
    icon: Search,
    links: [
      { href: "/dashboard", label: "Property Search", description: "Search properties by name, survey number, or owner" },
      { href: "/features", label: "Features Dashboard", description: "Comprehensive property analysis features" },
      { href: "/property/example", label: "Property Details", description: "Detailed property audit information and risk scores" },
    ]
  },
  {
    title: "Verification Services",
    icon: FileText,
    links: [
      { href: "/verification", label: "Verification Hub", description: "Central hub for all verification services" },
      { href: "/title", label: "Title Verification", description: "Verify property ownership and title chain" },
      { href: "/documents", label: "Document Verification", description: "Authenticate property documents" },
      { href: "/ec", label: "EC Dashboard", description: "Encumbrance Certificate verification" },
      { href: "/rera", label: "RERA Dashboard", description: "RERA compliance and project verification" },
    ]
  },
  {
    title: "Legal & Litigation",
    icon: Scale,
    links: [
      { href: "/litigation", label: "Litigation Search", description: "Search court cases related to properties" },
      { href: "/fraud", label: "Fraud Detection", description: "AI-powered fraud risk assessment" },
    ]
  },
  {
    title: "Market Intelligence",
    icon: TrendingUp,
    links: [
      { href: "/market", label: "Market Intelligence", description: "Real-time market analysis and trends" },
      { href: "/valuation", label: "Property Valuation", description: "Accurate property value estimation" },
      { href: "/news", label: "Industry News", description: "Latest real estate news and updates" },
    ]
  },
  {
    title: "Developer & Builder Services",
    icon: Building2,
    links: [
      { href: "/developer-audit", label: "Developer Audit", description: "Comprehensive builder verification" },
    ]
  },
  {
    title: "NRI Services",
    icon: Users,
    links: [
      { href: "/nri", label: "NRI Dashboard", description: "Property management for NRIs" },
      { href: "/nri-solutions", label: "NRI Solutions", description: "Dedicated services for overseas Indians" },
    ]
  },
  {
    title: "Reports & Archives",
    icon: FileText,
    links: [
      { href: "/reports", label: "Audit Reports", description: "Download and manage audit reports" },
      { href: "/review", label: "Review Queue", description: "Properties pending manual review" },
    ]
  },
  {
    title: "For Developers",
    icon: Code,
    links: [
      { href: "/api", label: "API Documentation", description: "Integrate AssetzAudit into your applications" },
      { href: "/data-sources", label: "Data Sources", description: "Our verified data sources and partners" },
    ]
  },
  {
    title: "Blog & Resources",
    icon: BookOpen,
    links: [
      { href: "/blog", label: "Blog", description: "Expert insights on property due diligence" },
      { href: "/blog/property-fraud-detection", label: "Property Fraud Detection", description: "Identifying and preventing property fraud" },
      { href: "/blog/encumbrance-certificate-guide", label: "Encumbrance Certificate Guide", description: "Complete EC verification guide" },
      { href: "/blog/title-verification-guide", label: "Title Verification Guide", description: "Ensuring clear property titles" },
      { href: "/blog/due-diligence-checklist", label: "Due Diligence Checklist", description: "Step-by-step property verification" },
      { href: "/blog/litigation-risks-real-estate", label: "Litigation Risks in Real Estate", description: "Understanding legal risks" },
      { href: "/blog/nri-property-guide", label: "NRI Property Guide", description: "Property ownership for overseas Indians" },
      { href: "/blog/rera-compliance-guide", label: "RERA Compliance Guide", description: "Navigating RERA regulations" },
      { href: "/blog/market-intelligence-guide", label: "Market Intelligence Guide", description: "Data-driven property decisions" },
    ]
  },
  {
    title: "Account & Authentication",
    icon: Settings,
    links: [
      { href: "/sign-in", label: "Sign In", description: "Access your account" },
      { href: "/sign-up", label: "Create Account", description: "Register for AssetzAudit" },
      { href: "/forgot-password", label: "Forgot Password", description: "Request password reset link" },
      { href: "/reset-password", label: "Reset Password", description: "Set a new password" },
      { href: "/verify-email", label: "Verify Email", description: "Confirm your email address" },
      { href: "/settings", label: "Settings", description: "Manage your account settings" },
    ]
  },
  {
    title: "Administration",
    icon: Users,
    links: [
      { href: "/admin", label: "Admin Dashboard", description: "Platform administration and analytics" },
      { href: "/admin/users", label: "User Management", description: "Manage platform users" },
      { href: "/auditor", label: "Auditor Dashboard", description: "Auditor workflow and assignments" },
    ]
  },
];

export default function HTMLSitemap() {
  return (
    <div className="min-h-screen bg-background" data-testid="html-sitemap-page">
      <SEO 
        title="HTML Sitemap | AssetzAudit - All Pages Directory"
        description="Complete directory of all pages on AssetzAudit - India's leading property due-diligence platform. Find property verification, legal checks, market intelligence, and more."
        keywords="sitemap, AssetzAudit pages, property verification sitemap, due diligence directory"
      />
      
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" data-testid="link-home">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-dashboard">Property Search</span>
            </Link>
            <Link href="/sign-in">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-signin">Sign In</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">HTML Sitemap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete directory of all pages on AssetzAudit. Find everything you need for comprehensive property due-diligence in India.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {sitemapSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.title} className="border-muted" data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <div className="group flex items-start gap-2 cursor-pointer" data-testid={`sitemap-link-${link.href.replace(/\//g, '-').slice(1) || 'home'}`}>
                              <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                              <div>
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {link.label}
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="border-muted bg-muted/30">
              <CardContent className="py-8">
                <h2 className="text-xl font-semibold mb-3">Looking for XML Sitemap?</h2>
                <p className="text-muted-foreground mb-4">
                  For search engine crawlers, our XML sitemap is available at:
                </p>
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-xml-sitemap"
                >
                  <Code className="h-4 w-4" />
                  /sitemap.xml
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AssetzAudit. All rights reserved. | 
            <Link href="/contact">
              <span className="ml-1 hover:text-foreground cursor-pointer">Contact Us</span>
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
