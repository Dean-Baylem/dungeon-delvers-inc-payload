import AdventurerList from '@/components/ui/adventure/adventurerList/AdventurerList';
import PageText from '@/components/ui/typography/PageText';
import PageTitle from '@/components/ui/typography/PageTitle';
import BlockNavLinks from '../../blocks/nav/BlockNavLinks';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';

type Props = {
  card: AdventureCardType;
};

export default function BlockSingleAdventure({ card }: Props) {
  const { title, summary, characterList, link } = card;
  return (
    <article className="flex flex-col md:grid md:grid-cols-[1fr_11.25rem] gap-6 border border-heading w-full py-4 px-6 shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] bg-surface bg-[url(/transparent-bg/natural-paper.png)] bg-size-cover">
      <div className="flex flex-col gap-4">
        <PageTitle as="h4" size="sm">
          {title}
        </PageTitle>
        <PageText customClasses="font-medium">{summary}</PageText>
        {/* <span className="hidden md:block">
          <BlockNavLinks linkArray={[{ link: link, text: 'See Adventure', type: 'primary' }]} />
        </span> */}
      </div>
      <div className="border-t-2 md:border-t-0 border-heading flex flex-col gap-4 text-center relative">
        <span className="none md:absolute h-4/5 w-0.5 bg-heading block top-1/2 -left-3 transform -translate-y-1/2"></span>
        <PageTitle as="h5" size="xsm">
          Adventurers
        </PageTitle>
        <AdventurerList list={characterList} />
        {/* <span className="md:hidden mx-auto mt-4">
          <BlockNavLinks linkArray={[{ link: link, text: 'See Adventure', type: 'primary' }]} />
        </span> */}
      </div>
    </article>
  );
}
