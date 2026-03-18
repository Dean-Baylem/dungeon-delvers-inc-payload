import { type CollectionConfig } from 'payload';
import { PIN_TYPES } from '@/constants/pinTypes';

export const MapPins: CollectionConfig = {
  slug: 'map-pins',
  admin: {
    useAsTitle: 'pinLabel',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (!user) return false;
      return {
        author: { equals: user.id },
      };
    },
    delete: ({ req: { user } }) => {
      if (!user) return false;
      return {
        author: { equals: user.id },
      };
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'pinLabel',
          label: 'Pin label',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'pinType',
          label: 'Pin Type',
          type: 'select',
          options: PIN_TYPES,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'relatedMap',
          label: 'Related Map',
          type: 'relationship',
          relationTo: 'maps',
          hasMany: false,
          maxDepth: 0,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'xPoint',
          label: 'X Coordinate',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'yPoint',
          label: 'Y Coordinate',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'summary',
      label: 'Summary',
      type: 'textarea',
      admin: {
        description: 'A brief summary of the location this pin represents.',
      },
    },
    {
      name: 'relatedDocuments',
      label: 'Related Documents',
      type: 'relationship',
      relationTo: ['locations', 'factions', 'lore', 'religions'],
      hasMany: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'relationship',
      relationTo: 'players',
    },
  ],
};
