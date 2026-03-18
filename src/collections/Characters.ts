import { slugField, type CollectionConfig } from 'payload';

export const Characters: CollectionConfig = {
  slug: 'characters',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => false,
    delete: ({ req: { user } }) => {
      if (!user) return false;
      return {
        player: { equals: user.id },
      };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      return {
        player: { equals: user.id },
      };
    },
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
      access: {
        read: ({ req, doc }) => {
          if (!req.user) return false;
          const playerId = typeof doc?.player === 'object' ? doc.player.id : doc?.player;
          return req.user.id === playerId;
        },
      },
    },
    {
      name: 'player',
      type: 'relationship',
      relationTo: 'players',
      hasMany: false,
    },
  ],
};
