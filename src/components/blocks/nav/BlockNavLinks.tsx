import CTALink from '@/components/ui/links/CTALink';
import Link from 'next/link';

type Props = {
  linkArray: Array<{ link: string; text: string; type: 'primary' | 'secondary' }>;
};

export default function BlockNavLinks({ linkArray }: Props) {
  return (
    <nav className="flex flex-wrap gap-4">
      {linkArray.map((link, index) => (
        <CTALink
          link={link.link}
          text={link.text}
          type={link.type}
          key={`link-${link.text}-${index}`}
        />
      ))}
    </nav>
  );
}
