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
import { ReligionCardType } from '@/types/religionCard/religionCard';
import { LoreCardType } from '@/types/loreCard/lordCard';
import { AdventureLogType } from '@/types/adventureLog/adventureLog';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';
import { Character } from '@/payload-types';

const handlePayloadQuery = async (): Promise<{
  worldData: any;
  keyNPCData: Array<NPCListSingle>;
  factionData: Array<FactionLocationCardType>;
  religionData: Array<ReligionCardType>;
  loreData: Array<LoreCardType>;
  locationData: Array<AdventureLogType>;
  sessionData: Array<AdventureLogType>;
  adventureData: Array<AdventureCardType>;
}> => {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const worldData = await payload.find({
    collection: 'worlds',
    limit: 1,
    depth: 2,
  });

  // Key NPC Data Collection
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

  // Key Location Data Collection
  const locationQuery = await payload.find({
    collection: 'locations',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const locationData: AdventureLogType[] = locationQuery.docs.map((location) => ({
    link: `/locations/${location.slug}`,
    text: location.name,
  }));

  // Key Faction Data Collection
  const factionQuery = await payload.find({
    collection: 'factions',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const factionData: FactionLocationCardType[] = factionQuery.docs.map((faction) => ({
    type: 'faction' as const,
    title: faction.name,
    summary: faction.summary,
    CTAlink: `/factions/${faction.slug}`,
    iconSrc: faction.symbol?.symbolImage?.url,
  }));

  // Key Religion Data Collection
  const religiousOrder = await payload.find({
    collection: 'religions',
    limit: 6,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const religionData: ReligionCardType[] = religiousOrder.docs
    .filter((religion) => religion.type) // safety guard
    .map((religion) => ({
      type: religion.type!,
      name: religion.name,
      slug: religion.slug,
      summary: religion.summary,
      deities: religion.deities ?? [],
      icon: religion.icon?.url
        ? {
            src: religion.icon.url,
            alt: religion.icon.alt ?? '',
          }
        : undefined,
    }));

  // Key Lore Data Collection
  const loreDataQuery = await payload.find({
    collection: 'lore',
    limit: 16,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
      highlight: true,
    },
  });

  const loreData: LoreCardType[] = loreDataQuery.docs.map((lore) => ({
    type: lore.type ?? '',
    name: lore.name,
    slug: lore.slug,
    summary: lore.summary,
  }));

  // Key Session Data Collection
  const sessionQuery = await payload.find({
    collection: 'sessions',
    limit: 3,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const sessionData: AdventureLogType[] = sessionQuery.docs.map((session) => ({
    link: `/sessions/${session.slug}`,
    text: session.title,
  }));

  const adventureQuery = await payload.find({
    collection: 'adventures',
    limit: 3,
    depth: 2,
    where: {
      relatedWorld: worldData.docs[0].id,
    },
  });

  const adventureData: AdventureCardType[] = adventureQuery.docs.map((adventure) => ({
    title: adventure.name,
    summary: adventure.summary,
    link: `/adventures/${adventure.slug}`,
    characterList: Array.isArray(adventure?.relatedCharacters)
      ? adventure?.relatedCharacters.map((adventure) => {
          return {
            iconSrc: adventure?.icon?.url,
            name: adventure?.name,
          };
        })
      : [],
  }));

  return {
    worldData,
    keyNPCData,
    factionData,
    religionData,
    loreData,
    locationData,
    sessionData,
    adventureData,
  };
};

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
  } = await handlePayloadQuery();

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
