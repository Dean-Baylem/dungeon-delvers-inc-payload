type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 'sm' | 'md' | 'lg' | 'xsm';
  children: React.ReactNode;
  customClasses?: string;
};

export default function PageTitle({ as: Component, size, children, customClasses }: Props) {
  const sizeClasses = {
    xsm: 'font-subheading text-heading',
    sm: 'font-subheading text-heading text-lg',
    md: 'font-bold font-heading text-heading text-3xl',
    lg: 'font-bold font-heading text-heading text-4xl border-b-[3px] border-heading w-full pb-1',
  };

  return (
    <Component className={`${sizeClasses[size]} ${customClasses || ''}`}>{children}</Component>
  );
}
