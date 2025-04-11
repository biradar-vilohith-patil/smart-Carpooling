import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix default marker icon (Vite breaks it by default)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
};

const MapView = ({ origin, destination, currentLocation }) => {
  const position = origin || [20.5937, 78.9629]; // Default: India

  const route = origin && destination ? [origin, destination] : [];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {currentLocation && (
        <Marker position={currentLocation}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}

      {origin && (
        <Marker position={origin}>
          <Popup>Origin</Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {route.length === 2 && (
        <Polyline positions={route} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapView;
