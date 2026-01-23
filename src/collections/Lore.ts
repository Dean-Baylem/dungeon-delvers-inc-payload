import { slugField, type CollectionConfig } from 'payload';
import generateSortableDate from '@/payloadHooks/generateSortableDate';

export const Lore: CollectionConfig = {
  slug: 'lore',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    slugField({ useAsSlug: 'name' }),
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
              options: [
                { label: 'Doctrine', value: 'doctrine' },
                { label: 'Religion, Myth, & Magic', value: 'religion_myth_and_magic' },
                { label: 'History & Politics', value: 'history_and_politics' },
                { label: 'Culture & Society', value: 'culture_and_society' },
                { label: 'Places, Objects', value: 'places_and_objects' },
                { label: 'People & Figures', value: 'people_and_figures' },
                { label: 'General Lore', value: 'general_lore' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'subtype',
              type: 'select',
              options: [
                { value: 'ideology', label: 'Ideology' },
                { value: 'philosophy', label: 'Philosophy' },
                { value: 'cosmology', label: 'Cosmology' },
                { value: 'religion', label: 'Religion' },
                { value: 'myth', label: 'Myth' },
                { value: 'prophecy', label: 'Prophecy' },
                { value: 'arcane', label: 'Arcane Lore' },
                { value: 'ritual', label: 'Ritual' },
                { value: 'history', label: 'History' },
                { value: 'event', label: 'Event' },
                { value: 'war', label: 'War' },
                { value: 'treaty', label: 'Treaty' },
                { value: 'law_policy', label: 'Law / Policy' },
                { value: 'disaster', label: 'Disaster' },
                { value: 'culture', label: 'Culture' },
                { value: 'tradition', label: 'Tradition' },
                { value: 'language', label: 'Language' },
                { value: 'holiday', label: 'Holiday / Festival' },
                { value: 'landmark', label: 'Landmark' },
                { value: 'geology', label: 'Geology' },
                { value: 'technology', label: 'Technology' },
                { value: 'tome', label: 'Tome / Text' },
                { value: 'legendary_figure', label: 'Legendary Figure' },
                { value: 'general', label: 'General Lore' },
              ],
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
  ],
};
