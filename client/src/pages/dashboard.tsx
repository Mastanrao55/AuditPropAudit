import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, AlertTriangle, CheckCircle2, Clock, Plus, Archive, Home, DollarSign, MapPin, Trash2 } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { MOCK_PROPERTIES, stats, formatCurrency } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userCredits, setUserCredits] = useState({ total: 100, used: 0 });
  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [archivedProperties, setArchivedProperties] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("search");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    city: "",
    state: "",
    propertyType: "RESIDENTIAL",
    transactionType: "BUY",
    estimatedValue: "",
    area: "",
    description: "",
  });
  const { toast } = useToast();
  const userId = "user-1"; // Mock user ID

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
    
    // Load user data
    loadUserData();
  }, [location]);

  const loadUserData = async () => {
    try {
      const creditsRes = await fetch(`/api/user-credits/${userId}`);
      if (creditsRes.ok) {
        const credits = await creditsRes.json();
        setUserCredits({ total: credits.totalCredits, used: credits.usedCredits });
      }

      const propsRes = await fetch(`/api/user-properties/${userId}?status=active`);
      if (propsRes.ok) {
        const props = await propsRes.json();
        setUserProperties(props);
      }

      const archiveRes = await fetch(`/api/property-archive/${userId}`);
      if (archiveRes.ok) {
        const archives = await archiveRes.json();
        setArchivedProperties(archives);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const handleAddProperty = async () => {
    try {
      if (!formData.propertyName || !formData.address || !formData.city || !formData.state) {
        toast({ title: "Error", description: "Please fill all required fields" });
        return;
      }

      const response = await fetch("/api/user-properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId,
          status: "active",
        }),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Property added successfully!" });
        setFormData({
          propertyName: "",
          address: "",
          city: "",
          state: "",
          propertyType: "RESIDENTIAL",
          transactionType: "BUY",
          estimatedValue: "",
          area: "",
          description: "",
        });
        setShowAddForm(false);
        await loadUserData();
      } else {
        const error = await response.json();
        toast({ title: "Error", description: error.error || "Failed to add property" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add property" });
    }
  };

  const filteredProperties = MOCK_PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your audit report is being generated. It will be downloaded shortly.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Advanced filtering options would open here.",
    });
  };

  const handleSearch = () => {
    toast({
      title: "Search Updated",
      description: `Found ${filteredProperties.length} properties matching "${searchQuery}"`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your properties and credits</p>
          </div>
        </div>

        {/* Credits Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold">{userCredits.total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Used Credits</p>
                <p className="text-2xl font-bold text-orange-600">{userCredits.used}</p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${(userCredits.used / userCredits.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {userCredits.total - userCredits.used} credits remaining
            </p>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Properties</TabsTrigger>
            <TabsTrigger value="myproperties">My Properties</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          {/* Search Properties Tab */}
          <TabsContent value="search" className="space-y-4">
            <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-muted shadow-sm">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search properties by name, survey number, or owner..." 
                className="border-0 shadow-none focus-visible:ring-0 text-lg bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                data-testid="input-search-property"
              />
              <Button size="lg" onClick={handleSearch} data-testid="button-search">Search</Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Search Results</h2>
                <span className="text-sm text-muted-foreground">{filteredProperties.length} results</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No properties found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Properties Tab */}
          <TabsContent value="myproperties" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Properties</h2>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2" data-testid="button-add-property">
                <Plus className="h-4 w-4" /> Add Property
              </Button>
            </div>

            {showAddForm && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Add Buy/Sell Property</CardTitle>
                  <CardDescription>List a new property for buy or sell</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Property Name"
                      value={formData.propertyName}
                      onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                      data-testid="input-property-name"
                    />
                    <select 
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                      className="border rounded px-3 py-2"
                      data-testid="select-property-type"
                    >
                      <option value="RESIDENTIAL">Residential</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="LAND">Land</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      data-testid="input-address"
                    />
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      data-testid="input-city"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      data-testid="input-state"
                    />
                    <select 
                      value={formData.transactionType}
                      onChange={(e) => setFormData({...formData, transactionType: e.target.value})}
                      className="border rounded px-3 py-2"
                      data-testid="select-transaction-type"
                    >
                      <option value="BUY">Buy</option>
                      <option value="SELL">Sell</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Estimated Value (₹)"
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                      data-testid="input-value"
                    />
                    <Input
                      placeholder="Area (sq ft)"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      data-testid="input-area"
                    />
                  </div>

                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="border rounded px-3 py-2 w-full min-h-24"
                    data-testid="input-description"
                  />

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddProperty} data-testid="button-submit-property">Submit Property</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)} data-testid="button-cancel">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {userProperties.length > 0 ? (
                userProperties.map((prop) => (
                  <Card key={prop.id} className="border-muted" data-testid={`card-property-${prop.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{prop.propertyName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{prop.address}, {prop.city}</p>
                        </div>
                        <Badge variant={prop.transactionType === 'BUY' ? 'default' : 'secondary'} data-testid={`badge-type-${prop.id}`}>
                          {prop.transactionType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{prop.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Value</p>
                          <p className="font-medium">{prop.estimatedValue ? formatCurrency(Number(prop.estimatedValue)) : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Area</p>
                          <p className="font-medium">{prop.area} sq ft</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{prop.description}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No properties added yet. Click "Add Property" to get started.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Archived Properties Tab */}
          <TabsContent value="archived" className="space-y-4">
            <h2 className="text-xl font-semibold">Archived Properties</h2>
            
            <div className="grid gap-4">
              {archivedProperties.length > 0 ? (
                archivedProperties.map((archive) => (
                  <Card key={archive.id} className="border-muted" data-testid={`card-archive-${archive.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{archive.propertyDetails?.title || 'Property'}</CardTitle>
                          <p className="text-sm text-muted-foreground">{archive.propertyDetails?.address || 'Address not available'}</p>
                        </div>
                        <Badge variant="outline" data-testid={`badge-searched-${archive.id}`}>
                          {new Date(archive.searchedAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {archive.notes && (
                        <p className="text-sm mb-2"><strong>Notes:</strong> {archive.notes}</p>
                      )}
                      {archive.rating && (
                        <p className="text-sm text-muted-foreground">Rating: {archive.rating}/5</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No archived properties yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
