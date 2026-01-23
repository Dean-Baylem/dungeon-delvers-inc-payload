import { slugField, type CollectionConfig } from 'payload';

export const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    slugField({ useAsSlug: 'title' }),
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            width: '40%',
          },
        },
        {
          name: 'relatedWorld',
          type: 'relationship',
          relationTo: 'worlds',
          required: true,
          admin: {
            width: '40%',
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
      label: 'Infobox Details',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'sessionNumber',
              label: 'Session Number',
              required: true,
            },
            {
              type: 'date',
              name: 'sessionDate',
              label: 'Session Date',
              required: true,
            },
            {
              type: 'text',
              name: 'worldDate',
              label: 'Date in Campaign World',
              required: true,
            },
            {
              type: 'relationship',
              name: 'location',
              relationTo: 'locations',
              hasMany: true,
            },
            {
              type: 'relationship',
              name: 'relatedNPCs',
              relationTo: 'npcs',
              hasMany: true,
            },
            // {
            //     type: "relationship",
            //     name: "relatedAdventures",
            //     relationTo: "adventures",
            //     hasMany: true,
            // }
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Session Notes',
      fields: [
        // {
        //     name: "playerNotes",
        //     type: "blocks",
        //     blocks: []
        // }
        {
          name: 'dmNotes',
          type: 'richText',
        },
      ],
    },
    {
      type: 'group',
      label: 'Session Outcomes',
      fields: [
        {
          name: 'outcomeNotes',
          type: 'array',
          fields: [
            {
              name: 'outcome',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
  ],
};
