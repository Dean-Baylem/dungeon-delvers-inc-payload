import { getPayload, Config, WhereField, Where } from 'payload';
import config from '@/payload.config';

type CollectionSlug = keyof Config['collections'];

export default async function ArchiveQuery({
  collection,
  page = 1,
  where,
}: {
  collection: string;
  page?: number;
  where?: Where;
}) {
  const payload = await getPayload({ config });
  const collectionSlug = collection as CollectionSlug;
  console.log(collectionSlug);
  const archiveData = await payload.find({
    collection: collectionSlug,
    limit: 20,
    page: page || 1,
    depth: 2,
    where,
  });

  return archiveData;
}
