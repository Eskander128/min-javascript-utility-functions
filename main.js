// 1. customMap
export function customMap(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = callback(arr[i], i, arr);
    }
    return result;
}

// 2. customFilter
export function customFilter(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result[result.length] = arr[i];
        }
    }
    return result;
}

// 3. customReduce
export function customReduce(arr, callback, initialValue) {
    let hasInitial = initialValue !== undefined;
    let acc = hasInitial ? initialValue : arr[0];
    let startIndex = hasInitial ? 0 : 1;

    for (let i = startIndex; i < arr.length; i++) {
        acc = callback(acc, arr[i], i, arr);
    }
    return acc;
}

// 4. groupBy
export function groupBy(arr, key) {
    let result = {};
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let groupVal = typeof key === 'function' ? key(item) : item[key];
        
        if (!result[groupVal]) {
            result[groupVal] = [];
        }
        result[groupVal][result[groupVal].length] = item;
    }
    return result;
}

// 5. deepClone
export function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    let clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

// 6. once
export function once(fn) {
    let executed = false;
    let result;
    return function(...args) {
        if (!executed) {
            executed = true;
            result = fn(...args);
            return result;
        }
        return result;
    };
}

// 7. memoize
export function memoize(fn) {
    let cache = {};
    return function(...args) {
        let cacheKey = JSON.stringify(args);
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
        let result = fn(...args);
        cache[cacheKey] = result;
        return result;
    };
}

// 8. compose
export function compose(...funcs) {
    return function(initialValue) {
        let result = initialValue;
        for (let i = funcs.length - 1; i >= 0; i--) {
            result = funcs[i](result);
        }
        return result;
    };
}