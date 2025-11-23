import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, type NewsArticle } from "@shared/schema";

const NEWS_SOURCES = [
  { name: "Real Estate", keywords: "real estate property market housing" },
  { name: "Legal", keywords: "legal law court regulation" },
  { name: "Finance", keywords: "finance financial investment banking" },
  { name: "Banking", keywords: "banking bank loans credit" },
  { name: "Fraud", keywords: "fraud forgery document crime" },
];

async function fetchNewsFromAPI(query: string): Promise<NewsArticle[]> {
  try {
    // Using a free news aggregation approach with mock data
    // In production, integrate with NewsAPI.org or similar service
    const articles: NewsArticle[] = [];
    
    // Mock news data for demonstration
    const mockNews: Record<string, NewsArticle[]> = {
      "real estate": [
        {
          id: "1",
          title: "Property Market Shows Strong Recovery in Q4 2025",
          description: "Real estate sector demonstrates resilience with 12% growth in transaction volumes.",
          source: "Real Estate Daily",
          url: "https://example.com/realestate1",
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Real Estate",
        },
        {
          id: "2",
          title: "New Regulations Reshape Property Investment Landscape",
          description: "Government announces stricter transparency requirements for real estate transactions.",
          source: "Property News Network",
          url: "https://example.com/realestate2",
          publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Real Estate",
        },
      ],
      "legal": [
        {
          id: "3",
          title: "Supreme Court Ruling Impacts Property Disputes",
          description: "Landmark decision clarifies ownership transfer procedures in contested cases.",
          source: "Legal Times",
          url: "https://example.com/legal1",
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Legal",
        },
        {
          id: "4",
          title: "New Property Registration Act Comes Into Force",
          description: "Enhanced due diligence requirements now mandatory for all property transfers.",
          source: "Judicial Review",
          url: "https://example.com/legal2",
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Legal",
        },
      ],
      "finance": [
        {
          id: "5",
          title: "Interest Rates Impact Property Financing Options",
          description: "Central bank decision affects mortgage rates and real estate investment returns.",
          source: "Financial Markets",
          url: "https://example.com/finance1",
          publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Finance",
        },
      ],
      "banking": [
        {
          id: "6",
          title: "Banks Tighten Mortgage Approval Standards",
          description: "New compliance requirements lead to stricter property valuation procedures.",
          source: "Banking Digest",
          url: "https://example.com/banking1",
          publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Banking",
        },
      ],
      "fraud": [
        {
          id: "7",
          title: "Document Forgery Ring Dismantled in Major Investigation",
          description: "Law enforcement uncovers fraudulent property title scheme affecting hundreds.",
          source: "Crime Watch",
          url: "https://example.com/fraud1",
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Fraud",
        },
        {
          id: "8",
          title: "New Technology Combats Property Document Fraud",
          description: "Blockchain-based verification system helps identify forged land records.",
          source: "Tech & Crime",
          url: "https://example.com/fraud2",
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          category: "Fraud",
        },
      ],
    };

    // Return all mock news or filtered by query
    const lowerQuery = query.toLowerCase();
    for (const [key, newsList] of Object.entries(mockNews)) {
      if (!query || lowerQuery.includes(key)) {
        articles.push(...newsList);
      }
    }

    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error) {
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string || "";
      const articles = await fetchNewsFromAPI(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
