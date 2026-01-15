import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Loader2 } from "lucide-react";

export interface LocationData {
  formattedAddress: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

interface AutocompletePrediction {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
    structuredFormat: {
      secondaryText: string;
    };
  };
}

interface LocationInputProps {
  value?: string;
  onChange?: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  apiKey?: string;
}

// RapidAPI Google Map Places (New V2) configuration
// Note: The actual endpoint structure may vary - check RapidAPI docs for your subscription
const RAPIDAPI_HOST = "google-map-places-new-v2.p.rapidapi.com";
const RAPIDAPI_BASE_URL = `https://${RAPIDAPI_HOST}`;

export function LocationInput({
  value = "",
  onChange,
  placeholder = "Enter address...",
  className,
  disabled = false,
  apiKey,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousValueRef = useRef<string>(value);
  
  // Configuration constants
  const DEBOUNCE_DELAY = 500; // milliseconds
  const MIN_INPUT_LENGTH = 3; // minimum characters before API call
  
  // Get RapidAPI key from environment variable or prop
  const rapidApiKey = apiKey || import.meta.env.VITE_RAPIDAPI_KEY || "";

  // Sync input value with prop value only when prop changes from parent
  useEffect(() => {
    // Only update if the value prop actually changed from parent (not from user typing)
    if (value !== previousValueRef.current) {
      setInputValue(value);
      previousValueRef.current = value;
    }
  }, [value]);

  // Fetch autocomplete suggestions from RapidAPI
  const fetchAutocompleteSuggestions = useCallback(async (input: string) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Validate input
    const trimmedInput = input.trim();
    if (!rapidApiKey || !trimmedInput || trimmedInput.length < MIN_INPUT_LENGTH) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setIsLoading(true);

    try {
      const url = `${RAPIDAPI_BASE_URL}/v1/places:autocomplete?input=${encodeURIComponent(trimmedInput)}`;
      
      const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
        body: JSON.stringify({
          input: trimmedInput,
        }),
        signal: abortController.signal,
      };

      const response = await fetch(url, fetchOptions);
      
      // Check if request was aborted
      if (abortController.signal.aborted) {
        return;
      }
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json() as { suggestions?: { placeId: string; placePrediction: { text: { text: string }; structuredFormat: { secondaryText: string | { text: string } } } }[] };
      
      // Check again if request was aborted after async operation
      if (abortController.signal.aborted) {
        return;
      }
      
      if (!data.suggestions || !Array.isArray(data.suggestions)) {
        setShowSuggestions(false);
        setIsLoading(false);
        return;
      }
      
      const predictions = data.suggestions.map((s: any) => {
        // Extract text values, handling both string and object formats
        const mainText = typeof s.placePrediction?.text?.text === 'string' 
          ? s.placePrediction.text.text 
          : typeof s.placePrediction?.text === 'string'
          ? s.placePrediction.text
          : String(s.placePrediction?.text);
        
        const secondaryText = typeof s.placePrediction?.structuredFormat?.secondaryText === 'string'
          ? s.placePrediction.structuredFormat.secondaryText
          : typeof s.placePrediction?.structuredFormat?.secondaryText === 'object' && s.placePrediction.structuredFormat.secondaryText?.text
          ? String(s.placePrediction.structuredFormat.secondaryText.text)
          : String(s.placePrediction?.structuredFormat?.secondaryText || '');
        
        return {
          placePrediction: {
            placeId: s.placePrediction.placeId,
            text: {
              text: String(mainText),
            },
            structuredFormat: {
              secondaryText: String(secondaryText),
            },
          },
        };
      });
      
      setSuggestions(predictions);
      setShowSuggestions(true);
      setIsLoading(false);
    } catch (error: any) {
      // Don't update state if request was aborted
      if (error.name === 'AbortError' || abortController.signal.aborted) {
        return;
      }
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [rapidApiKey]);

  // Handle input change with debouncing
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    // If input is empty or too short, clear suggestions immediately
    if (!newValue.trim() || newValue.trim().length < MIN_INPUT_LENGTH) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      // Cancel any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      return;
    }

    // Debounce autocomplete requests
    debounceTimerRef.current = setTimeout(() => {
      fetchAutocompleteSuggestions(newValue);
      debounceTimerRef.current = null;
    }, DEBOUNCE_DELAY);
  }, [fetchAutocompleteSuggestions]);

  // Helper function to process place details from different response formats
  const processPlaceDetails = useCallback((data: any, description: string) => {
    // Try different response structures
    let result = data.result || data.place || data;
    let location = result.geometry?.location || result.location;
    let addressComponents = result.addressComponents || result.address_components || [];
    
    // Handle different location formats
    let lat = 0, lng = 0;
    if (location) {
      if (typeof location.lat === 'function') {
        lat = location.lat();
        lng = location.lng();
      } else {
        lat = location.lat || location.latitude || 0;
        lng = location.lng || location.longitude || 0;
      }
    }
    
    // Extract address components - handle multiple possible formats
    const getComponent = (type: string) => {
      const component = addressComponents.find((comp: any) => {
        const types = comp.types || comp.type || [];
        return Array.isArray(types) ? types.includes(type) : types === type;
      });
      return component?.longName || component?.long_name || component?.longText || component?.text || component?.name || "";
    };

    // Get formatted address - try multiple sources
    const formattedAddress = 
      result.formattedAddress || 
      result.formatted_address || 
      result.displayName?.text ||
      result.displayName ||
      description || 
      "";

    // Extract city - try multiple component types
    const city = 
      getComponent("locality") || 
      getComponent("sublocality") ||
      getComponent("sublocality_level_1") ||
      getComponent("administrative_area_level_2") ||
      getComponent("administrative_area_level_3") ||
      "";

    // Extract state - try multiple component types
    const state = 
      getComponent("administrative_area_level_1") ||
      getComponent("administrative_area") ||
      "";

    // Extract country
    const country = getComponent("country") || "";

    // Extract pincode/postal code
    const pincode = 
      getComponent("postal_code") || 
      getComponent("postal_code_prefix") ||
      "";

    const locationData: LocationData = {
      formattedAddress: formattedAddress,
      lat: lat,
      lng: lng,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };

    // Update input value with the full formatted address
    setInputValue(formattedAddress);

    // Always call onChange - this is critical for the parent component to update
    if (onChange) {
      onChange(locationData);
    } else {
      console.warn("onChange callback is not defined!");
    }
  }, [onChange]);

  // Fetch place details from RapidAPI
  const fetchPlaceDetails = useCallback(async (placeId: string, description: string) => {
    if (!rapidApiKey) {
      console.error("RapidAPI key is not configured");
      // Still call onChange with fallback data even if API key is missing
      const fallbackData: LocationData = {
        formattedAddress: description,
        lat: 0,
        lng: 0,
        city: "",
        state: "",
        country: "",
        pincode: "",
      };
      onChange?.(fallbackData);
      setIsLoading(false);
      return;
    }

    // Cancel any in-flight autocomplete request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    let placeDetailsFetched = false;

    try {
      // Try multiple endpoint formats for place details
      const baseHeaders: Record<string, string> = {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      };

      const endpoints = [
        {
          url: `${RAPIDAPI_BASE_URL}/v1/places/${encodeURIComponent(placeId)}`,
          method: "GET" as const,
          headers: {
            ...baseHeaders,
            "X-Goog-FieldMask": "id,formattedAddress,location,addressComponents,displayName",
          },
        },
        {
          url: `${RAPIDAPI_BASE_URL}/places/${encodeURIComponent(placeId)}?fields=geometry,addressComponents,formattedAddress,displayName`,
          method: "GET" as const,
          headers: baseHeaders,
        },
        {
          url: `${RAPIDAPI_BASE_URL}/details?place_id=${encodeURIComponent(placeId)}`,
          method: "GET" as const,
          headers: baseHeaders,
        },
      ];

      let lastError: Error | null = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: endpoint.headers,
          });

          if (response.ok) {
            const data = await response.json();
            processPlaceDetails(data, description);
            placeDetailsFetched = true;
            setIsLoading(false);
            return;
          } else {
            const errorText = await response.text();
            console.warn(`API endpoint failed (${response.status}):`, errorText);
            lastError = new Error(`API request failed: ${response.status} - ${errorText}`);
            // Continue to next endpoint
          }
        } catch (err) {
          console.warn("API endpoint error:", err);
          lastError = err instanceof Error ? err : new Error(String(err));
          // Continue to next endpoint
        }
      }

      // If all endpoints failed, throw the last error
      if (lastError && !placeDetailsFetched) {
        throw lastError;
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      // Even if place details fail, still call onChange with available data
      // This ensures the UI updates even if the API call fails
      if (!placeDetailsFetched) {
        const fallbackData: LocationData = {
          formattedAddress: description,
          lat: 0,
          lng: 0,
          city: "",
          state: "",
          country: "",
          pincode: "",
        };
        onChange?.(fallbackData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [rapidApiKey, processPlaceDetails, onChange]);

  // Handle place selection
  const handleSelect = useCallback(async (placeId: string, description: string) => {
    
    // Validate inputs
    if (!placeId || !description) {
      console.error("Invalid place selection:", { placeId, description });
      return;
    }
    
    setIsLoading(true);
    // Update input value immediately with the selected description
    setInputValue(description);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Immediately call onChange with basic data so parent component updates right away
    // This ensures the UI updates even if the API call fails or is slow
    const immediateData: LocationData = {
      formattedAddress: description,
      lat: 0,
      lng: 0,
      city: "",
      state: "",
      country: "",
      pincode: "",
    };
    onChange?.(immediateData);
    
    // Then fetch detailed place information and update with full data
    // Note: fetchPlaceDetails will call onChange again with complete data when it finishes
    try {
      await fetchPlaceDetails(placeId, description);
    } catch (error) {
      console.error("Failed to fetch place details:", error);
      setIsLoading(false);
      // onChange was already called above with basic data, so UI is already updated
    }
  }, [onChange, fetchPlaceDetails]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both the input and the suggestions dropdown
      const isOutsideInput = inputRef.current && !inputRef.current.contains(target);
      const isOutsideSuggestions = suggestionsRef.current && !suggestionsRef.current.contains(target);
      
      if (isOutsideInput && isOutsideSuggestions) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup debounce timer and abort requests on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Show error state if API key is missing
  if (!rapidApiKey) {
    return (
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn("pr-10", className)}
          disabled={disabled}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-destructive mt-1">
          RapidAPI key is not configured. Please set VITE_RAPIDAPI_KEY environment variable.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        className={cn("pr-10", className)}
        disabled={disabled || isLoading}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <MapPin className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => {
            const placeId = suggestion.placePrediction?.placeId;
            const mainText = suggestion.placePrediction?.text?.text || "";
            const secondaryText = suggestion.placePrediction?.structuredFormat?.secondaryText || "";
            
            if (!placeId || !mainText) {
              console.warn("Invalid suggestion data:", suggestion);
              return null;
            }
            
            return (
              <button
                key={`${placeId}-${index}`}
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(placeId, mainText);
                }}
              > 
                <div className="flex items-start gap-2">  
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {mainText}
                    </div>
                    {secondaryText && (
                      <div className="text-xs text-muted-foreground truncate">
                        {secondaryText}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
