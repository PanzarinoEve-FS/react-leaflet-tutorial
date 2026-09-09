# react-leaflet-tutorial

Eve Panzarino (jhankins)

Full Sail University

Repo for React Leaflet Tutorial Assignment

---

1.4 Exercise 01: Library Tutorial — [Click to watch video](https://fullsailedu-my.sharepoint.com/:v:/g/personal/jnhankins_student_fullsail_edu/IQBidfMZHvIQT43gJQyiedVsARpBz6SnAPKa3BTxSKI10Go?e=EZOFxK&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbE1vZGUiOiJtaXMiLCJyZWZlcnJhbFZpZXciOiJwb3N0cm9sbC1jb3B5bGluayIsInJlZmVycmFsUGxheWJhY2tTZXNzaW9uSWQiOiJiY2M5YTY3My1hOTQ3LTQwODItYWI0ZS02MTQwMGJhZTJjYTIifX0%3D)

React Leaflet: Library — [Click to go to their website with more documentation](https://react-leaflet.js.org).

I chose to use React Leaflet, as my first job was at my dad's company and I was the shipping and logistics supervisor and then tried to help my dad build this company's backend and we had a full chain of disposal in a recordkeeping system for compliance in medical waste disposal. I have a lot of experience trying to get leaflet maps to work a long time ago because of this. It is what introduced me to JSON.

Maps are something that connect us to the present moment because we go to them to find something we can do in the now. Maps are a very useful element to engage a user.

Also, React Leaflet has a lot of cool synergies with the APIs I was looking into for my project.

---

## Script: Steps to setup Leaflet

Hi I'm Eve Panzarino-Hankins. I chose the library Leaflet Maps.

OpenStreetMap - Credited use

With leaflet maps you can render maps with markers that when clicked popup with more information

At the website, https://react-leaflet.js.org you are given this code block with an example of the map on the website:

```jsx
render(
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)
```

Install Leaflet Node.js:

```bash
npm install leaflet react-leaflet
```

Import leaflet:

```jsx
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
```

Import marker icons - these are the default, but can be changed

```jsx
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
```

Set markers positions and information to be displayed

```jsx
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
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
```

You can also create markers and store different locations in json object that have popups

Map marker's position onto the marker

```jsx
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
```

Import leaflet map component to App.jsx

```jsx
import LeafletMap from './components/leaflet.jsx'

function App() {
  return (
    <>
      <h1>React Leaflet</h1>
      <LeafletMap />
    </>
  )
}
```

---

For my application I am using an api to get the user's location from their ip address which gives the map a starting point to query the apis for data from

Then on search the location updates to display new search results on the map.
