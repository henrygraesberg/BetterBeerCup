import * as fs from 'node:fs'

// deno-lint-ignore no-explicit-any
export const appendToFile= (object: any, filename: string) => {
  const json = JSON.stringify(object, null, 2)
  fs.writeFile(filename, json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Data written to file')
  })
}

// deno-lint-ignore no-explicit-any
export const wipeAndWriteToFile = (object: any, filename: string) => {
  try {
    fs.unlinkSync(filename)
  }
  catch (err) {
    console.error('Error deleting file:', err)
  }

  appendToFile(object, filename)
}
