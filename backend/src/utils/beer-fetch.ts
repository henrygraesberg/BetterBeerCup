import { wipeAndWriteToFile } from './filehandling.ts'

const fetchWinners = async (year: number) => {
  return await fetch(
  /*
    Replace with fetch from https://www.worldbeercup.org/winners/award-winners/
    HTTP request is called "admin.ajax.php"
    Replace body with "body": `_year=${year}&_fulltext=&action=search-winners`
  */)
}

const getAllWinners = async () => {
  const competitionYears = [1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2022, 2023, 2024, 2025].reverse()

  let winningBeers: object[] = []

  for(let i = 0; i < competitionYears.length; i++) {
    const year = competitionYears[i]
    const response = await fetchWinners(year)
    const beers = (await response.json()).data.winnersJSON
    winningBeers = [...winningBeers, ...beers]
  }

  return winningBeers
}

wipeAndWriteToFile(await getAllWinners(), '../../data/winning-beers.json')
