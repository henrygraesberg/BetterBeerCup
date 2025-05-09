import winningBeers from "../data/winning-beers.json" with { type: "json" };

Deno.serve((req) => {
	const url = new URL(req.url);
	const path = url.pathname;

	if (path === "/beers") {
		let page = parseInt(url.searchParams.get("page") || "1")
		const perPage = parseInt(url.searchParams.get("perPage") || "50")

		if (isNaN(page) || isNaN(perPage)) {
			return new Response("Invalid page or perPage parameter", { status: 400 });
		}

		if (page < 1) {
			page = 1
		}

		let start = (page - 1) * perPage
		let end = start + perPage

		if (end > winningBeers.length) {
			end = winningBeers.length
			start = end - perPage < start ? start : end - perPage
		}

		const paginatedBeers = winningBeers.slice(start, end)

		return new Response(JSON.stringify(paginatedBeers), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000",
				"bbeer-pages": Math.ceil(winningBeers.length / perPage).toString(),
				"bbeer-page": page.toString(),
			},
		});
	}

	return new Response(null, { status: 404 });
})
