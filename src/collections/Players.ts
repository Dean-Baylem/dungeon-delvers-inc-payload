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
    create: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [],
};
