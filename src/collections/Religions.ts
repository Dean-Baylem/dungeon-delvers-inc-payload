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
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
  ],
};
