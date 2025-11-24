import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  DollarSign,
  AlertCircle,
  Target,
  Search,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MarketData {
  id: string;
  city: string;
  state: string;
  locality: string;
  monthYear: string;
  avgPropertyPrice: number;
  pricePerSqft: number;
  transactionVolume: number;
  frauldRatePercentage: number;
  developerDefaultRate: number;
  projectStallRate: number;
  avgProjectDelayMonths: number;
  demandSupplyRatio: number;
  rentYield: number;
  investmentScore: number;
  regulatoryChanges: string[];
}

const MARKET_DATA: MarketData[] = [
  {
    id: "1",
    city: "Bangalore",
    state: "Karnataka",
    locality: "Whitefield",
    monthYear: "2025-01",
    avgPropertyPrice: 8500000,
    pricePerSqft: 8500,
    transactionVolume: 245,
    frauldRatePercentage: 2.3,
    developerDefaultRate: 1.2,
    projectStallRate: 0.8,
    avgProjectDelayMonths: 3,
    demandSupplyRatio: 1.4,
    rentYield: 3.2,
    investmentScore: 78,
    regulatoryChanges: ["New RERA compliance norms", "GST rate changes"],
  },
  {
    id: "2",
    city: "Bangalore",
    state: "Karnataka",
    locality: "Indiranagar",
    monthYear: "2025-01",
    avgPropertyPrice: 9200000,
    pricePerSqft: 9100,
    transactionVolume: 312,
    frauldRatePercentage: 1.8,
    developerDefaultRate: 0.9,
    projectStallRate: 0.5,
    avgProjectDelayMonths: 2,
    demandSupplyRatio: 1.6,
    rentYield: 3.5,
    investmentScore: 82,
    regulatoryChanges: ["New metro corridor planned"],
  },
  {
    id: "3",
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Bandra",
    monthYear: "2025-01",
    avgPropertyPrice: 18500000,
    pricePerSqft: 12500,
    transactionVolume: 178,
    frauldRatePercentage: 2.1,
    developerDefaultRate: 1.5,
    projectStallRate: 1.2,
    avgProjectDelayMonths: 4,
    demandSupplyRatio: 1.2,
    rentYield: 2.8,
    investmentScore: 72,
    regulatoryChanges: ["Coastal Road completion"],
  },
  {
    id: "4",
    city: "Delhi",
    state: "Delhi",
    locality: "Gurgaon",
    monthYear: "2025-01",
    avgPropertyPrice: 7500000,
    pricePerSqft: 8000,
    transactionVolume: 289,
    frauldRatePercentage: 3.1,
    developerDefaultRate: 2.1,
    projectStallRate: 1.8,
    avgProjectDelayMonths: 6,
    demandSupplyRatio: 0.9,
    rentYield: 2.5,
    investmentScore: 65,
    regulatoryChanges: ["Regional Plan 2041", "Metro expansion"],
  },
  {
    id: "5",
    city: "Hyderabad",
    state: "Telangana",
    locality: "HITEC City",
    monthYear: "2025-01",
    avgPropertyPrice: 5500000,
    pricePerSqft: 6500,
    transactionVolume: 356,
    frauldRatePercentage: 1.5,
    developerDefaultRate: 0.8,
    projectStallRate: 0.4,
    avgProjectDelayMonths: 1,
    demandSupplyRatio: 1.8,
    rentYield: 4.1,
    investmentScore: 85,
    regulatoryChanges: ["Tech hub expansion", "New airport connectivity"],
  },
  {
    id: "6",
    city: "Pune",
    state: "Maharashtra",
    locality: "Viman Nagar",
    monthYear: "2025-01",
    avgPropertyPrice: 6200000,
    pricePerSqft: 7200,
    transactionVolume: 267,
    frauldRatePercentage: 1.6,
    developerDefaultRate: 1.0,
    projectStallRate: 0.6,
    avgProjectDelayMonths: 2,
    demandSupplyRatio: 1.5,
    rentYield: 3.8,
    investmentScore: 79,
    regulatoryChanges: ["New IT policy", "Infrastructure development"],
  },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function MarketIntelligence() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filteredData = MARKET_DATA.filter((item) =>
    selectedCity ? item.city === selectedCity : true
  ).filter(
    (item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cities = Array.from(new Set(MARKET_DATA.map((d) => d.city)));

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Market intelligence report is being generated...",
    });
  };

  // Calculate city averages for comparison
  const cityAverages = cities.map((city) => {
    const cityData = MARKET_DATA.filter((d) => d.city === city);
    const avgPrice = Math.round(
      cityData.reduce((sum, d) => sum + d.avgPropertyPrice, 0) / cityData.length
    );
    const avgInvestmentScore = Math.round(
      cityData.reduce((sum, d) => sum + d.investmentScore, 0) / cityData.length
    );
    const avgFraudRate =
      Math.round(
        (cityData.reduce((sum, d) => sum + d.frauldRatePercentage, 0) /
          cityData.length) *
          10
      ) / 10;
    return {
      name: city,
      price: avgPrice / 1000000,
      investmentScore: avgInvestmentScore,
      fraudRate: avgFraudRate,
    };
  });

  // Demand vs Supply Analysis
  const demandSupplyData = filteredData.map((d) => ({
    name: `${d.locality}`,
    demand: d.demandSupplyRatio > 1 ? 100 : (d.demandSupplyRatio * 100),
    supply: 100,
    rentYield: d.rentYield,
  }));

  // Risk Analysis
  const riskData = filteredData.map((d) => ({
    name: d.locality,
    fraud: d.frauldRatePercentage,
    default: d.developerDefaultRate,
    stall: d.projectStallRate,
  }));

  // Investment Opportunities
  const investmentOpportunities = filteredData.sort(
    (a, b) => b.investmentScore - a.investmentScore
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Market Intelligence Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time market analysis, trends, and investment insights across major Indian cities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport} data-testid="button-export">
              <Download className="h-4 w-4" /> Export Report
            </Button>
            <Button className="gap-2" data-testid="button-filter">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Search & City Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by city or locality..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-market"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCity === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity(null)}
                  data-testid="button-all-cities"
                >
                  All Cities
                </Button>
                {cities.map((city) => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCity(city)}
                    data-testid={`button-city-${city.toLowerCase()}`}
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.length > 0 && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Property Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-avg-price">
                    ₹{Math.round(
                      filteredData.reduce((sum, d) => sum + d.avgPropertyPrice, 0) /
                        filteredData.length /
                        10000000
                    ) / 10}Cr
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {filteredData.length} localities analyzed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Investment Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-avg-investment">
                    {Math.round(
                      filteredData.reduce((sum, d) => sum + d.investmentScore, 0) /
                        filteredData.length
                    )}/100
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round(
                          (filteredData.reduce((sum, d) => sum + d.investmentScore, 0) /
                            filteredData.length) *
                            100 /
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Fraud Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-avg-fraud">
                    {Math.round(
                      (filteredData.reduce((sum, d) => sum + d.frauldRatePercentage, 0) /
                        filteredData.length) *
                        10
                    ) / 10}
                    %
                  </div>
                  <p className="text-xs text-amber-600 mt-1">Monitor closely</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rent Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-avg-yield">
                    {Math.round(
                      (filteredData.reduce((sum, d) => sum + d.rentYield, 0) /
                        filteredData.length) *
                        10
                    ) / 10}
                    %
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">Annual returns</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Charts */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="comparison">City Comparison</TabsTrigger>
            <TabsTrigger value="demand">Demand & Yield</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="investment">Investment Scores</TabsTrigger>
          </TabsList>

          {/* City Comparison */}
          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Property Price by City</CardTitle>
                <CardDescription>
                  Comparative analysis of average property prices across major cities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={cityAverages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Price (Cr)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `₹${value}Cr`} />
                    <Legend />
                    <Bar dataKey="price" fill="#3b82f6" name="Avg Price (Cr)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Investment Score vs Fraud Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="fraudRate"
                      name="Fraud Rate %"
                      label={{ value: "Fraud Rate (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="investmentScore"
                      name="Investment Score"
                      label={{ value: "Investment Score", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Cities" data={cityAverages} fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demand & Yield */}
          <TabsContent value="demand" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rent Yield by Locality</CardTitle>
                <CardDescription>Annual rental yield percentage for analyzed localities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={demandSupplyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Yield (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rentYield"
                      stroke="#10b981"
                      name="Rent Yield %"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Analysis */}
          <TabsContent value="risk" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors by Locality</CardTitle>
                <CardDescription>Fraud rate, developer default, and project stall percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Risk %", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="fraud" fill="#ef4444" name="Fraud Rate %" />
                    <Bar dataKey="default" fill="#f59e0b" name="Developer Default %" />
                    <Bar dataKey="stall" fill="#f97316" name="Project Stall %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Scores */}
          <TabsContent value="investment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={filteredData.map((d) => ({ name: d.locality, value: d.investmentScore }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Investment Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Top Investment Opportunities
            </CardTitle>
            <CardDescription>
              Ranked by investment score, considering price, yield, and risk factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {investmentOpportunities.slice(0, 6).map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-muted hover:bg-muted/50 transition-colors"
                  data-testid={`opportunity-${index}`}
                >
                  <div>
                    <p className="font-semibold" data-testid={`text-locality-${index}`}>
                      {item.locality}, {item.city}
                    </p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        <strong>Price:</strong> ₹{(item.avgPropertyPrice / 1000000).toFixed(1)}Cr
                      </span>
                      <span className="text-xs text-muted-foreground">
                        <strong>Yield:</strong> {item.rentYield}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        <strong>Demand:</strong> {item.demandSupplyRatio.toFixed(1)}x
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={
                      item.investmentScore >= 80
                        ? "bg-emerald-100 text-emerald-700"
                        : item.investmentScore >= 70
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }
                    data-testid={`badge-score-${index}`}
                  >
                    {item.investmentScore}/100
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Changes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Regulatory Changes & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(
                new Map(
                  filteredData
                    .flatMap((d) =>
                      d.regulatoryChanges.map((change) => ({
                        city: d.city,
                        change,
                      }))
                    )
                    .map((item) => [item.change, item])
                )
              )
                .map(([_, item]) => item)
                .map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-blue-200 bg-blue-50"
                    data-testid={`regulatory-${index}`}
                  >
                    <p className="text-sm font-medium text-blue-900">{item.change}</p>
                    <p className="text-xs text-blue-700 mt-1">{item.city}, {MARKET_DATA.find(d => d.city === item.city)?.state}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
