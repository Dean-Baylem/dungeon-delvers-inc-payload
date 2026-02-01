import { getPayload, WhereField } from 'payload';
import config from '@/payload.config';
import { FactionLocationCardType } from '@/types/factionsAndLocations/factionsAndLocations';
import { ReligionCardType } from '@/types/religionCard/religionCard';
import { LoreCardType } from '@/types/loreCard/lordCard';
import { AdventureLogType } from '@/types/adventureLog/adventureLog';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';
import { NPCListSingle } from '@/types/NPC/npcTypes';
import { Adventure, Media } from '@/payload-types';
import mediaTypeCheck from './mediaTypeCheck';
import { mapNPCDocToCard } from '../mappers/NPCCardMapper';
import { mapAdventureDocToCard } from '../mappers/adventureCardMapper';

export default async function HomeQuery(): Promise<{
  worldData: any;
  keyNPCData: Array<NPCListSingle>;
  factionData: Array<FactionLocationCardType>;
  religionData: Array<ReligionCardType>;
  loreData: Array<LoreCardType>;
  locationData: Array<AdventureLogType>;
  sessionData: Array<AdventureLogType>;
  adventureData: Array<AdventureCardType>;
}> {
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
      relatedWorld: worldData.docs[0].id as WhereField,
      highlight: 'true' as WhereField,
    },
  });

  const keyNPCData = keyNPCs.docs.map((npc) => mapNPCDocToCard(npc));

  // Key Location Data Collection
  const locationQuery = await payload.find({
    collection: 'locations',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id as WhereField,
    },
  });

  const locationData: AdventureLogType[] = locationQuery.docs.map((location) => ({
    link: `/grand-gazetteer/${location.slug}`,
    text: location.name,
  }));

  // Key Faction Data Collection
  const factionQuery = await payload.find({
    collection: 'factions',
    limit: 5,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id as WhereField,
    },
  });

  const factionData: FactionLocationCardType[] = factionQuery.docs.map((faction) => ({
    type: 'faction' as const,
    title: faction.name,
    summary: faction.summary,
    CTAlink: `/factions/${faction.slug}`,
    iconSrc: mediaTypeCheck(faction.symbol?.symbolImage)?.src,
  }));

  // Key Religion Data Collection
  const religiousOrder = await payload.find({
    collection: 'religions',
    limit: 6,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id as WhereField,
    },
  });

  const religionData: ReligionCardType[] = religiousOrder.docs
    .filter((religion) => religion.type) // safety guard
    .map((religion) => ({
      type: religion.type!,
      name: religion.name,
      slug: religion.pageSlug,
      summary: religion.summary,
      deities: religion.deities ?? [],
      icon: mediaTypeCheck(religion.icon) || undefined,
    }));

  // Key Lore Data Collection
  const loreDataQuery = await payload.find({
    collection: 'lore',
    limit: 16,
    depth: 1,
    where: {
      relatedWorld: worldData.docs[0].id as WhereField,
      highlight: 'true' as WhereField,
    },
  });

  const loreData: LoreCardType[] = loreDataQuery.docs.map((lore) => ({
    type: lore.type ?? '',
    subtype: lore.subtype ?? '',
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
      relatedWorld: worldData.docs[0].id as WhereField,
    },
  });

  const sessionData: AdventureLogType[] = sessionQuery.docs.map((session) => ({
    link: `/sessions/${session.pageSlug}`,
    text: session.title,
  }));

  const adventureQuery = await payload.find({
    collection: 'adventures',
    limit: 3,
    depth: 2,
    where: {
      relatedWorld: worldData.docs[0].id as WhereField,
    },
  });

  const adventureData: AdventureCardType[] = adventureQuery.docs.map((adventure: Adventure) =>
    mapAdventureDocToCard(adventure),
  );

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
}
