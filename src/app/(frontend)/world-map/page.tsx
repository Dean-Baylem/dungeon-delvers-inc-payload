import InteractiveMapContainer from '@/components/ui/interactiveMap/InteractiveMapContainer';
import MapQuery from '@/lib/query/mapQuery';
import { Map } from '@/payload-types';
import { InteractiveMapProvider } from '@/providers/interactive-map-provider';
import { notFound } from 'next/navigation';

export default async function WorldMapPage() {
  const mapData: Map = await MapQuery({ isWorld: true });

  if (!mapData) {
    notFound();
  }

  const mapUrl = typeof mapData.image !== 'number' ? mapData?.image.url : undefined;
  const mapId = String(mapData.id);
  const mapContent = mapData.content ? mapData.content : undefined;
  const mapName = mapData.name;

  console.log(mapUrl);

  if (!mapUrl || !mapId) {
    notFound();
  }

  return (
    <InteractiveMapProvider>
      <div className="interactiveMap--container">
        <InteractiveMapContainer
          mapUrl={mapUrl}
          mapId={mapId}
          mapContent={mapContent}
          mapName={mapName}
        />
      </div>
    </InteractiveMapProvider>
  );
}
