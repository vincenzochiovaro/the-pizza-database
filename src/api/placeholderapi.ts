
export async function fetchFoo() {

    try
    {
     const response = await fetch(import.meta.env.VITE_API_URL, {
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        })
        const data = await response.text()
	return data;
    }
    catch(error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default fetchFoo
