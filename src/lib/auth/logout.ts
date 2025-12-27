export async function logoutUser(collection: string) {
    const res = await fetch(`api/${collection}/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('Logout failed');
    }

    return true;
}