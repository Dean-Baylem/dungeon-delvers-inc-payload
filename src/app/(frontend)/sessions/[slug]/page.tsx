import BlockGroup from '@/components/blocks/group/BlockGroup';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import SinglePage from '@/components/layout/page/SinglePage';
import Hero from '@/components/ui/hero/Hero';
import CTALink from '@/components/ui/links/CTALink';
import { RichText } from '@/components/ui/RichText';
import { gridOptions } from '@/lib/options/gridOptions';
import singleQuery from '@/lib/query/singleQuery';
import { Session } from '@/payload-types';

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
