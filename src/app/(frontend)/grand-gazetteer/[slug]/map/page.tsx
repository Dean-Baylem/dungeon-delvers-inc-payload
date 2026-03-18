import { notFound, redirect } from 'next/navigation';
import isLoggedIn from '@/lib/auth/isLoggedIn';
import { Location, Map } from '@/payload-types';
import MapQuery from '@/lib/query/mapQuery';
import singleQuery from '@/lib/query/singleQuery';
import { InteractiveMapProvider } from '@/providers/interactive-map-provider';
import InteractiveMapContainer from '@/components/ui/interactiveMap/InteractiveMapContainer';

export default async function LocationMapPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await isLoggedIn();

  if (!user) {
    notFound();
  }

  const { slug } = await params;

  const locationData: Location = await singleQuery({
    collection: 'locations',
    slug,
  });

  if (!locationData) notFound();

  const locationId = locationData.id;

  const mapData: Map = await MapQuery({ isWorld: false, locationId });

  if (!mapData) notFound();

  const mapUrl = typeof mapData.image !== 'number' ? mapData?.image.url : undefined;
  const mapId = String(mapData.id);
  const mapContent = mapData.content ? mapData.content : undefined;
  const mapName = mapData.name;

  if (!mapUrl || !mapId || !mapName) {
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
