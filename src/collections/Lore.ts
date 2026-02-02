import { slugField, type CollectionConfig } from 'payload';
import generateSortableDate from '@/payloadHooks/generateSortableDate';
import { LORE_TYPES } from '@/constants/loreTypes';
import { LORE_SUBTYPES } from '@/constants/loreSubtypes';

export const Lore: CollectionConfig = {
  slug: 'lore',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
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
        {
          name: 'pageSlug',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'startDateSort',
      type: 'number',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [generateSortableDate],
      },
    },
    {
      type: 'group',
      label: 'Infobox details',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: LORE_TYPES,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'subtype',
              type: 'select',
              options: LORE_SUBTYPES,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'era',
          label: 'Date / Era',
          type: 'text',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'startDateYear',
          label: 'World Year Started',
          type: 'number',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'startDateMonth',
          label: 'World Month Started',
          type: 'number',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
          maxLength: 300,
          admin: {
            width: '100%',
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Related Characters',
      fields: [
        {
          name: 'relatedFactions',
          type: 'relationship',
          relationTo: 'factions',
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'relatedReligions',
          type: 'relationship',
          relationTo: 'religions',
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'relatedNPCs',
          type: 'relationship',
          relationTo: 'npcs',
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      type: 'group',
      label: 'Related Groups',
      fields: [
        {
          name: 'relatedWorld',
          type: 'relationship',
          relationTo: 'worlds',
          maxDepth: 0,
        },

        {
          name: 'relatedLocations',
          type: 'relationship',
          relationTo: 'locations',
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      type: 'group',
      label: 'Session Notes',
      fields: [
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'dmNotes',
          type: 'richText',
          access: {
            read: ({ req }) => !!req.user,
          },
        },
      ],
    },
  ],
};
