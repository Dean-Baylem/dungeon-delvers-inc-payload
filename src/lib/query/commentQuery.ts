import { getPayload, Config, WhereField } from 'payload';
import config from '@/payload.config';
import mediaTypeCheck from './mediaTypeCheck';
import { SingleCommentType } from '@/types/comments/singleCommentType';

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
      and: [
        {
          'parentPost.value': {
            equals: pageId,
          } as WhereField,
        },
        {
          'parentPost.relationTo': {
            equals: collectionSlug,
          },
        },
      ],
    },
  });

  if (commentData.totalDocs === 0) {
    return [];
  }

  return commentData.docs.map((comment): SingleCommentType => {
    const image = comment.character?.icon ? mediaTypeCheck(comment.character?.icon) : undefined;
    return {
      image: image,
      textContent: comment.content,
      username: comment.character?.name || 'Unknown Character',
      userId: comment.author.id,
      commentId: comment.id,
    };
  });
}
