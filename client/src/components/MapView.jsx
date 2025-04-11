import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({ origin, destination }) => {
  const center = origin || { lat: 20.5937, lng: 78.9629 }; // Default India center

  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={6} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {origin && (
        <Marker position={[origin.lat, origin.lng]} icon={icon}>
          <Popup>Origin: {origin.address}</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={icon}>
          <Popup>Destination: {destination.address}</Popup>
        </Marker>
      )}
      {origin && destination && (
        <Polyline positions={[[origin.lat, origin.lng], [destination.lat, destination.lng]]} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapView;
