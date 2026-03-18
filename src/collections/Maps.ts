import { type CollectionConfig } from 'payload';

export const Maps: CollectionConfig = {
  slug: 'maps',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      label: 'Map Name',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'hidden',
          type: 'checkbox',
          label: 'Publically Visible?',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'isWorldMap',
          type: 'checkbox',
          label: 'World Map?',
          defaultValue: false,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            width: '60%',
          },
        },
        {
          name: 'relatedLocation',
          type: 'relationship',
          relationTo: 'locations',
          hasMany: false,
          admin: {
            width: '100%',
            condition: (_, siblingData) => !siblingData.isWorldMap,
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
};
