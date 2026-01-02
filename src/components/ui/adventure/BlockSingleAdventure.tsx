import AdventurerList from '@/components/ui/adventure/adventurerList/AdventurerList';
import PageText from '@/components/ui/typography/PageText';
import PageTitle from '@/components/ui/typography/PageTitle';
import BlockNavLinks from '../../blocks/nav/BlockNavLinks';

type Props = {
  title: string;
  description: string;
  list: Array<{
    iconSrc: string;
    name: string;
  }>;
};

export default function BlockSingleAdventure({ title, description, list }: Props) {
  return (
    <article className="grid grid-cols-[1fr_11.25rem] gap-6 border border-heading w-full py-4 px-6 shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] bg-surface bg-[url(/transparent-bg/natural-paper.png)] bg-size-cover">
      <div className="flex flex-col gap-4">
        <PageTitle as="h4" size="sm">
          {title}
        </PageTitle>
        <PageText customClasses="font-medium">{description}</PageText>
        <BlockNavLinks linkArray={[{ link: '/', text: 'See Adventure', type: 'primary' }]} />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <PageTitle as="h5" size="xsm">
          Adventurers
        </PageTitle>
        <AdventurerList list={list} />
      </div>
    </article>
  );
}
