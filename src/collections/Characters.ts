import { slugField, type CollectionConfig } from 'payload';

export const Characters: CollectionConfig = {
  slug: 'characters',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    slugField({ useAsSlug: 'name' }),
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'dmNotes',
      type: 'richText',
    },
  ],
};
