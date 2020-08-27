const ExpressError = require("./expressError");

function numArr(str) {
    const arr = str.split(",");
    const nums = arr.map((s) => Number(s));
    for (let num of nums) {
        if (isNaN(num)) {
            throw new ExpressError("A value was entered that was not a number", 400);
        }
    }
    return nums;
}

function findAvg(str) {
    const nums = numArr(str);
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    return avg;
}

function findMedian(str) {
    const nums = numArr(str);
    const mid = Math.floor(nums.length / 2);
    const sorted = nums.sort((a, b) => a - b);
    const median = nums.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    return median;
}

function freqCounter(str) {
    const nums = numArr(str);
    let counts = {};
    nums.forEach(function(e) {
        if (counts[e] === undefined) {
            counts[e] = 0;
        }
        counts[e] += 1;
    });
    return counts;
}

function findMode(str) {
    const numFreq = freqCounter(str);
    let max = 0;
    let mostFreq;
    for (let key in numFreq) {
        if (numFreq[key] > max) {
            mostFreq = key;
            max = numFreq[key];
        }
    }
    return Number(mostFreq);
}
module.exports = { findAvg, findMedian, findMode };