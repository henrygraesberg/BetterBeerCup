// Playground file, just for me to play around with the jsons and see
// Called it biergarted because biergartens are like adult beer playgorunds

import { wipeAndWriteToFile } from './utils/filehandling.ts'
import winningBeers from '../../data/winning-beers.json' with { type: 'json' }

const pilsners = winningBeers.filter((beer) => {
  return beer.category.toLowerCase().includes('pilsener')
})

wipeAndWriteToFile(pilsners, '../data/winning-pilsners.json')
