import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Calendar, User } from "lucide-react";
import { SEO, seoData } from "@/components/seo";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const articles: BlogArticle[] = [
  {
    id: "1",
    title: "Complete Guide to Property Fraud Detection",
    excerpt: "Learn how to identify common property fraud schemes and protect yourself from becoming a victim. Discover the 6 major fraud detection methods used by AssetzAudit.",
    category: "Fraud Prevention",
    author: "AssetzAudit Team",
    date: "Dec 20, 2025",
    readTime: "8 min read",
    slug: "property-fraud-detection"
  },
  {
    id: "2",
    title: "Understanding Encumbrance Certificates: A Buyer's Guide",
    excerpt: "Encumbrance Certificates are crucial for understanding property liabilities. This guide explains EC status, how to read them, and what they reveal about financial risks.",
    category: "Property Verification",
    author: "Legal Expert",
    date: "Dec 18, 2025",
    readTime: "6 min read",
    slug: "encumbrance-certificate-guide"
  },
  {
    id: "3",
    title: "30-Year Title Verification: Why It Matters",
    excerpt: "Clean title ownership is critical. Learn how 30-year title verification protects you from ownership disputes, hidden mortgages, and legacy litigation risks.",
    category: "Title Verification",
    author: "AssetzAudit Team",
    date: "Dec 15, 2025",
    readTime: "7 min read",
    slug: "title-verification-guide"
  },
  {
    id: "4",
    title: "Property Due Diligence Checklist for Smart Buyers",
    excerpt: "Complete property due diligence checklist covering legal checks, financial verification, compliance checks, and risk assessment before making your property investment.",
    category: "Due Diligence",
    author: "Real Estate Consultant",
    date: "Dec 12, 2025",
    readTime: "10 min read",
    slug: "due-diligence-checklist"
  },
  {
    id: "5",
    title: "Litigation Risks in Real Estate: How to Stay Safe",
    excerpt: "Property litigation can derail your investment plans. Understand common court cases, how to search for litigation risks, and protect your interests.",
    category: "Legal Risks",
    author: "Legal Expert",
    date: "Dec 10, 2025",
    readTime: "9 min read",
    slug: "litigation-risks-real-estate"
  },
  {
    id: "6",
    title: "NRI Property Buying in India: Complete Compliance Guide",
    excerpt: "Non-Resident Indians face unique compliance requirements. Learn about FEMA regulations, documentation, and how AssetzAudit simplifies NRI property verification.",
    category: "NRI Compliance",
    author: "Compliance Officer",
    date: "Dec 8, 2025",
    readTime: "11 min read",
    slug: "nri-property-guide"
  },
  {
    id: "7",
    title: "RERA Compliance: Protecting Buyers from Developer Defaults",
    excerpt: "RERA regulations protect property buyers. Learn how to verify RERA compliance, track project status, and identify stalled projects before investing.",
    category: "Regulatory",
    author: "RERA Expert",
    date: "Dec 5, 2025",
    readTime: "8 min read",
    slug: "rera-compliance-guide"
  },
  {
    id: "8",
    title: "Market Intelligence for Smart Property Investment",
    excerpt: "Data-driven property investment requires market insights. Understand price trends, investment scores, and how to analyze locality data for better decisions.",
    category: "Market Analysis",
    author: "Market Analyst",
    date: "Dec 1, 2025",
    readTime: "9 min read",
    slug: "market-intelligence-guide"
  }
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Fraud Prevention": "bg-red-100 text-red-800",
    "Property Verification": "bg-blue-100 text-blue-800",
    "Title Verification": "bg-purple-100 text-purple-800",
    "Due Diligence": "bg-green-100 text-green-800",
    "Legal Risks": "bg-orange-100 text-orange-800",
    "NRI Compliance": "bg-cyan-100 text-cyan-800",
    "Regulatory": "bg-indigo-100 text-indigo-800",
    "Market Analysis": "bg-emerald-100 text-emerald-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export default function Blog() {
  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO {...seoData.blog} />
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Back Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Property Risk Assessment Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert guides, analysis, and best practices for property due-diligence, fraud detection, and risk assessment in Indian real estate.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* Featured Article */}
        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Badge className={`${getCategoryColor(articles[0].category)} border-0`}>
                    {articles[0].category}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {articles[0].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center gap-6 flex-wrap mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {articles[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {articles[0].date}
                  </div>
                  <span>{articles[0].readTime}</span>
                </div>
                <Link href={`/blog/${articles[0].slug}`}>
                  <Button className="gap-2">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">All Articles</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {articles.slice(1).map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full flex flex-col" data-testid={`card-blog-${article.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <Badge className={`${getCategoryColor(article.category)} border-0`}>
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {article.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        <Button variant="ghost" size="sm" className="gap-2">
                          Read <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 border-t bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Audit Your Property?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Use AssetzAudit's comprehensive platform to get verified risk scores and detailed audit reports.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/sign-in">
                  <Button size="lg">Start Your Audit</Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AssetzAudit Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
