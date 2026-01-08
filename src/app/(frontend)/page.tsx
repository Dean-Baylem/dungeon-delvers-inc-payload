import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import './styles.css';
import Hero from '@/components/ui/hero/Hero';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import PageContents from '@/components/layout/page/PageContents';
import AdventureAndExploration from '@/components/layout/home/AdventureAndExploration';
import LoreAndLegend from '@/components/layout/home/LoreAndLegend';
import FactionsAndSocieties from '@/components/layout/home/FactionsAndSocieties';
import { NPCListSingle } from '@/types/NPC/npcTypes';
import FaithsAndOrigins from '@/components/layout/home/FaithsAndOrigins';
import { FactionLocationCardType } from '@/types/factionsAndLocations/factionsAndLocations';
import { ReligionCard } from '@/types/religionCard/religionCard';

const handlePayloadQuery = async (): Promise<{
  worldData: any;
  keyNPCData: Array<NPCListSingle>;
  locationFactions: Array<FactionLocationCardType>;
  religionData: Array<ReligionCard>;
}> => {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const worldData = await payload.find({
    collection: 'worlds',
    limit: 1,
    depth: 2,
  });

  // Gather NPC Data

  const keyNPCs = await payload.find({
    collection: 'npcs',
    limit: 10,
    depth: 2,
    where: {
      relatedWorld: worldData.docs[0].id,
      highlight: true,
    },
  });

  const keyNPCData = keyNPCs.docs.map((npc) => ({
    id: npc.id,
    slug: npc.slug,
    name: npc.name,
    portrait: {
      src: npc?.portrait?.url || '',
      alt: npc?.portrait?.alt || '',
    },
    disposition: npc.disposition,
    location: npc.home?.name || 'Unknown',
    faction:
      Array.isArray(npc?.relatedFaction) && npc?.relatedFaction[0]
        ? npc?.relatedFaction[0]?.name
        : '',
    summary: npc.summary,
  }));

  const locationData = await payload.find({
    collection: 'locations',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const factionData = await payload.find({
    collection: 'factions',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const locationFactions = [
    ...locationData.docs.map((location) => ({
      type: 'location',
      title: location.name,
      summary: location.summary,
      CTAlink: `/locations/${location.slug}`,
      details: { type: location.type, terrain: location.terrain },
    })),
    ...factionData.docs.map((faction) => ({
      type: 'faction',
      title: faction.name,
      summary: faction.summary,
      CTAlink: `/factions/${faction.slug}`,
      iconSrc: faction.symbol?.symbolImage?.url,
    })),
  ];

  const religiousOrder = await payload.find({
    collection: 'religions',
    limit: 6,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const religionData = religiousOrder.docs.map((religion) => ({
    type: religion.type,
    name: religion.name,
    slug: religion.slug,
    summary: religion.summary,
    deities: religion.deities,
    icon: religion.icon?.url
      ? {
          src: religion.icon?.url || '',
          alt: religion.icon?.alt || '',
        }
      : false,
  }));

  return {
    worldData,
    keyNPCData,
    locationFactions,
    religionData,
  };
};

export default async function HomePage() {
  const { worldData, keyNPCData, locationFactions, religionData } = await handlePayloadQuery();

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
        <AdventureAndExploration richText={adventureAndExploration} />
        <LoreAndLegend richText={loreAndLegend} />
        <FactionsAndSocieties
          richText={factionsAndSocieties}
          npcRichText={alliesRivalsAndVillains}
          keyNPCData={keyNPCData}
          factionsAndLocations={locationFactions}
        />
        <FaithsAndOrigins
          richText={deitiesAndCosmology}
          originsText={deitiesAndCosmology}
          Religions={[]}
        />
      </PageContents>
    </main>
  );
}
