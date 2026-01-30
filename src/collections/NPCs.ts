import { slugField, type CollectionConfig } from 'payload';

export const NPCs: CollectionConfig = {
  slug: 'npcs',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'relatedFaction',
          type: 'relationship',
          relationTo: 'factions',
          hasMany: true,
          maxDepth: 1,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'hidden',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '20%',
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Infobox details',
      fields: [
        {
          name: 'portrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'aliases',
          type: 'array',
          fields: [
            {
              name: 'alias',
              type: 'text',
            },
          ],
        },
        {
          name: 'species',
          type: 'text',
          required: false,
        },
        {
          name: 'age',
          type: 'text',
          required: false,
        },
        {
          name: 'disposition',
          type: 'select',
          options: [
            { label: 'Ally', value: 'ally' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Villain', value: 'villain' },
          ],
          required: true,
        },
      ],
    },
    {
      type: 'group',
      fields: [
        {
          name: 'allies',
          type: 'relationship',
          relationTo: 'npcs',
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'adversaries',
          type: 'relationship',
          relationTo: 'npcs',
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'home',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: false,
      maxDepth: 1,
    },
    {
      name: 'relatedWorld',
      type: 'relationship',
      relationTo: 'worlds',
      maxDepth: 0,
    },
    slugField({ useAsSlug: 'name' }),
  ],
};
