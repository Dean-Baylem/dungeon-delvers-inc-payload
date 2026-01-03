import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import './styles.css';
import Hero from '@/components/ui/hero/Hero';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import { gridOptions } from '@/lib/options/gridOptions';
import { RichText } from '@/components/ui/RichText';
import Image from 'next/image';
import LoreList from '@/components/ui/lore/LoreList';
import AdventureAndExploration from '@/components/layout/home/AdventureAndExploration';
import LoreAndLegend from '@/components/layout/home/LoreAndLegend';
import FactionsAndSocieties from '@/components/layout/home/FactionsAndSocieties';

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const result = await payload.find({
    collection: 'worlds',
    limit: 1,
    depth: 2,
  });

  console.log('Worlds fetch result:', result);

  if (result.totalDocs === 0) {
    return (
      <main>
        <Hero
          variant="full"
          title="No World Found"
          lead="Apologies, but we couldn't find any world data."
          image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
        ></Hero>
      </main>
    );
  }

  const world = result.docs[0];
  const {
    adventureAndExploration,
    loreAndLegend,
    factionsAndSocieties,
    alliesRivalsAndVillains,
    deitiesAndCosmology,
    planarHistory,
  } = world.overview;

  return (
    <main>
      <Hero
        variant="full"
        title="Greyhawk"
        lead="Welcome to"
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      >
        <HeroQuote>
          <p className="font-subheading text-white text-center max-w-2xl leading-loose">
            <span className="px-1">&ldquo;</span>
            Before the Flanaess flooded, a force more oppressive than the secret sects of the South,
            the Spider Queen of the Abyss, and even the Old Evil ruled — The Giant Kingdoms.
            <span className="px-1">&rdquo;</span>
          </p>
          <p className="text-white text-sm text-end font-sans italic font-light mt-2">
            The Chronicals of the Giants - Archmage Arullias
          </p>
        </HeroQuote>
      </Hero>
      <PageContents>
        <AdventureAndExploration richText={adventureAndExploration} />
        <LoreAndLegend richText={loreAndLegend} />
        <FactionsAndSocieties
          richText={factionsAndSocieties}
          npcRichText={alliesRivalsAndVillains}
        />
      </PageContents>
    </main>
  );
}
