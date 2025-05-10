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

export const BeerList: FC<BeerListProps> = ({ page, perPage, yearFilter, medalFilter, styleSearch, nameSearch }) => {
	const { isPending, error, data } = useQuery({
		queryKey: ["beers"],
		queryFn: async () => {
			const res = await fetch(`http://localhost:8000/beers?${page ? `page=${page}` : ""}${perPage ? `&perPage${perPage}` : ""}${yearFilter ?`&year=${yearFilter}` : ""}${medalFilter ? `&medal=${medalFilter}` : ""}${styleSearch ? `&style=${styleSearch}` : ""}${nameSearch ? `&search=${nameSearch}` : ""}`)

      //! Error: Headers are missing from response.headers
      res.headers.forEach((header, name) => console.log(name, header))
      console.log(res.headers.get("x-bbeer-page"))
      console.log(res.headers.get("x-bbeer-pages"))

			return {
        beers: await res.json() as BeerProps[],
        page: res.headers.get("x-bbeer-page"),
        lastPage: res.headers.get("x-bbeer-pages")
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
      <button type="button">
        <Link to={`?page=${Number(data.page) - 1}&perPage=${perPage}`} disabled={Number(data.page) <= 1}>
          &lt;
        </Link>
      </button>

      {data.page} of {data.lastPage}

      <button type="button">
        <Link to={`?page=${Number(data.page) + 1}&perPage=${perPage}`} disabled={Number(data.page) >= Number(data.lastPage)}>
          &gt;
        </Link>
      </button>

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
