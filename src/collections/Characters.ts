import { slugField, type CollectionConfig } from 'payload';

export const Characters: CollectionConfig = {
  slug: 'characters',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'pageSlug',
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
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'privateContent',
      type: 'textarea',
    },
    {
      name: 'player',
      type: 'relationship',
      relationTo: 'players',
      hasMany: false,
    },
  ],
};
