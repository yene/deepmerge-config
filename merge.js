let merge = require('deepmerge')

function deepMerge(...sources) {
  let overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
  return merge.all(sources, {arrayMerge: overwriteMerge})
}

let configA = JSON.parse(fs.readFileSync('configA.json'))
let configB = JSON.parse(fs.readFileSync('configB.json'))
let config = deepMerge(configA, configB)
