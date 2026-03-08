'use client';
import { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { InteractiveMapType } from '@/types/interactiveMap/interactiveMapType';
import InteractiveMapControls from './InteractiveMapControls';
import InteractiveMapPinCreator from './InteractiveMapPinCreator';

export default function InteractiveMap({ mapUrl, mapId }: InteractiveMapType) {
  const [bounds, setBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = mapUrl;
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      setBounds([
        [0, 0],
        [height, width],
      ]);
      setCenter([height / 2, width / 2]);
    };
  }, [mapUrl]);

  return (
    <>
      {bounds && (
        <MapContainer
          crs={L.CRS.Simple}
          zoom={-1}
          minZoom={-3}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          bounds={bounds}
          center={center!}
        >
          <InteractiveMapPinCreator mapId={mapId} />
          <InteractiveMapControls />
          <ImageOverlay url={mapUrl} bounds={bounds} />
        </MapContainer>
      )}
    </>
  );
}
