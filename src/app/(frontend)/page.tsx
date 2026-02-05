import React from 'react';
import './styles.css';
import Hero from '@/components/ui/hero/Hero';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import PageContents from '@/components/layout/page/PageContents';
import AdventureAndExploration from '@/components/layout/home/AdventureAndExploration';
import LoreAndLegend from '@/components/layout/home/LoreAndLegend';
import FactionsAndSocieties from '@/components/layout/home/FactionsAndSocieties';
import FaithsAndOrigins from '@/components/layout/home/FaithsAndOrigins';
import HomeQuery from '@/lib/query/homeQuery';

export const revalidate = 60 * 60 * 24 * 375;

export default async function HomePage() {
  const {
    worldData,
    keyNPCData,
    factionData,
    religionData,
    loreData,
    locationData,
    sessionData,
    adventureData,
  } = await HomeQuery();

  if (worldData.totalDocs === 0) {
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

  const world = worldData.docs[0];
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
        <AdventureAndExploration
          richText={adventureAndExploration}
          gazetterLinks={locationData}
          sessionData={sessionData}
          adventureData={adventureData}
        />
        <LoreAndLegend richText={loreAndLegend} loreItems={loreData} />
        <FactionsAndSocieties
          richText={factionsAndSocieties}
          npcRichText={alliesRivalsAndVillains}
          keyNPCData={keyNPCData}
          factionData={factionData}
        />
        <FaithsAndOrigins
          richText={deitiesAndCosmology}
          originsText={planarHistory}
          religions={religionData}
        />
      </PageContents>
    </main>
  );
}
