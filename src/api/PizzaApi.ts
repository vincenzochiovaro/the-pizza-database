
export async function FetchPizzasByFilter(_filter: string) {

    try
    {
        const url = `${import.meta.env.VITE_API_URL}?filter=${_filter}`
        
            const response = await fetch(url, {
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        })
        const data = await response.json()
	       return data;
    }
    catch(error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default  FetchPizzasByFilter
