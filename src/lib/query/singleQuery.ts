import { getPayload, Config, WhereField, Where } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';

type CollectionSlug = keyof Config['collections'];

export default async function singleQuery({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) {
  const payload = await getPayload({ config });
  const collectionSlug = collection as CollectionSlug;
  const singleData = await payload.find({
    collection: collectionSlug,
    limit: 1,
    where: {
      pageSlug: {
        equals: slug,
      } as WhereField,
    },
  });

  if (singleData.totalDocs === 0) {
    notFound();
  }

  return singleData.docs[0];
}
