import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Worlds } from './collections/Worlds';
import { Locations } from './collections/Locations';
import { Factions } from './collections/Factions';
import { NPCs } from './collections/NPCs';
import { Religions } from './collections/Religions';
import { Lore } from './collections/Lore';
import { Sessions } from './collections/Sessions';
import { Characters } from './collections/Characters';
import { Adventures } from './collections/Adventures';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Worlds,
    Locations,
    Factions,
    NPCs,
    Religions,
    Lore,
    Sessions,
    Characters,
    Adventures,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
