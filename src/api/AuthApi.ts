export async function AuthenticateWithGoogle(idToken: string): Promise<{ email: string }> {
    const url = `${import.meta.env.VITE_API_URL}api/auth/google`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({ idToken })
    });

    if (!response.ok) {
        throw new Error('invalid');
    }

    return response.json();
}
