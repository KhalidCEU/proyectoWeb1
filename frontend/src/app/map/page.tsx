'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [direccion, setDireccion] = useState('');

  // Ajustar iconos por defecto si lo deseas
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    if (mapRef.current && !map) {
      const initialMap = L.map(mapRef.current).setView([40.416775, -3.70379], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(initialMap);

      setMap(initialMap);
    }
  }, [map]);

  async function buscarTiendasCercanas(e: React.FormEvent) {
    e.preventDefault();
    if (!map || !direccion.trim()) return;

    // 1. Geocodificar la dirección con Nominatim
    const params = new URLSearchParams({
      q: direccion,
      format: 'json',
      addressdetails: '1',
      limit: '1'
    });

    const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData && geocodeData.length > 0) {
      const lat = parseFloat(geocodeData[0].lat);
      const lon = parseFloat(geocodeData[0].lon);

      map.setView([lat, lon], 14);

      // Crear icono personalizado para la ubicación actual
      const actualUbiIcon = L.icon({
        iconUrl: '/leaflet/actual_ubi.jpg', // Ruta a tu icono personalizado
        iconSize: [25, 41],   // Ajustar según tamaño del icono
        iconAnchor: [12, 41], // Punto del icono que se situará en la ubicación
        popupAnchor: [1, -34] // Ajustar según sea necesario
      });

      // Añadir un marcador en la ubicación buscada con el icono personalizado
      const userMarker = L.marker([lat, lon], { icon: actualUbiIcon }).addTo(map);
      userMarker.bindPopup('<strong>Ubicación buscada</strong>').openPopup();

      // 2. Consulta a Overpass para encontrar tiendas de zapatillas cercanas
      const radius = 10000; // 10km
      const overpassQuery = `
        [out:json];
        node["shop"="shoes"](around:${radius},${lat},${lon});
        out;
      `;

      const overpassURL = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
      const overpassRes = await fetch(overpassURL);
      const overpassData = await overpassRes.json();

      // Añadir marcadores para cada tienda encontrada
      overpassData.elements.forEach((element: any) => {
        if (element.lat && element.lon) {
          const nombre = element.tags && element.tags.name ? element.tags.name : 'Tienda sin nombre';
          const shopMarker = L.marker([element.lat, element.lon]).addTo(map);
          shopMarker.bindPopup(`<strong>${nombre}</strong>`);
        }
      });
    } else {
      console.log('No se encontró la dirección.');
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscador de tiendas de zapatillas</h1>
      <form onSubmit={buscarTiendasCercanas} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Introduce una dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full sm:w-auto flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar Tiendas
        </button>
      </form>
      <div className="w-full h-96" ref={mapRef}></div>
    </div>
  );
}
