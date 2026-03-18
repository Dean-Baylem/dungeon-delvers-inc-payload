import NoMapFound from '@/components/layout/page/NoMapFound';

export default async function MapNotFound() {
  return <NoMapFound ctaText="Return to Location Page" hasReturn={true} />;
}
