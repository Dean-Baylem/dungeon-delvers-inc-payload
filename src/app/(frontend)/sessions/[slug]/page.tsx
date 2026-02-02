import SinglePage from '@/components/layout/page/SinglePage';
import singleQuery from '@/lib/query/singleQuery';
import { Session } from '@/payload-types';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'sessions',
    limit: 100,
    populate: {
      sessions: {
        pageSlug: true,
      },
    },
  });

  return data.docs.map((doc) => ({
    slug: doc.pageSlug,
  }));
}

export default async function SingleSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data: Session = await singleQuery({
    collection: 'sessions',
    slug,
  });

  return (
    <SinglePage
      title={data.title}
      lead={`Session: ${data.sessionNumber} | Date: ${new Date(data.sessionDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      content={data.content ? data.content : undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
    />
  );
}
