import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { ReactNode } from 'react';

export type SinglePageType = {
  title: string;
  lead?: string;
  heroImage: {
    src: string;
    alt: string;
  };
  heroChildren?: ReactNode;
  content?: SerializedEditorState;
  infobox?: ReactNode;
};
