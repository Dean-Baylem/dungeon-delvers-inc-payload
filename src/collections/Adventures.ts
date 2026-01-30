import { slugField, type CollectionConfig } from 'payload';
import generateSortableDate from '@/payloadHooks/generateSortableDate';

export const Adventures: CollectionConfig = {
  slug: 'adventures',
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
      label: 'Infobox Details',
      fields: [
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Abandoned', value: 'abandoned' },
            { label: 'Completed', value: 'completed' },
            { label: 'Failed', value: 'failed' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Not Started', value: 'not_started' },
          ],
          required: true,
          defaultValue: 'not_started',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'startDateYear',
              label: 'Campaign Year Adventure Started',
              type: 'number',
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'startDateMonth',
              label: 'Campaign Month Adventure started',
              type: 'number',
              admin: {
                width: '50%',
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'relatedWorld',
              type: 'relationship',
              relationTo: 'worlds',
              required: true,
              admin: {
                width: '100%',
              },
            },
            {
              name: 'relatedCharacters',
              type: 'relationship',
              relationTo: 'characters',
              hasMany: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'relatedLocations',
              type: 'relationship',
              relationTo: 'locations',
              hasMany: true,
              maxDepth: 1,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'relatedNPCs',
              type: 'relationship',
              relationTo: 'npcs',
              hasMany: true,
              maxDepth: 1,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'relatedFactions',
              type: 'relationship',
              relationTo: 'factions',
              hasMany: true,
              maxDepth: 1,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'relatedReligions',
              type: 'relationship',
              relationTo: 'religions',
              hasMany: true,
              maxDepth: 1,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'plotHooks',
      type: 'array',
      fields: [
        {
          name: 'plotHook',
          type: 'text',
        },
        {
          name: 'public',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'consequences',
      type: 'array',
      fields: [
        {
          name: 'consequence',
          type: 'text',
        },
        {
          name: 'public',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'dmNotes',
      type: 'richText',
    },
  ],
};
