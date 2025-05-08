import { wipeAndWriteToFile } from './filehandling.ts'
import winningBeers from './winning-beers.json' assert { type: 'json' }

const pilsners = winningBeers.filter((beer) => {
  return beer.category.toLowerCase().includes('pilsener')
})

wipeAndWriteToFile(pilsners, 'winning-pilsners.json')
