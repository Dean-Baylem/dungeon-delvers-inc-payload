import { Faction, Location } from '@/payload-types';
import singleQuery from '@/lib/query/singleQuery';
import SinglePage from '@/components/layout/page/SinglePage';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';
import CommentSection from '@/components/layout/comments/CommentSection';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import commentQuery from '@/lib/query/commentQuery';

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'factions',
    limit: 100,
    populate: {
      locations: {
        pageSlug: true,
      },
    },
  });

  return data.docs.map((doc) => ({
    slug: doc.pageSlug,
  }));
}

export default async function SingleFactionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data: Faction = await singleQuery({
    collection: 'factions',
    slug,
  });

  if (!data) notFound();

  const comments: Array<SingleCommentType> = await commentQuery({
    collection: 'factions',
    pageId: Number(data.id),
  });

  return (
    <SinglePage
      title={data.name}
      content={data.content ? data.content : undefined}
      subtitle="Faction Details"
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
    >
      {data.content && (
        <CommentSection
          comments={comments}
          pageDetails={{ collection: 'factions', id: Number(data.id) }}
        />
      )}
    </SinglePage>
  );
}
