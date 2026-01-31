import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type SinglePageType = {
  title: string;
  lead?: string;
  heroImage: {
    src: string;
    alt: string;
  };
  content?: SerializedEditorState;
};
