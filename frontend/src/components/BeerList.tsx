import { useQuery } from "@tanstack/react-query"
import { Beer } from "./Beer.tsx"
import type { BeerProps } from "./Beer.tsx"

export const BeerList = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["beers"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8000/beers")
			return await res.json() as BeerProps[]
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
      <ul>
        {data.map((beer) => (
          <li key={beer.beerName}>
            <Beer {...beer} />
          </li>
        ))}
      </ul>
		</div>
	)
}
