export async function authCheck(collection: string) {
    const res = await fetch(`/api/${collection}/me`, {
        credentials: 'include'
    });

    if (!res.ok) {
        return false;
    }

    const data = await res.json();
    
    if (data.user === null) {
        return false;
    }
    
    return {
        id: data.user.id,
        email: data.user.email,
        collection: collection,
        token: data.token
    };
    
}