import { RichText } from '@/components/ui/RichText';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = {
  text: SerializedEditorState;
};

export default function RichTextContent({ text }: Props) {
  return <RichText data={text} />;
}
