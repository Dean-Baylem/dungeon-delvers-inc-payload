import { Religion } from '@/payload-types';
import singleQuery from '@/lib/query/singleQuery';
import SinglePage from '@/components/layout/page/SinglePage';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'religions',
    limit: 100,
    populate: {
      locations: {
        slug: true,
      },
    },
  });

  return data.docs.map((doc) => ({
    slug: doc.pageSlug,
  }));
}

export default async function SingleLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data: Religion = await singleQuery({
    collection: 'religions',
    slug,
  });

  if (!data) notFound();

  return (
    <SinglePage
      title={data.name}
      content={data.content ? data.content : undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
    />
  );
}
