type Props = {
  children: React.ReactNode
}

export default function HeroQuote({ children }: Props) {
  return <blockquote>{children}</blockquote>
}
