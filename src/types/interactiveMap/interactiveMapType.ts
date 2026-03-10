import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type InteractiveMapType = {
  mapUrl: string;
  mapId: string;
  mapContent?: SerializedEditorState;
  mapName: string;
};
