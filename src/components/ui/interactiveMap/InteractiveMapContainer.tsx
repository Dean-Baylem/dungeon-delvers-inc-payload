'use client';

import dynamic from 'next/dynamic';
import './map.css';
import { InteractiveMapType } from '@/types/interactiveMap/interactiveMapType';

export default function InteractiveMapContainer({
  mapUrl,
  mapId,
  mapName,
  mapContent = undefined,
}: InteractiveMapType) {
  const InteractiveMap = dynamic(() => import('@/components/ui/interactiveMap/InteractiveMap'), {
    ssr: false,
  });
  return <InteractiveMap mapUrl={mapUrl} mapId={mapId} mapContent={mapContent} mapName={mapName} />;
}
