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

    const yearFilter = url.searchParams.get("year")
    const medalFilter = url.searchParams.get("medal")
    const styleSearch = url.searchParams.get("style")
    const nameSearch = url.searchParams.get("search")

    let filteredBeers = winningBeers

    if (yearFilter) {
      filteredBeers = filteredBeers.filter((beer) => beer.year === yearFilter)
    }
    if (medalFilter) {
      filteredBeers = filteredBeers.filter((beer) => beer.medal === medalFilter)
    }
    if (styleSearch) {
      filteredBeers = filteredBeers.filter((beer) => beer.category.toLowerCase().includes(styleSearch.toLowerCase()))
    }
    if (nameSearch) {
      filteredBeers = filteredBeers.filter((beer) => beer.beerName.toLowerCase().includes(nameSearch.toLowerCase()))
    }

		let start = (page - 1) * perPage
		let end = start + perPage

		if (end > winningBeers.length) {
			end = winningBeers.length
			start = end - perPage > start ? start : end - perPage
		}

		const paginatedBeers = filteredBeers.slice(start, end)

		return new Response(JSON.stringify(paginatedBeers), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000",
				"x-bbeer-pages": Math.ceil(filteredBeers.length / perPage).toString(),
				"x-bbeer-page": page.toString(),
			},
		});
	}

	return new Response(null, { status: 404 });
})
