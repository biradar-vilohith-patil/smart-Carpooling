import { useState } from "react";
import axios from "axios";

const OSMAutocomplete = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (!newQuery) {
      setSuggestions([]);
      return;
    }

    try {
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
    setQuery(place.display_name);
    setSuggestions([]);
    onSelect(selected);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
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
              onClick={() => handleSelect(place)}
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
