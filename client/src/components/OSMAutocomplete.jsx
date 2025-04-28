import { useState } from "react";
import axios from "axios";

const OSMAutocomplete = ({ placeholder, onSelect }) => {
  // Set the initial state for the input value as an object
  const [query, setQuery] = useState({ address: "", lat: null, lng: null });
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    
    // Update only the address part of the state
    setQuery(prev => ({ ...prev, address: newQuery }));

    if (!newQuery) {
      setSuggestions([]);
      return;
    }

    try {
      // Make the request to Nominatim API to get suggestions
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: newQuery,
          format: "json",
          addressdetails: 1,
          limit: 5,
          countrycodes: "in",
        },
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'SmartCarpoolingApp/1.0 (your-email@example.com)',  // Important for OSM
        }
      });

      setSuggestions(res.data);
    } catch (err) {
      console.error("OSM search error:", err);
    }
  };

  const handleSelect = (place) => {
    const selected = {
      address: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    };

    // Update query with full object
    setQuery(selected);

    // Clear suggestions after selection
    setSuggestions([]);

    // Pass the selected place to the parent component
    onSelect(selected);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query.address}  // Display the address part in the input field
        placeholder={placeholder}
        className="border p-2 rounded w-full"
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow rounded w-full mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}  // Handle selection of place
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OSMAutocomplete;
