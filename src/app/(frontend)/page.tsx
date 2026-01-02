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
import BlockNavLinks from '@/components/blocks/nav/BlockNavLinks';
import InfoBox from '@/components/blocks/infobox/Infobox';
import Image from 'next/image';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';
import PageTitle from '@/components/ui/typography/PageTitle';
import AdventurerList from '@/components/ui/adventure/adventurerList/AdventurerList';
import BlockSingleAdventure from '@/components/ui/adventure/BlockSingleAdventure';
import AdventureLogs from '@/components/ui/adventure/adventureLogs/AdventureLogs';

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
    deitiesAndCosmology,
    planarHistory,
  } = world.overview;

  const adventurerList = [
    { iconSrc: '/icons/adventurer1.webp', name: 'Valen' },
    { iconSrc: '/icons/adventurer2.png', name: 'Raltz' },
    { iconSrc: '/icons/adventurer3.png', name: 'Spades' },
    { iconSrc: '/icons/adventurer4.png', name: 'Sivan' },
    { iconSrc: '/icons/adventurer5.png', name: 'Lem Naelax' },
  ];

  const dummyAdventures = [
    {
      title: 'The Lost Tomb of Horrors',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
    {
      title: "Dragon's Lair",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
    {
      title: 'Cursed Forest',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
  ];

  const adventureLogs = [
    { link: '/adventures/log1', text: 'The Awakening of the Giant Kings' },
    { link: '/adventures/log2', text: 'Siege of the Spider Queen' },
    { link: '/adventures/log3', text: 'The Old Evil Rises' },
  ];

  const grandGazetter = [
    { link: '/gazetter/entry1', text: 'The Forgotten City of Zel' },
    { link: '/gazetter/entry2', text: 'The Whispering Woods' },
    { link: '/gazetter/entry3', text: 'The Shattered Peaks' },
  ];

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
        <PageSection title="Adventure & Exploration">
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[6], pc: gridOptions.span.pc[7] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
              rowSpan: { tab: gridOptions.rowSpan.tab[2], pc: gridOptions.rowSpan.pc[2] },
            }}
          >
            <RichText data={adventureAndExploration} />
            <BlockNavLinks
              linkArray={[
                { link: '/', text: 'Current Campaign', type: 'primary' },
                { link: '/', text: 'Past Campaigns', type: 'secondary' },
              ]}
            />
            <PageTitle as="h3" size="md" customClasses="mt-8">
              Ongoing Quests & Highlights
            </PageTitle>
            {dummyAdventures.map((adventure, index) => (
              <BlockSingleAdventure
                title={adventure.title}
                description={adventure.description}
                list={adventure.adventurerList}
                key={`adventure-${adventure.title}-${index}`}
              />
            ))}
          </BlockGroup>
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[6], pc: gridOptions.span.pc[3] },
              start: { tab: gridOptions.start.tab[6], pc: gridOptions.start.pc[8] },
            }}
          >
            <InfoBox
              groups={[
                {
                  title: 'World Map',
                  content: (
                    <Image
                      src="/home/flanaess-map.avif"
                      width="320"
                      height="160"
                      alt="Flanaess World Map"
                    />
                  ),
                },
                {
                  title: 'World Information',
                  content: (
                    <InfoBoxList
                      list={[
                        { title: 'Setting:', text: 'Greyhawk (The Flanaess)' },
                        { title: 'Current Year:', text: '576 CY' },
                        {
                          title: 'Antagonists:',
                          text: 'The Giant Kingdoms\nThe Old Evil\nThe Spider Queen',
                        },
                      ]}
                    />
                  ),
                },
              ]}
            ></InfoBox>
          </BlockGroup>
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[6], pc: gridOptions.span.pc[3] },
              start: { tab: gridOptions.start.tab[6], pc: gridOptions.start.pc[8] },
              row: { tab: gridOptions.row.tab[2], pc: gridOptions.row.pc[2] },
            }}
          >
            <AdventureLogs logs={adventureLogs} gazetter={grandGazetter} />
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
