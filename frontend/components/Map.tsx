'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MarkerData {
  id: number;
  latitude: number;
  longitude: number;
  label: string;
}

interface MapProps {
  markers: MarkerData[];
  onMapClick?: (lat: number, lng: number) => void;
  clickMarker?: MarkerData | null;
}

// this component listens for map clicks
function ClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function Map({ markers, onMapClick, clickMarker }: MapProps) {
  return (
    <MapContainer
      center={[36.8065, 10.1815]}
      zoom={12}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
      // change cursor to crosshair when click mode is active
      className={onMapClick ? 'cursor-crosshair' : ''}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* click listener */}
      <ClickHandler onMapClick={onMapClick} />

      {/* existing markers */}
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          icon={defaultIcon}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}

      {/* preview marker where user clicked */}
      {clickMarker && (
        <Marker
          position={[clickMarker.latitude, clickMarker.longitude]}
          icon={redIcon}
        >
          <Popup>{clickMarker.label}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}