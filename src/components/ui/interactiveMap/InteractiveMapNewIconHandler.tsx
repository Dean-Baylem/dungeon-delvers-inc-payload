'use client';
import { useMapEvent } from 'react-leaflet';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';

export default function MapNewIconHandler({ mapId }: { mapId: number }) {
  useMapEvent('click', (e) => {
    // if (!newIconForm && displayMode === 'createMapIcon') {
    //
    //   handleNewIconPosState({ xPoint: lat, yPoint: lng });
    //   handleNewIconFormState(true);
    // }
    const { lat, lng } = e.latlng;
    console.log(`Handle click event for new icon - lat: ${lat} | lng: ${lng}`);
  });

  return <></>;
}
