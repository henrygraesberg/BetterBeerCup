import winningBeers from "../data/winning-beers.json" with { type: "json" };

// TODO: configure max and min page size
// TODO: configure max and min page number
// TODO:   - Send last/first page if page number is out of bounds

Deno.serve((req) => {
	const url = new URL(req.url);
	const path = url.pathname;

	if (path === "/beers") {
		const page = parseInt(url.searchParams.get("page") || "1")
		const perPage = parseInt(url.searchParams.get("perPage") || "50")

		const start = (page - 1) * perPage
		const end = start + perPage

		const paginatedBeers = winningBeers.slice(start, end)

		return new Response(JSON.stringify(paginatedBeers), {
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response("Not Found", { status: 404 });
})
