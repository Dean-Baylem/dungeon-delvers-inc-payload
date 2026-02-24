import { CTA_TYPES } from '@/constants/ctaTypes';
import Link from 'next/link';
type Props = {
  link: string;
  text: string;
  type: 'primary' | 'secondary';
  target?: '_blank' | '_self';
};

export default function CTALink({ link, text, target = '_self', type }: Props) {
  const classes = CTA_TYPES;

  return (
    <Link href={link} target={target} className={classes[type]}>
      {text}
    </Link>
  );
}
