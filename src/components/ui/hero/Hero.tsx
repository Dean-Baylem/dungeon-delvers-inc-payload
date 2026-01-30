import Image from 'next/image';

type Props = {
  variant: 'full' | 'half';
  title: string;
  lead?: string;
  image: {
    src: string;
    alt: string;
  };
  children?: React.ReactNode;
};

export default function Hero({ variant = 'full', title, lead, image, children }: Props) {
  const minHeight = variant === 'full' ? 'min-h-112' : 'min-h-80';
  const maxHeight = variant === 'full' ? 'max-h-150' : 'max-h-96';
  return (
    <section className={`relative grid ${minHeight}`}>
      <div className="w-full relative col-start-1 row-start-1">
        <span className="bg-[radial-gradient(circle,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)] absolute h-full w-full opacity-60"></span>
        <Image
          className={`w-full h-full ${maxHeight} object-cover`}
          src={image.src}
          alt={image.alt}
          width="1440"
          height={variant === 'full' ? '600' : '400'}
          loading="eager"
        ></Image>
      </div>
      <div className="col-start-1 row-start-1 self-center justify-self-center flex flex-col items-center justify-center gap-8 z-10 px-4">
        <hgroup className="font-heading text-white text-center">
          {lead && <p className="text-2xl">{lead}</p>}
          <h1 className="text-6xl mt-3 capitalize">{title}</h1>
        </hgroup>
        {children}
      </div>
    </section>
  );
}
