import Hero from '@/components/ui/hero/Hero';
import HeroQuote from '@/components/ui/hero/HeroQuote';

export default function NoPosts() {
  return (
    <main>
      <Hero
        variant="half"
        title="Empty Collection"
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      >
        <HeroQuote>
          <p className="font-subheading text-white text-center max-w-2xl leading-loose">
            Our archives have no data.
          </p>
        </HeroQuote>
      </Hero>
    </main>
  );
}
