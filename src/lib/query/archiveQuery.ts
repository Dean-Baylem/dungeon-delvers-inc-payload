import { getPayload, Config, WhereField } from 'payload';
import config from '@/payload.config';

type CollectionSlug = keyof Config['collections'];

export default async function ArchiveQuery({
  collection,
  page,
  worldId,
}: {
  collection: string;
  page?: number;
  worldId?: number;
}) {
  const payload = await getPayload({ config });
  const collectionSlug = collection as CollectionSlug;
  const archiveData = await payload.find({
    collection: collectionSlug,
    limit: 20,
    page: page || 1,
    depth: 2,
    where: {
      relatedWorld: worldId as WhereField,
    },
  });

  return archiveData;
}
