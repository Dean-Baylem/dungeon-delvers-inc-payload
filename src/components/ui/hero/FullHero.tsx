import Image from 'next/image'

type Props = {
  variant: 'full' | 'half'
  title: string
  lead?: string
  image: {
    src: string
    alt: string
  }
  children?: React.ReactNode
}

export default function FullHero({ variant = 'full', title, lead, image, children }: Props) {
  return (
    <section>
      <Image
        src={image.src}
        alt={image.alt}
        width="1440"
        height={variant === 'full' ? '600' : '400'}
        loading="eager"
      ></Image>
      <div>
        <hgroup>
          {lead && <p>{lead}</p>}
          <h1>{title}</h1>
        </hgroup>
        {children}
      </div>
    </section>
  )
}
