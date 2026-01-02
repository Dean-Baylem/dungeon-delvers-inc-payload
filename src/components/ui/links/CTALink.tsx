import Link from 'next/link';
type Props = {
  link: string;
  text: string;
  type: 'primary' | 'secondary';
  target?: '_blank' | '_self';
};

export default function CTALink({ link, text, target = '_self', type }: Props) {
  const classes = {
    primary:
      'bg-secondary py-1 px-4 text-white text-lg font-bold font-sans rounded border border-secondary duration-150 hover:bg-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
    secondary:
      'bg-background py-1 px-4 text-mainText text-lg font-bold font-sans rounded border border-secondary duration-150 hover:bg-mainText hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
  };

  return (
    <Link href={link} target={target} className={classes[type]}>
      {text}
    </Link>
  );
}
