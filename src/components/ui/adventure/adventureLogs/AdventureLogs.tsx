import Link from 'next/link';
import CTALink from '../../links/CTALink';
import PageTitle from '../../typography/PageTitle';
import AdventureLogGroup from './AdventureLogGroup';

type Props = {
  logs: Array<{
    link: string;
    text: string;
  }>;
  gazetter?: Array<{
    link: string;
    text: string;
  }>;
};

export default function AdventureLogs({ logs, gazetter }: Props) {
  return (
    <div className="flex flex-col gap-6 border border-heading py-4 px-6 shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] bg-surface bg-[url(/transparent-bg/natural-paper.png)] bg-size-cover w-full lg:max-w-[20rem] ml-auto">
      <AdventureLogGroup
        title="Adventure Logs"
        logs={logs}
        cta={{ link: `/sessions`, text: 'All Sessions', type: 'primary' }}
      />
      {gazetter && (
        <AdventureLogGroup
          title="Grand Gazetter"
          logs={gazetter}
          cta={{ link: `/grand-gazetter`, text: 'See More', type: 'secondary' }}
        />
      )}
    </div>
  );
}
