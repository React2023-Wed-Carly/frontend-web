import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { icon } from 'leaflet';

const MapViewer = ({ center }) => {
  const ICON = icon({
    iconUrl: '/marker.png',
    iconSize: [32, 32],
  });

  return (
    <MapContainer center={center} zoom={15} style={{ height: '300px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={ICON} />
    </MapContainer>
  );
};

export default MapViewer;