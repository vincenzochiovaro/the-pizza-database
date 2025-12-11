
export async function FetchPizzasByFilter(filter: string) {

    try
    {
        const data = ["test"]
	    return data;
    }
    catch(error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default  FetchPizzasByFilter
