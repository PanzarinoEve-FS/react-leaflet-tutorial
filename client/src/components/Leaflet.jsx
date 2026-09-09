import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
});

const markersPosition = [
  { name: "Marker 1", address: "123 Main St", lat: 51.505, lng: -0.09 },
  { name: "Marker 2", address: "456 Oak Ave", lat: 51.515, lng: -0.1 },
  { name: "Marker 3", address: "789 Pine Rd", lat: 51.525, lng: -0.11 },
]

const mapPosition = [51.505, -0.09]

export default function LeafletMap() {
  return (
    <MapContainer
      center={mapPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '500px', margin: '0 auto' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersPosition.map((marker) => (
        <Marker key={marker.name} position={[marker.lat, marker.lng]}>
          <Popup>
            {marker.name}<br /> {marker.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
