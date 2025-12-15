
export async function FetchPizzasByFilter(filter: string) {

    try
    {
        console.log("Fetching pizzas with filter:", filter);
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
