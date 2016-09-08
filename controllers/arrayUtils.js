var arrayUtils = {
    findOne : (haystack, arr) => arr.some(v => haystack.indexOf(v) >= 0),
    findOneIndex : (haystack, arr) => haystack.findIndex(v => arr.indexOf(v) >= 0),
    findPatternIndex : (haystack, pattern) => haystack.findIndex(v => v.search(pattern) > -1),
    findAll : (haystack, arr) => arr.every(v => haystack.indexOf(v) >= 0),
    removeAll: (arr, toRemove) => toRemove.forEach(v => arr.splice(arr.indexOf(v), 1))
}

// console.log(findAll(["hello","how","are","you"], ["how", "are", "you"]))
// console.log(arrayUtils.findPatternIndex(["hello","how","are","you"], /\d+/));
// var x = ["one", "two", "three", "four"];
// arrayUtils.removeAll(x, ["three", "four", "one"]);
// console.log(x);


module.exports = arrayUtils;