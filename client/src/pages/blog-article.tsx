import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, User, ArrowLeft, Share2 } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}

const articles: Record<string, Article> = {
  "property-fraud-detection": {
    slug: "property-fraud-detection",
    title: "Complete Guide to Property Fraud Detection",
    author: "AssetzAudit Team",
    date: "Dec 20, 2025",
    readTime: "8 min read",
    category: "Fraud Prevention",
    content: (
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg font-semibold text-foreground">
          Property fraud is one of the biggest risks facing real estate buyers in India. With increasing sophistication in fraudulent schemes, it's critical to understand the red flags and detection methods.
        </p>
        
        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">The Scale of Property Fraud in India</h3>
        <p>According to recent industry reports, property fraud cases have increased by 35% in the last three years. From duplicate sales to forged documents, buyers face multiple risks that can result in total financial loss.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">6 Major Property Fraud Detection Methods</h3>
        
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">1. Price Anomaly Detection</h4>
            <p>Properties priced significantly below market value are red flags. Our AI analyzes locality data, property type, size, and age to identify suspicious pricing patterns.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">2. Document Forgery Analysis</h4>
            <p>AI-powered OCR and signature matching systems can detect forged or altered documents. Inconsistencies in stamps, seals, and signatures are identified automatically.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">3. Seller Behavior Monitoring</h4>
            <p>Suspicious seller patterns include multiple sales in short timeframes, sales through dummy companies, or rapid ownership transfers - all indicators of potential fraud.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">4. Title Fraud Detection</h4>
            <p>Broken title chains indicate missing ownership records or illegal transfers. Multi-state title verification reveals conflicting claims and disputed ownership.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">5. Double Sale Risk Detection</h4>
            <p>Some properties are sold to multiple buyers simultaneously. Cross-checking registration records across states reveals properties sold more than once.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">6. Benami Transaction Detection</h4>
            <p>Properties held in proxy names or through shell companies pose ownership risks. Beneficial ownership analysis identifies genuine vs. proxy ownership patterns.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Red Flags You Should Never Ignore</h3>
        <ul className="space-y-2 ml-4">
          <li>• Price is 20%+ below market value</li>
          <li>• Property sold multiple times in last 2 years</li>
          <li>• Missing or unclear ownership documents</li>
          <li>• Outstanding litigation on the property</li>
          <li>• Seller refuses for property inspection</li>
          <li>• Inconsistencies in ownership narrative</li>
          <li>• Pressure to complete transaction quickly</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How AssetzAudit Protects You</h3>
        <p>AssetzAudit combines AI-powered fraud detection with comprehensive database searches across 26+ data sources including:</p>
        <ul className="space-y-2 ml-4">
          <li>• Registration records from revenue departments</li>
          <li>• Court case databases (district & high courts)</li>
          <li>• RBI CIBIL fraud records</li>
          <li>• Cheque bounce and loan default databases</li>
          <li>• RERA compliance records</li>
          <li>• Sub-registrar data across states</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Taking Action: Your Fraud Prevention Checklist</h3>
        <ol className="space-y-2 ml-4 list-decimal">
          <li>Get a comprehensive fraud risk analysis before making an offer</li>
          <li>Verify title ownership through 30-year ownership chain check</li>
          <li>Review encumbrance certificate for hidden liabilities</li>
          <li>Search for litigation against property and owner</li>
          <li>Verify RERA compliance if under-construction</li>
          <li>Get independent document verification</li>
          <li>Have a legal expert review all documents</li>
        </ol>

        <p className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 mt-8">
          <strong>Pro Tip:</strong> Property fraud detection should be your first step, before any legal or financial commitments. Early detection saves time, money, and legal hassles.
        </p>
      </div>
    )
  },
  "encumbrance-certificate-guide": {
    slug: "encumbrance-certificate-guide",
    title: "Understanding Encumbrance Certificates: A Buyer's Guide",
    author: "Legal Expert",
    date: "Dec 18, 2025",
    readTime: "6 min read",
    category: "Property Verification",
    content: (
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg font-semibold text-foreground">
          An Encumbrance Certificate (EC) is one of the most important documents in property transactions. It reveals all financial liabilities and legal claims on a property.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">What is an Encumbrance Certificate?</h3>
        <p>An Encumbrance Certificate is an official document issued by the revenue department showing all financial charges, loans, and legal claims against a property. It's proof that the property is free from liabilities or details what liabilities exist.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Key Information in an EC</h3>
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Property Details</h4>
            <p>Survey number, plot size, location, and complete property identification</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ownership Information</h4>
            <p>Current owner names and details from official records</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Mortgages & Loans</h4>
            <p>All active loans and mortgages against the property and lending banks</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Legal Claims</h4>
            <p>Court orders, attachments, or legal restrictions on the property</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Validity Period</h4>
            <p>ECs are typically valid for 3 months from issuance date</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Understanding EC Status</h3>
        <ul className="space-y-3 ml-4">
          <li><strong>Clear Status:</strong> No liabilities - property is completely free</li>
          <li><strong>Mortgaged:</strong> Property has active loan(s) that must be cleared by seller</li>
          <li><strong>Attached:</strong> Court order prevents sale without court approval</li>
          <li><strong>Suspended:</strong> Transaction restrictions due to legal proceedings</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Why EC Verification Matters</h3>
        <p>Many buyers skip EC checks thinking they're redundant with other documents. This is a critical mistake because:</p>
        <ul className="space-y-2 ml-4">
          <li>• Bank loans may not be reflected in property documents</li>
          <li>• Court orders and attachments may not be in your knowledge</li>
          <li>• Multiple mortgages on same property are common</li>
          <li>• Illegal encumbrances may not be disclosed by seller</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How to Get an Encumbrance Certificate</h3>
        <ol className="space-y-2 ml-4 list-decimal">
          <li>Visit your local revenue office (Tehsil/Taluk)</li>
          <li>Submit application with property survey number</li>
          <li>Pay the prescribed fee (varies by state, typically ₹100-500)</li>
          <li>Processing time: 3-7 days typically</li>
          <li>Collect the original certificate</li>
        </ol>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Red Flags in EC to Watch For</h3>
        <ul className="space-y-2 ml-4">
          <li>• Active loans not mentioned in seller's disclosure</li>
          <li>• Court attachments or legal restrictions</li>
          <li>• Multiple mortgages from different banks</li>
          <li>• Recent ownership transfers (requires verification)</li>
          <li>• Missing historical records (EC should show 30-year history)</li>
        </ul>

        <p className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 mt-8">
          <strong>Pro Tip:</strong> Always get a fresh EC within 3 months of purchase completion. Older ECs may miss recent encumbrances or changes in ownership status.
        </p>
      </div>
    )
  },
  "title-verification-guide": {
    slug: "title-verification-guide",
    title: "30-Year Title Verification: Why It Matters",
    author: "AssetzAudit Team",
    date: "Dec 15, 2025",
    readTime: "7 min read",
    category: "Title Verification",
    content: (
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg font-semibold text-foreground">
          A clean title is your protection against ownership disputes, hidden claims, and litigation. 30-year title verification is the gold standard in property due-diligence.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">What is Title Verification?</h3>
        <p>Title verification is the process of confirming that the seller has the legal right to sell the property and that no one else has a claim on it. A 30-year verification goes back three decades to check the complete ownership chain.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Why 30 Years?</h3>
        <p>Indian law recognizes 12 years of continuous, undisturbed possession as a valid title. However, a 30-year ownership chain provides:</p>
        <ul className="space-y-2 ml-4">
          <li>• Protection against stale claims and disputes</li>
          <li>• Evidence of proper succession and inheritance</li>
          <li>• Documentation of all legal transfers</li>
          <li>• Clarity on any break in ownership</li>
          <li>• Insurance against future title challenges</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Key Elements of Title Verification</h3>
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ownership Chain</h4>
            <p>Complete record of all property owners from 30 years back with legal documents proving each transfer</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Mortgage Status</h4>
            <p>Whether property is currently mortgaged, previously mortgaged, or clear</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Tax Clearance</h4>
            <p>Proof of property tax payment and no outstanding tax liabilities</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Litigation History</h4>
            <p>Any court cases involving the property or previous owners</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Risk Score</h4>
            <p>Overall title risk rating based on all verification factors</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Common Title Defects to Watch For</h3>
        <ul className="space-y-2 ml-4">
          <li>• Missing links in ownership chain</li>
          <li>• Forged or altered transfer documents</li>
          <li>• Unauthorized sales by non-owners</li>
          <li>• Inheritance disputes in family property</li>
          <li>• Overlapping ownership claims</li>
          <li>• False possession claims by third parties</li>
          <li>• Unresolved court cases affecting ownership</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How Title Verification Works at AssetzAudit</h3>
        <ol className="space-y-2 ml-4 list-decimal">
          <li>Extract property details from submitted documents</li>
          <li>Access revenue department records across states</li>
          <li>Verify ownership chain going back 30 years</li>
          <li>Cross-check with court databases for disputes</li>
          <li>Verify mortgage status with banks and lending institutions</li>
          <li>Check tax payment history</li>
          <li>Generate comprehensive risk score and report</li>
        </ol>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Title Verification Checklist for Buyers</h3>
        <ul className="space-y-2 ml-4">
          <li>✓ Verify ownership chain is unbroken for 30 years</li>
          <li>✓ Confirm all previous sales were registered properly</li>
          <li>✓ Check for any inheritance disputes or succession issues</li>
          <li>✓ Verify mortgage clearance from all previous lenders</li>
          <li>✓ Confirm property tax is current</li>
          <li>✓ Check for any pending court cases</li>
          <li>✓ Verify no restrictions on property usage</li>
        </ul>

        <p className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 mt-8">
          <strong>Pro Tip:</strong> Never skip title verification to save time. Title disputes can take years to resolve and cost significantly more than the verification expense.
        </p>
      </div>
    )
  },
  "due-diligence-checklist": {
    slug: "due-diligence-checklist",
    title: "Property Due Diligence Checklist for Smart Buyers",
    author: "Real Estate Consultant",
    date: "Dec 12, 2025",
    readTime: "10 min read",
    category: "Due Diligence",
    content: (
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg font-semibold text-foreground">
          Comprehensive property due-diligence is the foundation of safe real estate investing. This checklist covers all critical areas you must verify before committing to a purchase.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Phase 1: Pre-Purchase Due Diligence (Weeks 1-2)</h3>
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Property Identification</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Get survey number and plot identification</li>
              <li>• Verify property address matches all documents</li>
              <li>• Check property type classification</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Ownership Verification</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Obtain 30-year title verification</li>
              <li>• Check ownership chain for breaks</li>
              <li>• Verify seller's authority to sell</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Financial & Encumbrance Check</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Get latest Encumbrance Certificate</li>
              <li>• Verify no active mortgages</li>
              <li>• Check for tax arrears</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Phase 2: Legal & Compliance Check (Weeks 2-3)</h3>
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Litigation Search</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Search court databases for cases involving property</li>
              <li>• Check for cases against previous owners</li>
              <li>• Verify no pending disputes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ RERA Compliance (if applicable)</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Verify RERA registration for project</li>
              <li>• Check project completion status</li>
              <li>• Review builder track record</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Municipal Approval</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Get Municipal Property Card</li>
              <li>• Verify construction license</li>
              <li>• Check no demolition notices</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Phase 3: Fraud & Risk Assessment (Week 3)</h3>
        <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Market Price Verification</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Compare with market rates in area</li>
              <li>• Check similar property sales in past 6 months</li>
              <li>• Identify price anomalies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Document Verification</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Verify document authenticity</li>
              <li>• Check for forgeries or alterations</li>
              <li>• Compare signatures and seals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">□ Seller Background Check</h4>
            <ul className="ml-4 space-y-1 text-sm">
              <li>• Verify seller's identity documents</li>
              <li>• Check seller's ownership period</li>
              <li>• Look for suspicious sale patterns</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Phase 4: Financial Due Diligence (Week 4)</h3>
        <ul className="space-y-2 ml-4">
          <li>□ Arrange pre-approved home loan</li>
          <li>□ Get property valuation from bank</li>
          <li>□ Verify insurance options</li>
          <li>□ Budget for registration and transfer costs</li>
          <li>□ Plan payment schedule with seller</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Red Flags That Should Stop You</h3>
        <ul className="space-y-2 ml-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <li className="text-red-900">• Seller refuses standard verification documents</li>
          <li className="text-red-900">• Property has active court cases</li>
          <li className="text-red-900">• Title chain has unexplained gaps</li>
          <li className="text-red-900">• Multiple mortgages that need clearance</li>
          <li className="text-red-900">• Price is significantly below market value</li>
          <li className="text-red-900">• Seller pressures quick transaction</li>
          <li className="text-red-900">• Document inconsistencies or forgeries detected</li>
        </ul>

        <p className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 mt-8">
          <strong>Pro Tip:</strong> Take your time with due-diligence. A property that fails verification is a blessing - you've avoided a major financial disaster. There will always be other properties.
        </p>
      </div>
    )
  }
};

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  
  if (!params?.slug) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1>Article not found</h1>
      </div>
    );
  }

  const article = articles[params.slug as string];

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
            </div>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold">
                  {article.category}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </div>
                <span>{article.readTime}</span>
                <Button variant="ghost" size="sm" className="ml-auto gap-2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-12">
              {article.content}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Property Audited Today</h3>
              <p className="text-muted-foreground mb-6">
                Use the comprehensive insights from this article with AssetzAudit's full platform to make confident property decisions.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/sign-in">
                  <Button>Start Audit Now</Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline">Read More Articles</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AssetzAudit Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
