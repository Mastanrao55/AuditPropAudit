import type { NewsArticle } from "@shared/schema";

const NEWS_SOURCES = [
  { name: "Real Estate", keywords: "real estate property market housing" },
  { name: "Legal", keywords: "legal law court regulation" },
  { name: "Finance", keywords: "finance financial investment banking" },
  { name: "Banking", keywords: "banking bank loans credit" },
  { name: "Fraud", keywords: "fraud forgery document crime" },
];

export async function fetchNewsFromAPI(query: string): Promise<NewsArticle[]> {
  try {
    const articles: NewsArticle[] = [];
    
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
      ],
    };

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

