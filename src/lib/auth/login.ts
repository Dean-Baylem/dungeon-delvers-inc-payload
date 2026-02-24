import { User } from '@/stores/auth-store';

export async function loginUser(
  credentials: { username: string; password: string },
  collection: string,
): Promise<User> {
  const res = await fetch(`/api/${collection}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const data = await res.json();

  return {
    id: data.user.id,
    email: data.user.email,
    collection: collection,
  };
}
