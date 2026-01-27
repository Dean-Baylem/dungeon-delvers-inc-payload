import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import singleQuery from '@/lib/query/singleQuery';
import { Session } from '@/payload-types';

export default async function SingleSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data: Session = await singleQuery({
    collection: 'sessions',
    slug,
  });

  return (
    <main>
      <Hero
        variant="half"
        title={data.title}
        lead={`Session: ${data.sessionNumber} | Date: ${new Date(data.sessionDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      />
      <PageContents>
        <PageSection title={data.title || 'Session Details'}></PageSection>
      </PageContents>
    </main>
  );
}
