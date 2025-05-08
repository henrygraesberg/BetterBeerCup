import { wipeAndWriteToFile } from './filehandling.ts'

const fetchWinners = async (year) => {
  return await fetch("https://www.worldbeercup.org/wp-admin/admin-ajax.php", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,no;q=0.6,nn;q=0.5",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "OptanonAlertBoxClosed=2025-05-08T15:26:26.423Z; pop-in=closed; OptanonConsent=isGpcEnabled=0&datestamp=Thu+May+08+2025+17%3A43%3A11+GMT%2B0200+(Central+European+Summer+Time)&version=202409.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0003%3A0%2CC0004%3A0%2CC0002%3A0%2CC0001%3A1&geolocation=NO%3B50&AwaitingReconsent=false",
      "Referer": "https://www.worldbeercup.org/winners/award-winners/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `_year=${year}&_fulltext=&action=search-winners`,
    "method": "POST"
  })
}

const getAllWinners = async () => {
  const competitionYears = [1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2022, 2023, 2024]

  let winningBeers = []

  for(let i = 0; i < competitionYears.length; i++) {
    const year = competitionYears[i]
    const response = await fetchWinners(year)
    const beers = (await response.json()).data.winnersJSON
    winningBeers = [...winningBeers, ...beers]
  }

  return await winningBeers
}

wipeAndWriteToFile(await getAllWinners(), 'winning-beers.json')
