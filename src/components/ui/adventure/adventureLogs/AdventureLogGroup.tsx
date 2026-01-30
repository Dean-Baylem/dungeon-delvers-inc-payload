import PageTitle from '../../typography/PageTitle';
import CTALink from '../../links/CTALink';
import Link from 'next/link';

type Props = {
  title: string;
  logs: Array<{ link: string; text: string }>;
  cta: {
    link: string;
    text: string;
    type: 'primary' | 'secondary';
  };
};

export default function AdventureLogGroup({ title, logs, cta }: Props) {
  return (
    <article className="flex flex-col gap-4 items-center">
      <PageTitle as="h5" size="xsm">
        {title}
      </PageTitle>
      <ul className="flex flex-col gap-1 items-center">
        {logs.map((log, index) => (
          <li key={`adventure-log-${log.text}-${index}`}>
            <Link
              href={log.link}
              className="font-serif font-medium text-mainText underline underline-offset-2 duration-150 hover:opacity-80"
            >
              {log.text}
            </Link>
          </li>
        ))}
      </ul>
      <CTALink link={cta.link} text={cta.text} type={cta.type} />
    </article>
  );
}
