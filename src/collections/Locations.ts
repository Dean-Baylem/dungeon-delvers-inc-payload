/*
Locations
Represents individual places within a region
*/

import { LOCATION_TERRAINS } from '@/constants/locationTerrain';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import { slugField, type CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations',
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
      type: 'group',
      label: 'Infobox details',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: LOCATION_TYPES,
        },
        {
          name: 'terrain',
          type: 'select',
          options: LOCATION_TERRAINS,
          required: false,
        },
        {
          name: 'resources',
          type: 'array',
          label: 'Available Resources',
          fields: [
            {
              name: 'singleResource',
              type: 'text',
            },
          ],
          required: false,
        },
        {
          name: 'population',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) =>
              ['city', 'town', 'village', 'fortress'].includes(siblingData?.type),
          },
        },
        {
          name: 'economy',
          type: 'textarea',
          required: false,
          maxLength: 300,
          admin: {
            condition: (_, siblingData) =>
              ['city', 'town', 'village', 'fortress'].includes(siblingData?.type),
          },
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
      name: 'relatedNPCs',
      type: 'relationship',
      relationTo: 'npcs',
      hasMany: true,
      maxDepth: 1,
    },
    // {
    //   name: 'map',
    //   type: 'relationship',
    //   relationTo: 'maps',
    //   hasMany: false,
    //   maxDepth: 1,
    // },
    {
      name: 'parentLocation',
      type: 'relationship',
      relationTo: 'locations',
      maxDepth: 1,
      hasMany: false,
    },
    {
      name: 'relatedWorld',
      type: 'relationship',
      relationTo: 'worlds',
      maxDepth: 0,
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
  admin: {
    useAsTitle: 'name',
  },
};
