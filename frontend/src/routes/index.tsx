import { createFileRoute } from "@tanstack/react-router";
import { BeerList } from "@/components/BeerList";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<BeerList />
		</div>
	);
}
