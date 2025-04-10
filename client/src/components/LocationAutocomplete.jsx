import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useRef } from "react";

const LocationAutocomplete = ({ placeholder, onSelect }) => {
  const autoRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autoRef.current.getPlace();
    if (place && place.geometry) {
      onSelect({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Autocomplete onLoad={(auto) => (autoRef.current = auto)} onPlaceChanged={handlePlaceChanged}>
        <input
          type="text"
          placeholder={placeholder}
          className="border p-2 rounded-md w-full"
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default LocationAutocomplete;
