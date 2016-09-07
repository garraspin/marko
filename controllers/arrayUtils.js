var arrayUtils = {
    findOne : (haystack, arr) => arr.some(v => haystack.indexOf(v) >= 0),
    findOneIndex : (haystack, arr) => haystack.findIndex(v => arr.indexOf(v) >= 0),
    findAll : (haystack, arr) => arr.every(v => haystack.indexOf(v) >= 0)
}

// console.log(findAll(["hello","how","are","you"], ["how", "are", "you"]))

module.exports = arrayUtils;