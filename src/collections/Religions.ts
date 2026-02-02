import { deityList } from '@/lib/options/deityOptions';
import { slugField, type CollectionConfig } from 'payload';

export const Religions: CollectionConfig = {
  slug: 'religions',
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
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Ancestor & Ancestral Faith', value: 'ancestral_faith' },
            { label: 'Celestial / Higher Power Faith', value: 'celestial_faith' },
            { label: 'Civic / Lawful Faith', value: 'civic_faith' },
            { label: 'Death & Funerary Faith', value: 'death_faith' },
            { label: 'Elemental Faith', value: 'elemental_faith' },
            { label: 'Fiendish Tradition', value: 'fiendish_faith' },
            { label: 'Heretical Sect', value: 'heretical_sect' },
            { label: 'Ideological Order', value: 'ideological_order' },
            { label: 'Monastic Order', value: 'monastic_order' },
            { label: 'Monotheistic Tradition', value: 'monotheism' },
            { label: 'Mystery & Esoteric Tradition', value: 'mystery_faith' },
            { label: 'Other / Syncretic Tradition', value: 'other' },
            { label: 'Pantheonic Tradition', value: 'pantheism' },
            { label: 'Primal / Nature Faith', value: 'primal_faith' },
            { label: 'Prophetic Movement', value: 'prophetic_faith' },
            { label: 'Revivalist Movement', value: 'revivalist_faith' },
            { label: 'Shadow / Chthonic Faith', value: 'shadow_faith' },
            { label: 'Trickster Tradition', value: 'trickster_faith' },
          ],
        },
        {
          name: 'deities',
          type: 'select',
          hasMany: true,
          options: deityList,
        },
      ],
    },
    {
      name: 'relatedWorlds',
      type: 'relationship',
      relationTo: 'worlds',
      hasMany: true,
      maxDepth: 1,
    },
    {
      type: 'group',
      label: 'Related NPCs, Factions, & Locations',
      fields: [
        {
          name: 'relatedNPCs',
          type: 'relationship',
          relationTo: 'npcs',
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'relatedFactions',
          type: 'relationship',
          relationTo: 'factions',
          hasMany: true,
          maxDepth: 1,
        },
        {
          name: 'relatedLocations',
          type: 'relationship',
          relationTo: 'locations',
          hasMany: true,
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
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
