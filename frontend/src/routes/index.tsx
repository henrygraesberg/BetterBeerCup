import { createFileRoute } from "@tanstack/react-router";
import { BeerList } from "../components/BeerList.tsx";
import type { BeerListProps } from "../components/BeerList.tsx";

export const Route = createFileRoute("/")({
	component: App,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: search.page ? Number(search.page) : undefined,
      perPage: search.perPage ? Number(search?.perPage ?? 50) : undefined,
      yearFilter: search.yearFilter ? Number(search.yearFilter) : undefined,
      medalFilter: search.medalFilter ? String(search.medalFilter) : undefined,
      styleSearch: search.styleSearch ? String(search.styleSearch) : undefined,
      nameSearch: search.nameSearch ? String(search.nameSearch) : undefined
    } as BeerListProps
  }
});

function App() {
  const searchParams = Route.useSearch();

	return (
		<div>
			<BeerList {...searchParams} />
		</div>
	);
}
