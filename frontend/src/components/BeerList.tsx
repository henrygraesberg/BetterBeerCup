import { useQuery } from "@tanstack/react-query"
import { Beer } from "./Beer.tsx"
import { PageNav } from "./Pagenav.tsx"
import { Searchbar } from "./Searchbar.tsx"
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
      <PageNav
        searchParams={props}
        page={data.page}
        lastPage={data.lastPage}
      />

      <Searchbar
        placeholder="Search by name"
        value={props.nameSearch}
        onChange={(_value) => {
          setTimeout(() => window.location.reload(), 5)
        }}
      />
      <Searchbar
        placeholder="Search by style"
        value={props.styleSearch}
        onChange={(_value) => {
          setTimeout(() => window.location.reload(), 5)
        }}
      />

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
