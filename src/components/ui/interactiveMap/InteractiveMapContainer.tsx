'use client';

import dynamic from 'next/dynamic';
import './map.css';
import { InteractiveMapType } from '@/types/interactiveMap/interactiveMapType';

export default function InteractiveMapContainer({ mapUrl, mapId }: InteractiveMapType) {
  const InteractiveMap = dynamic(() => import('@/components/ui/interactiveMap/InteractiveMap'), {
    ssr: false,
  });
  return <InteractiveMap mapUrl={mapUrl} mapId={mapId} />;
}
