import { slugField, type CollectionConfig } from 'payload';

export const Factions: CollectionConfig = {
  slug: 'factions',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
          name: 'symbol',
          type: 'group',
          fields: [
            {
              name: 'symbolImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'symbolDescription',
              type: 'textarea',
              required: false,
              maxLength: 300,
            },
          ],
          required: false,
        },
        {
          name: 'factiontype',
          type: 'select',
          options: [
            { label: 'Adventuring', value: 'adventuring' },
            { label: 'Artistic', value: 'artistic' },
            { label: 'Arcane', value: 'arcane' },
            { label: 'Criminal', value: 'criminal' },
            { label: 'Knowledge', value: 'knowledge' },
            { label: 'Mercantile', value: 'mercantile' },
            { label: 'Military', value: 'military' },
            { label: 'Nature', value: 'nature' },
            { label: 'Occult', value: 'occult' },
            { label: 'Political', value: 'political' },
            { label: 'Religious', value: 'religious' },
            { label: 'Other', value: 'other' },
          ],
          required: false,
        },
        {
          name: 'goals',
          type: 'array',
          required: false,
          fields: [
            {
              name: 'goal',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'mantra',
          type: 'textarea',
          required: false,
        },
      ],
    },
    {
      name: 'membershipStructure',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ranking',
          type: 'number',
          min: 1,
          required: true,
        },
        {
          name: 'relatedNPCs',
          type: 'relationship',
          relationTo: 'npcs',
          maxDepth: 1,
        },
      ],
      required: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },

    {
      name: 'relatedLocations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      required: false,
      maxDepth: 1,
    },
    {
      name: 'leader',
      type: 'relationship',
      relationTo: 'npcs',
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
  admin: {
    useAsTitle: 'name',
  },
};
