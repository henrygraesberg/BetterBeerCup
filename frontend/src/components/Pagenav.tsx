import { Link } from "@tanstack/react-router"
import type { BeerListProps } from "../BeerList.tsx"
import type { FC } from "react"

export type PaginationProps = {
  searchParams: BeerListProps
  page: number
  lastPage: number
}

export const PageNav: FC<PaginationProps> = (props) => {
  return (
    <div>
      <button type="button" onClick={() => setTimeout(() => window.location.reload(), 5)}>
        <Link to="/" disabled={props.page <= 1} search={{ ...props.searchParams, page: props.page - 1 }}>
          &lt;
        </Link>
      </button>

	    {props.page} of {props.lastPage}

      <button type="button" onClick={() => setTimeout(() => window.location.reload(), 5)}>
        <Link to="/" disabled={props.page >= props.lastPage} search={{ ...props.searchParams, page: props.page + 1 }}>
          &gt;
        </Link>
      </button>
    </div>
  )
}
