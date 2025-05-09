import { useQuery } from "@tanstack/react-query"
import { Beer } from "./Beer.tsx"
import type { BeerProps } from "./Beer.tsx"
import type { FC } from "react";

export type BeerListProps = {
  page: number
  perPage: number
}

export const BeerList: FC<BeerListProps> = ({ page, perPage }) => {
	const { isPending, error, data } = useQuery({
		queryKey: ["beers"],
		queryFn: async () => {
			const res = await fetch(`http://localhost:8000/beers?page=${page}&perPage=${perPage}`)
			return {
        beers: await res.json() as BeerProps[],
        page: res.headers.get("bbeer-page"),
        lastPage: res.headers.get("bbeer-pages")
      }
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
        {data.beers.map((beer) => (
          <li key={beer.beerName}>
            <Beer {...beer} />
          </li>
        ))}
      </ul>

		</div>
	)
}
