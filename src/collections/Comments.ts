import type { CollectionConfig } from 'payload';

export const Comments: CollectionConfig = {
  slug: 'comments',
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'players',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Publish', value: 'publish' },
        { label: 'draft', value: 'draft' },
        { label: 'trash', value: 'trash' },
      ],
    },
    {
      name: 'parentPost',
      type: 'relationship',
      relationTo: ['adventures', 'factions', 'lore', 'npcs', 'religions', 'sessions'],
      required: true,
    },
    {
      name: 'parentComment',
      type: 'relationship',
      relationTo: 'comments',
      required: true,
    },
  ],
};
