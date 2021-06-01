function* delayingIterable1(range, time) {
    let i = 0;
    while((i++) < 200){
        yield delay(getRandomIntSimpel(...range), time);
    }
}
function* loopingRange1(from, to, time) {
    while(true){
        if (from < to) yield delay(++from, time);
        else yield delay(from = 0, time);
    }
}
function makeObserver1(generatorFunction) {
    return function(...args) {
        const generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
function makeQueue1(...callbacks) {
    async function* makeGenerator(callbacks1) {
        while(true){
            const request = yield;
            for (const callback of callbacks1){
                await callback(request);
            }
        }
    }
    const generatorObject = makeGenerator(callbacks);
    generatorObject.next();
    return generatorObject;
}
function queue1(fn) {
    let lastPromise = Promise.resolve();
    return function(...args) {
        let returnedPromise = lastPromise.then(()=>fn(...args)
        );
        lastPromise = returnedPromise.catch(()=>{
        });
        return returnedPromise;
    };
}
export { delayingIterable1 as delayingIterable };
export { loopingRange1 as loopingRange };
export { makeObserver1 as makeObserver };
export { makeQueue1 as makeQueue };
export { queue1 as queue };
function delay1(value, duration = 0) {
    return new Promise((resolve, reject)=>{
        setTimeout(async ()=>resolve(typeof value === "function" ? await value() : value)
        , duration);
    });
}
function alwaysArray1(...arg) {
    return [].concat(...arg);
}
function throwError1(msg) {
    throw new Error(msg);
}
function pipe1(...fns) {
    const _pipe = (accumulator, currentValue)=>(...arg)=>currentValue(accumulator(...arg))
    ;
    return fns.reduce(_pipe);
}
function memoize1(f) {
    const cache = {
    };
    return (...args)=>{
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
    };
}
function getRandomInt1(min, max) {
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range) {
        return getRandomInt1(min, max);
    }
    return min + byteArray[0] % range;
}
function getRandom1(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomItem1(array) {
    return array[Math.floor(array.length * Math.random())];
}
function generateId1(size) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for(var str = "", i = 0; i < size; i += 1){
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function valoo1(v, ...cb) {
    function value(n) {
        if (arguments.length) {
            v = n;
            cb.map((f)=>f && f(v)
            );
        }
        return v;
    }
    value.on = (c)=>{
        const i = cb.push(c) - 1;
        return ()=>cb[i] = null
        ;
    };
    return value;
}
function stringifyKeysInOrder1(data) {
    function recursivelyOrderKeys(unordered) {
        if (Array.isArray(unordered)) {
            unordered.forEach(function(item, index) {
                unordered[index] = recursivelyOrderKeys(item);
            });
            return unordered;
        }
        if (typeof unordered === "object") {
            const ordered = {
            };
            Object.keys(unordered).sort().forEach(function(key) {
                ordered[key] = recursivelyOrderKeys(unordered[key]);
            });
            return ordered;
        }
        return unordered;
    }
    return JSON.stringify(recursivelyOrderKeys(data), null, 2);
}
function getWordCnt1(text) {
    return Object.entries(text.toLowerCase().split(/\W+/).filter((line)=>!!line
    ).reduce((acc, el)=>{
        acc[el] = acc[el] + 1 || 1;
        return acc;
    }, {
    }));
}
export { delay1 as delay };
export { alwaysArray1 as alwaysArray };
export { throwError1 as throwError };
export { pipe1 as pipe };
export { memoize1 as memoize };
export { getRandomInt1 as getRandomInt };
export { getRandom1 as getRandom };
export { getRandomItem1 as getRandomItem };
export { generateId1 as generateId };
export { valoo1 as valoo };
export { stringifyKeysInOrder1 as stringifyKeysInOrder };
export { getWordCnt1 as getWordCnt };
class Dragon1 {
    fireDragons = [
        "Blaze",
        "Heat",
        "Inferno",
        "Nova",
        "Ember",
        "Flare",
        "Pyro",
        "Lumi",
        "Scorch",
        "Burnie",
        "Tinder",
        "Igny", 
    ];
    iceDragons = [
        "Ice",
        "Frost",
        "Crystal",
        "Glacier",
        "Iceberg",
        "Hailstone",
        "Haily",
        "Freeze", 
    ];
    lightningDragons = [
        "Bolt",
        "Electron",
        "Sparky",
        "Volt",
        "Thunder"
    ];
    all = [
        ...this.fireDragons,
        ...this.iceDragons,
        ...this.lightningDragons, 
    ];
    getRandom() {
        return this.all[Math.floor(this.all.length * Math.random())];
    }
    getRandomDelayed() {
        return delay1(this.getRandom(), 500);
    }
}
export { Dragon1 as Dragon };
function slog1(obj) {
    Object.entries(obj).forEach(([key, value])=>console.log(key + ":", value)
    );
}
function pp1(...objects) {
    function printPrettyObject(object) {
        return typeof object !== "object" ? console.log(object) : Object.entries(object).forEach(([key, value])=>globalThis.Deno ? console.log(`${key}: ${Deno.inspect(value)}`) : console.log(`${key}:`, value)
        );
    }
    return objects.forEach(printPrettyObject);
}
function add1(fn, logger = console.log) {
    return (...args)=>{
        logger(`entering ${fn.name}: ${args}`);
        try {
            const valueToReturn = fn(...args);
            logger(`exiting ${fn.name}: ${valueToReturn}`);
            return valueToReturn;
        } catch (thrownError) {
            logger(`exiting ${fn.name}: threw ${thrownError}`);
            throw thrownError;
        }
    };
}
function time1(name, action) {
    let start = Date.now();
    const result = action();
    if (result && "then" in result && typeof result.then === "function") {
        return result.then((r)=>{
            const time1 = Date.now() - start;
            console.log(name, "took", time1, "ms");
            return time1;
        });
    }
    const time1 = Date.now() - start;
    console.log(name, "took", time1, "ms");
    return time1;
}
const log1 = slog1;
log1.pp = pp1;
log1.add = add1;
log1.time = time1;
export { slog1 as slog };
export { pp1 as pp };
export { add1 as add };
export { time1 as time };
export { log1 as log };
function importMetaResolve1(modulePath, filePath) {
    return new URL(filePath, modulePath).pathname;
}
function createUrlFromRequest1(req, proto = "http") {
    return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}
export { importMetaResolve1 as importMetaResolve };
export { createUrlFromRequest1 as createUrlFromRequest };
function concatTypedArrays1(a, b) {
    const c = new a.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}
function concatBytes1(a, ...bytes) {
    const b = new a.constructor(bytes);
    return concatTypedArrays1(a, b);
}
function areEqual1(a, b) {
    if (a.byteLength !== b.byteLength) return false;
    return a.every((el, i)=>el === b[i]
    );
}
export { concatTypedArrays1 as concatTypedArrays };
export { concatBytes1 as concatBytes };
export { areEqual1 as areEqual };

