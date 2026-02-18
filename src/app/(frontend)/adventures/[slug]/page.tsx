import SinglePage from '@/components/layout/page/SinglePage';
import singleQuery from '@/lib/query/singleQuery';
import { getPayload } from 'payload';
import { Adventure } from '@/payload-types';
import config from '@/payload.config';

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'adventures',
    limit: 100,
    populate: {
      adventures: {
        pageSlug: true,
      },
    },
  });

  return data.docs.map((doc) => ({
    slug: doc.pageSlug,
  }));
}

export default async function singleAdventurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data: Adventure = await singleQuery({
    collection: 'adventures',
    slug,
  });

  return (
    <SinglePage
      title={data.name}
      lead={`Adventure Status: ${data.status.replaceAll('_', ' ')}`}
      content={data.content ? data.content : undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
    />
  );
}
