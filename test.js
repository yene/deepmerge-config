let test = require('ava')
let fs = require('fs')


/*
 * using the deepmege package
*/

let merge = require('deepmerge')

function deepMerge(...sources) {
  return merge.all(sources)
}

function deepMergeReplace(...sources) {
  let overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
  return merge.all(sources, {arrayMerge: overwriteMerge})
}

test('test_arraymerge', t => {
  let original = JSON.parse(fs.readFileSync('test_arraymerge/original.json'))
  let patch1 = JSON.parse(fs.readFileSync('test_arraymerge/patch1.json'))
  let patch2 = JSON.parse(fs.readFileSync('test_arraymerge/patch2.json'))
  let patch3 = JSON.parse(fs.readFileSync('test_arraymerge/patch3.json'))
  let result = JSON.parse(fs.readFileSync('test_arraymerge/result.json'))
  let r = deepMerge(original, patch1, patch2, patch3)
  t.deepEqual(r, result)
});

test('test_arrayreplace', t => {
  let original = JSON.parse(fs.readFileSync('test_arrayreplace/original.json'))
  let patch1 = JSON.parse(fs.readFileSync('test_arrayreplace/patch1.json'))
  let patch2 = JSON.parse(fs.readFileSync('test_arrayreplace/patch2.json'))
  let patch3 = JSON.parse(fs.readFileSync('test_arrayreplace/patch3.json'))
  let result = JSON.parse(fs.readFileSync('test_arrayreplace/result.json'))
  let r = deepMergeReplace(original, patch1, patch2, patch3)
  t.deepEqual(r, result)
});

/*
 * from https://stackoverflow.com/a/49798508/279890
*/

function so_deepMerge(...sources) {
  let acc = {}
  for (const source of sources) {
    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = []
      }
      acc = [...acc, ...source]
    } else if (source instanceof Object) {
      for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object && key in acc) {
          value = deepMerge(acc[key], value)
        }
        acc = { ...acc, [key]: value }
      }
    }
  }
  return acc
}

function so_deepMergeReplace(...sources) {
  let acc = {}
  for (const source of sources) {
    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = []
      }
      acc = source
    } else if (source instanceof Object) {
      for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object && key in acc) {
          value = deepMergeReplace(acc[key], value)
        }
        acc = { ...acc, [key]: value }
      }
    }
  }
  return acc
}

test('test_so_arraymerge', t => {
  let original = JSON.parse(fs.readFileSync('test_arraymerge/original.json'))
  let patch1 = JSON.parse(fs.readFileSync('test_arraymerge/patch1.json'))
  let patch2 = JSON.parse(fs.readFileSync('test_arraymerge/patch2.json'))
  let patch3 = JSON.parse(fs.readFileSync('test_arraymerge/patch3.json'))
  let result = JSON.parse(fs.readFileSync('test_arraymerge/result.json'))
  let r = so_deepMerge(original, patch1, patch2, patch3)
  t.deepEqual(r, result)
});

test('test_so_arrayreplace', t => {
  let original = JSON.parse(fs.readFileSync('test_arrayreplace/original.json'))
  let patch1 = JSON.parse(fs.readFileSync('test_arrayreplace/patch1.json'))
  let patch2 = JSON.parse(fs.readFileSync('test_arrayreplace/patch2.json'))
  let patch3 = JSON.parse(fs.readFileSync('test_arrayreplace/patch3.json'))
  let result = JSON.parse(fs.readFileSync('test_arrayreplace/result.json'))
  let r = so_deepMergeReplace(original, patch1, patch2, patch3)
  t.deepEqual(r, result)
});
