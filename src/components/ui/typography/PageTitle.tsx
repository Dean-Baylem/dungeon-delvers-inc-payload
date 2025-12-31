type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function PageTitle({ as: Component, size, children }: Props) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'font-bold font-heading text-heading text-3xl border-b-[3px] border-heading w-full pb-1',
  }

  return <Component className={sizeClasses[size]}>{children}</Component>
}
