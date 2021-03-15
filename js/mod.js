function delay(value, duration = 0) {
    return new Promise((resolve, reject)=>{
        setTimeout(async ()=>resolve(typeof value === "function" ? await value() : value)
        , duration);
    });
}
function* generateDelayingIterable(range, time) {
    let i = 0;
    while((i++) < 200){
        yield delay(getRandomIntSimpel(...range), time);
    }
}
function* getLoopingRange(from, to, time) {
    while(true){
        if (from < to) yield delay(++from, time);
        else yield delay(from = 0, time);
    }
}
function makeObserver(generatorFunction) {
    return function(...args) {
        const generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
function makeQueue(...callbacks) {
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
function queue(fn) {
    let lastPromise = Promise.resolve();
    return function(...args) {
        let returnedPromise = lastPromise.then(()=>fn(...args)
        );
        lastPromise = returnedPromise.catch(()=>{
        });
        return returnedPromise;
    };
}
const mod = function() {
    return {
        delay: delay,
        generateDelayingIterable: generateDelayingIterable,
        getLoopingRange: getLoopingRange,
        makeObserver: makeObserver,
        makeQueue: makeQueue,
        queue: queue
    };
}();
class Dragon {
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
        return delay(this.getRandom(), 500);
    }
}
const mod1 = function() {
    return {
        Dragon: Dragon
    };
}();
function slog(obj) {
    Object.entries(obj).forEach(([key, value])=>console.log(key + ":", value)
    );
}
function pp(...objects) {
    function printPrettyObject(object) {
        return typeof object !== "object" ? console.log(object) : Object.entries(object).forEach(([key, value])=>globalThis.Deno ? console.log(`${key}: ${Deno.inspect(value)}`) : console.log(`${key}:`, value)
        );
    }
    return objects.forEach(printPrettyObject);
}
function add(fn, logger = console.log) {
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
function time(name, action) {
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
slog.pp = pp;
slog.add = add;
slog.time = time;
const log = slog;
const mod2 = function() {
    return {
        log: log
    };
}();
function importMetaResolve(modulePath, filePath) {
    return new URL(filePath, modulePath).pathname;
}
function createUrlFromRequest(req, proto = "http") {
    return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}
const mod3 = function() {
    return {
        importMetaResolve: importMetaResolve,
        createUrlFromRequest: createUrlFromRequest
    };
}();
function concatTypedArrays(a, b) {
    const c = new a.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}
function concatBytes(a, ...bytes) {
    const b = new a.constructor(bytes);
    return concatTypedArrays(a, b);
}
function areEqual(a, b) {
    if (a.byteLength !== b.byteLength) return false;
    return a.every((el, i)=>el === b[i]
    );
}
const mod4 = function() {
    return {
        concatTypedArrays: concatTypedArrays,
        concatBytes: concatBytes,
        areEqual: areEqual
    };
}();
function makeArray(...arg) {
    return [].concat(...arg);
}
function throwError(mssg) {
    throw new Error(mssg);
}
function pipe(...fns) {
    const _pipe = (accumulator, currentValue)=>(...arg)=>currentValue(accumulator(...arg))
    ;
    return fns.reduce(_pipe);
}
function memoize(f) {
    const cache = {
    };
    return (...args)=>{
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
    };
}
function getRandomInt(min, max) {
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range) {
        return getRandomInt(min, max);
    }
    return min + byteArray[0] % range;
}
function getRandomIntSimpel(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomItem(array) {
    return array[Math.floor(array.length * Math.random())];
}
function generateId(size) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for(var str = "", i = 0; i < size; i += 1){
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function valoo(v = null, ...cb) {
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
function stringifyKeysInOrder(data) {
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
function getWordCnt(text) {
    return Object.entries(text.toLowerCase().split(/\W+/).filter((line)=>!!line
    ).reduce((acc, el)=>{
        acc[el] = acc[el] + 1 || 1;
        return acc;
    }, {
    }));
}
const mod5 = function() {
    return {
        makeArray: makeArray,
        throwError: throwError,
        pipe: pipe,
        memoize: memoize,
        getRandomInt: getRandomInt,
        getRandomIntSimpel: getRandomIntSimpel,
        getRandomItem: getRandomItem,
        generateId: generateId,
        valoo: valoo,
        stringifyKeysInOrder: stringifyKeysInOrder,
        getWordCnt: getWordCnt
    };
}();
export { mod as async };
export { mod1 as dragons };
export { mod2 as logging };
export { mod3 as pathsAndUrls };
export { mod4 as typedArray };
export { mod5 as tools };

