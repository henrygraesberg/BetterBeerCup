import { createFileRoute } from "@tanstack/react-router";
import { BeerList } from "../components/BeerList.tsx";
import type { BeerListProps } from "../components/BeerList.tsx";

export const Route = createFileRoute("/")({
	component: App,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
      perPage: Number(search?.perPage ?? 50)
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
