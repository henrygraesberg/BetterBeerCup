import type { FC } from "react"

export type BeerProps = {
    year: number
    medal: string
    category: string
    breweryName: string
    beerName: string
    country: string
    city: string
    state: string
    medalSort: string
}

export const Beer: FC<BeerProps>  = (props) => {
  return (
    <div className="flex flex-col gap-2 p-4 border-b border-gray-200">
      <div className="flex gap-[1ch] items-baseline">
        <div className="text-md font-bold">{props.beerName}</div>
        <div className="text-sm text-gray-500">by <span className="font-bold">{props.breweryName}</span></div>
      </div>
      <div className="text-sm text-gray-500">{props.city}, {props.state}{props.state ?  "," : ""} {props.country}</div>
      <div className="text-sm text-gray-500">{props.category}</div>
      <div className="text-sm text-gray-500">{props.year} - {props.medal}</div>
    </div>
  )
}
