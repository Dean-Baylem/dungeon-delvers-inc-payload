type Props = {
  children: React.ReactNode;
  customClasses?: string;
};

export default function PageText({ children, customClasses }: Props) {
  return <p className={`font-serif text-mainText ${customClasses || ''}`}>{children}</p>;
}
