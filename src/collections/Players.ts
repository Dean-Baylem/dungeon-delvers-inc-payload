import type { CollectionConfig } from 'payload';

export const Players: CollectionConfig = {
  slug: 'players',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: true,
    maxLoginAttempts: 3,
    lockTime: 60 * 60 * 1000,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'username',
      unique: true,
      type: 'text',
      required: true,
    },
  ],
};
