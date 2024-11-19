// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapView = ({ data }) => {
//   if (!data || !data.length) return <div>No data available for the map</div>; // Guard against undefined or empty data

//   return (
//     <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {data.map((item, index) => (
//         <Marker
//           key={index}
//           position={[item.lat || 20.5937, item.lng || 78.9629]} // Fallback coordinates
//         >
//           <Popup>
//             <strong>{item.state}</strong>
//             <br />
//             Active: {item.active}
//             <br />
//             Recovered: {item.recovered}
//             <br />
//             Deaths: {item.deaths}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapView;


import React from 'react';
import { MapContainer, TileLayer, Marker, Popup,LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css"; // Import the Fullscreen control styles
import "leaflet/dist/leaflet.css";


const stateCoordinates = {
  "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
  "Karnataka": { lat: 15.3173, lng: 75.7138 },
  "Maharashtra": { lat: 19.7515, lng: 75.7139 },
  "Kerala": { lat: 10.8505, lng: 76.2711 },
  "Uttar Pradesh": { lat: 27.5501, lng: 81.6196 },
  "Delhi": { lat: 28.6139, lng: 77.2090 },
  "Bihar": { lat: 25.0961, lng: 85.3131 },
  "West Bengal": { lat: 22.9868, lng: 87.8550 },
  "Rajasthan": { lat: 27.0238, lng: 74.2179 },
  "Gujarat": { lat: 22.2587, lng: 71.1924 },
  "Punjab": { lat: 31.1471, lng: 75.3412 },
  "Haryana": { lat: 29.0588, lng: 76.0856 },
  "Madhya Pradesh": { lat: 23.4731, lng: 77.9479 },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
  "Jharkhand": { lat: 23.6100, lng: 85.2799 },
  "Odisha": { lat: 20.9517, lng: 85.0985 },
  "Assam": { lat: 26.2006, lng: 92.9376 },
  "Uttarakhand": { lat: 30.0668, lng: 78.2623 },
  "Himachal Pradesh": { lat: 32.0657, lng: 77.1975 },
  "Goa": { lat: 15.2993, lng: 74.1240 },
  "Tripura": { lat: 23.9408, lng: 91.9882 },
  "Sikkim": { lat: 27.5330, lng: 88.6133 },
  "Nagaland": { lat: 26.1584, lng: 94.5624 },
  "Arunachal Pradesh": { lat: 27.0855, lng: 93.6581 },
  "Manipur": { lat: 24.8032, lng: 93.9368 },
  "Meghalaya": { lat: 25.4670, lng: 91.3662 },
  "Mizoram": { lat: 23.1645, lng: 92.9376 },
  // "Nagaland": { lat: 26.1584, lng: 94.5624 },
  "Lakshadweep": { lat: 10.5625, lng: 72.6375 },
  "Andaman and Nicobar Islands": { lat: 11.7401, lng: 92.6586 },
};

// const MapView = ({ selectedStateData }) => {
//   // if (!selectedStateData ) return <div>No data available for the map</div>;

//   // Get the coordinates for the selected state
//   // const { lat, lng } = stateCoordinates[selectedStateData.state] || { lat: 20.5937, lng: 78.9629 };

//     // If no data is available, show an empty map
//   const { lat, lng } = selectedStateData
//     ? stateCoordinates[selectedStateData.state] || { lat: 20.5937, lng: 78.9629 }
//     : { lat: 20.5937, lng: 78.9629 }; // Default center (India)

//   return (
//     <MapContainer center={[lat, lng]} zoom={5} style={{ height: '400px', width: '100%' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {selectedStateData && (
//       <Marker position={[lat, lng]}>
//         <Popup>
//           <strong>{selectedStateData.state}</strong>
//           <br />
//           Active: {selectedStateData.active}
//           <br />
//           Recovered: {selectedStateData.recovered}
//           <br />
//           Deaths: {selectedStateData.deaths}
//         </Popup>
//       </Marker>
//           )}
//     </MapContainer>
//   );
// };

// export default MapView;



const MapView = ({ selectedStateData, covidData }) => {
  const markers = selectedStateData
    ? [
        {
          state: selectedStateData.state,
          lat: stateCoordinates[selectedStateData.state]?.lat || 20.5937,
          lng: stateCoordinates[selectedStateData.state]?.lng || 78.9629,
          active: selectedStateData.active,
          recovered: selectedStateData.recovered,
          deaths: selectedStateData.deaths,
        },
      ]
    : covidData
        .filter((item) => stateCoordinates[item.state]) // Include only states with coordinates
        .map((item) => ({
          state: item.state,
          lat: stateCoordinates[item.state]?.lat,
          lng: stateCoordinates[item.state]?.lng,
          active: item.active,
          recovered: item.recovered,
          deaths: item.deaths,
        }));
        

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "400px", width: "100%" }}  fullscreenControl={true} >
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <LayersControl position="topright">
        {/* Street Layer */}
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        {/* Satellite Layer */}
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <strong>{marker.state}</strong>
            <br />
            Active: {marker.active}
            <br />
            Recovered: {marker.recovered}
            <br />
            Deaths: {marker.deaths}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;