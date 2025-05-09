import { useQuery } from "@tanstack/react-query"

export const BeerList = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["beers"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8000/beers")
			return res.json()
		}
	})

	if (isPending) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h1>Beer list</h1>
				<pre>
					{JSON.stringify(data, null, 2)}
				</pre>
		</div>
	)
}