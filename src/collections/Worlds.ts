import type { CollectionConfig } from 'payload'

export const Worlds: CollectionConfig = {
  slug: 'worlds',
  admin: {
    useAsTitle: 'name',
    description: 'The root collection for all other collections. One world per instance.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'allowedUsers',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      type: 'group',
      name: 'overview',
      label: 'World Overview',
      fields: [
        { name: 'adventureAndExploration', type: 'richText' },
        { name: 'loreAndLegend', type: 'richText' },
        { name: 'factionsAndSocieties', type: 'richText' },
        { name: 'deitiesAndCosmology', type: 'richText' },
        { name: 'planarHistory', type: 'richText' },
      ],
    },
  ],
}
