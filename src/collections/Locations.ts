/*
Locations
Represents individual places within a region
*/

import type { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'group',
      label: 'Infobox details',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'City', value: 'city' },
            { label: 'Dungeon', value: 'dungeon' },
            { label: 'Fortress', value: 'fortress' },
            { label: 'Other', value: 'other' },
            { label: 'Ruins', value: 'ruins' },
            { label: 'Town', value: 'town' },
            { label: 'Village', value: 'village' },
            { label: 'Wilderness', value: 'wilderness' },
          ],
        },
        {
          name: 'terrain',
          type: 'select',
          options: [
            { label: 'Caverns', value: 'caverns' },
            { label: 'Coastal', value: 'coastal' },
            { label: 'Desert', value: 'desert' },
            { label: 'Forest', value: 'forest' },
            { label: 'Hills', value: 'hills' },
            { label: 'Jungle', value: 'jungle' },
            { label: 'Mountains', value: 'mountains' },
            { label: 'Plains', value: 'plains' },
            { label: 'Ruins', value: 'ruins' },
            { label: 'Swamp', value: 'swamp' },
            { label: 'Tundra', value: 'tundra' },
            { label: 'Underground', value: 'underground' },
            { label: 'Urban', value: 'urban' },
            { label: 'Wetlands', value: 'wetlands' },
          ],
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
    // {
    //   name: 'keyNPCs',
    //   type: 'relationship',
    //   relationTo: 'npcs',
    //   hasMany: true,
    //   maxDepth: 1,
    // },
    // {
    //   name: 'map',
    //   type: 'relationship',
    //   relationTo: 'maps',
    //   hasMany: false,
    //   maxDepth: 1,
    // },
    {
      name: 'relatedWorld',
      type: 'relationship',
      relationTo: 'worlds',
      maxDepth: 0,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
};
