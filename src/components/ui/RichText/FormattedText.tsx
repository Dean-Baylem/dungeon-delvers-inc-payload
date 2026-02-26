type Props = {
  customClass: string;
  children: React.ReactNode;
};

export default function FormattedText({ children, customClass }: Props) {
  return <div className={`richTextContent ${customClass}`}>{children}</div>;
}
