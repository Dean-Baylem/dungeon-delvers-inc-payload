import { getPayload, Config, WhereField } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';

type CollectionSlug = keyof Config['collections'];

export default async function commentQuery({
  collection,
  pageId,
}: {
  collection: string;
  pageId: number;
}) {
  const payload = await getPayload({ config });
  const collectionSlug = collection as CollectionSlug;
  const commentData = await payload.find({
    collection: 'comments',
    limit: 100,
    where: {
      parentPost: {
        equals: pageId,
      } as WhereField,
    },
  });
}
