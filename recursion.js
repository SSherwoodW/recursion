/** product: calculate the product of an array of numbers. */

function product(nums) {
    if (nums.length === 0) return 1;
    return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, longestYet = 0) {
    if (idx === words.length) return longestYet;
    longestYet = Math.max(words[idx].length, longestYet);
    return longest(words, idx + 1, longestYet);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, returnString = "") {
    if (idx >= str.length) return returnString;
    returnString += str[idx];
    return everyOther(str, idx + 2, returnString);
}

/** isPalindrome: checks whether a string is a palindrome or not.
 *
 */

function isPalindrome(str, idx = 0) {
    let leftIdx = idx;
    let rightIdx = str.length - idx - 1;
    if (leftIdx >= rightIdx) return true;
    if (str[leftIdx] !== str[rightIdx]) return false;
    return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
    if (idx === arr.length) return -1;
    if (arr[idx] === val) return idx;
    return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = str.length - 1, reverseStr = "") {
    if (idx < 0) return reverseStr;
    reverseStr += str[idx];
    return revString(str, idx - 1, reverseStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
    let strArray = [];
    for (let key in obj) {
        if (typeof obj[key] === "string") strArray.push(obj[key]);
        if (typeof obj[key] === "object")
            strArray.push(...gatherStrings(obj[key]));
    }
    return strArray;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, low = 0, high = arr.length - 1) {
    if (arr[high] === val) return high;
    if (arr[low] === val) return low;
    if (low >= high) return -1;

    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === val) return mid;
    if (arr[mid] > val) {
        return binarySearch(arr, val, 0, mid - 1);
    } else {
        return binarySearch(arr, val, mid + 1, arr.length - 1);
    }
}

module.exports = {
    product,
    longest,
    everyOther,
    isPalindrome,
    findIndex,
    revString,
    gatherStrings,
    binarySearch,
};
