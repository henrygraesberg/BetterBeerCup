import * as fs from 'node:fs'

export const appendToFile = (object, filename) => {
  const json = JSON.stringify(object, null, 2)
  fs.writeFile(filename, json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Data written to file')
  })
}

export const wipeAndWriteToFile = (object, filename) => {
  try {
    fs.unlinkSync(filename, (err) => {
      if (err) {
        throw err
      }
    })
  }
  catch (err) {
    console.error('Error deleting file:', err)
  }

  appendToFile(object, filename)
}
