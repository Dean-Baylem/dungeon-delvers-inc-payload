export async function logoutUser(collection: string) {
  const res = await fetch(`/api/${collection}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  console.log('Collection: ' + collection);
  console.log('Logout response:', res);

  if (!res.ok) {
    throw new Error('Logout failed');
  }

  return true;
}
