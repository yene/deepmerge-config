let test = require('ava')
let merge = require('deepmerge')
let fs = require('fs')

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
