'use client';
import { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { InteractiveMapType } from '@/types/interactiveMap/interactiveMapType';
import InteractiveMapControls from './InteractiveMapControls';
import InteractiveMapPinCreator from './InteractiveMapPinCreator';
import InteractiveMapStyleHandler from './InteractiveMapStyleHandler';
import InteractiveMapPins from './InteractiveMapPins';
import InteractiveMapInfobar from './InteractiveMapInfobar';
import InteractiveMapPinEditor from './InteractiveMapPinEditor';
import LoadingScreen from '../loadingScreen/LoadScreen';

export default function InteractiveMap({
  mapUrl,
  mapId,
  mapContent = undefined,
  mapName,
}: InteractiveMapType) {
  const [bounds, setBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const { mapLoading, addPinActive, isEditingPin } = useInteractiveMapStore((state) => state);

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
    <div className="h-full w-full relative">
      <h1 className="sr-only">{mapName}</h1>
      <LoadingScreen text="Map Loading" />
      <InteractiveMapInfobar mapContent={mapContent} mapName={mapName} />
      {bounds && (
        <MapContainer
          crs={L.CRS.Simple}
          zoom={-1}
          minZoom={-2}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          style={{ position: 'absolute', inset: 0 }}
          scrollWheelZoom={true}
          bounds={bounds}
          center={center!}
          className={addPinActive ? 'interactiveCursor--mapPin' : ''}
        >
          {addPinActive && <InteractiveMapPinCreator mapId={mapId} />}
          {isEditingPin && <InteractiveMapPinEditor />}
          {imageSize && <InteractiveMapPins mapId={Number(mapId)} imageSize={imageSize} />}
          <InteractiveMapControls />
          <ImageOverlay url={mapUrl} bounds={bounds} />
          <InteractiveMapStyleHandler />
        </MapContainer>
      )}
    </div>
  );
}
