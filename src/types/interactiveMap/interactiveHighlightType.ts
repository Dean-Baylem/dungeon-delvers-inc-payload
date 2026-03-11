import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type InteractiveHighlightType = {
  mainTitle: string;
  content?: SerializedEditorState | string | null;
  children?: React.ReactNode;
};
