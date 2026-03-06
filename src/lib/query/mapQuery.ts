import { getPayload, Config, WhereField } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';

type CollectionSlug = keyof Config['collections'];

export default async function MapQuery({
  isWorld,
  locationId = 0,
}: {
  isWorld: boolean;
  locationId?: number;
}) {
  const payload = await getPayload({ config });
  let queryBase = {
    collection: 'maps' as CollectionSlug,
    limit: 1,
  };
  let mapData;
  if (isWorld) {
    mapData = await payload.find({
      ...queryBase,
      where: {
        isWorldMap: {
          equals: true,
        },
      },
    });
  } else {
    mapData = await payload.find({
      ...queryBase,
      where: {
        relatedLocation: {
          equals: locationId,
        },
      },
    });
  }

  if (mapData.totalDocs === 0) {
    notFound();
  }

  return mapData.docs[0];
}
