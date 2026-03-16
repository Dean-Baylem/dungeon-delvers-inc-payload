import { getPayload } from 'payload';
import { cookies } from 'next/headers';
import config from '@payload-config';

export default async function isLoggedIn() {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({
    headers: new Headers({ cookie: (await cookies()).toString() }),
  });

  return user;
}
