import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Beer } from "./Beer.tsx"
import type { BeerProps } from "./Beer.tsx"
import type { FC } from "react";

export type BeerListProps = {
  page: number
  perPage: number
  yearFilter?: number
  medalFilter?: string
  styleSearch?: string
  nameSearch?: string
}

const fetchParams = (host: string, props: BeerListProps) => {
  const { page, perPage, yearFilter, medalFilter, styleSearch, nameSearch } = props
  return `${host}?${page ? `page=${page}` : ""}${perPage ? `&perPage${perPage}` : ""}${yearFilter ?`&year=${yearFilter}` : ""}${medalFilter ? `&medal=${medalFilter}` : ""}${styleSearch ? `&style=${styleSearch}` : ""}${nameSearch ? `&search=${nameSearch}` : ""}`
}

export const BeerList: FC<BeerListProps> = (props) => {
  const apiEndpoint = "http://localhost:8000/beers"

	const { isPending, error, data } = useQuery({
		queryKey: ["beers"],
		queryFn: async () => {
			const res = await fetch(fetchParams(apiEndpoint, props))

			return {
        beers: await res.json() as BeerProps[],
        page: Number(res.headers.get("x-bbeer-page")),
        lastPage: Number(res.headers.get("x-bbeer-pages"))
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
      <button type="button" onClick={() => setTimeout(() => window.location.reload(), 5)}>
        <Link to="/" disabled={Number(data.page) <= 1} search={{ ...props, page: data.page - 1 }}>
          &lt;
        </Link>
      </button>

      {data.page} of {data.lastPage}

      <button type="button" onClick={() => setTimeout(() => window.location.reload(), 5)}>
        <Link to="/" disabled={Number(data.page) >= Number(data.lastPage)} search={{ ...props, page: data.page + 1 }}>
          &gt;
        </Link>
      </button>

      <ul>
        {data.beers.map((beer) => (
          <li key={beer.breweryName + beer.beerName}>
            <Beer {...beer} />
          </li>
        ))}
      </ul>
		</div>
	)
}
