import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { icon } from "leaflet";

const MapPicker = ({ onLocationChange }) => {
  const [position, setPosition] = useState(null);
  

  const ICON = icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32],
  })
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition({ lat, lng });
    onLocationChange({ lat, lng });
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return position ? (
      <Marker position={position} icon={ICON}>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[52.182, 21.022]}
      zoom={15}
        style={{height: "300px"}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;