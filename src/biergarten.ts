import { wipeAndWriteToFile } from './utils/filehandling.ts'
import winningBeers from '../data/winning-beers.json' with { type: 'json' }

const pilsners = winningBeers.filter((beer) => {
  return beer.category.toLowerCase().includes('pilsener')
})

wipeAndWriteToFile(pilsners, '../data/winning-pilsners.json')
