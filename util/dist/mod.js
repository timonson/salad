function delay1(value, duration = 0) {
    return new Promise((resolve, reject)=>{
        setTimeout(async ()=>resolve(typeof value === "function" ? await value() : value)
        , duration);
    });
}
function assertArray(...arg) {
    return [].concat(...arg);
}
function throwError(msg) {
    throw new Error(msg);
}
function pipe(...fns) {
    const _pipe = (accumulator, currentValue)=>(...arg)=>currentValue(accumulator(...arg))
    ;
    return fns.reduce(_pipe);
}
function memoize(f) {
    const cache = {};
    return (...args)=>{
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
    };
}
function generateId() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}
function generateIdOfSize(size) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for(var str = "", i = 0; i < size; i += 1){
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function getRandomInt(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomElement(array) {
    return array[Math.floor(array.length * Math.random())];
}
function getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function valoo(v, ...cb) {
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
            const ordered = {};
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
    }, {}));
}
export { delay1 as delay };
export { assertArray as assertArray };
export { throwError as throwError };
export { pipe as pipe };
export { memoize as memoize };
export { generateId as generateId };
export { generateIdOfSize as generateIdOfSize };
export { getRandomInt as getRandomInt };
export { getRandomElement as getRandomElement };
export { getRandomHexColor as getRandomHexColor };
export { valoo as valoo };
export { stringifyKeysInOrder as stringifyKeysInOrder };
export { getWordCnt as getWordCnt };
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
        return delay1(this.getRandom(), 500);
    }
}
export { Dragon as Dragon };
function* delayingIterable(range, time1) {
    let i = 0;
    while(i++ < 200){
        yield delay(getRandomIntSimpel(...range), time1);
    }
}
function* loopingRange(from, to, time2) {
    while(true){
        if (from < to) yield delay(++from, time2);
        else yield delay(from = 0, time2);
    }
}
function makeObserver(generatorFunction) {
    return function(...args) {
        const generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
function makeQueue(...callbacks1) {
    async function* makeGenerator(callbacks) {
        while(true){
            const request = yield;
            for (const callback of callbacks){
                await callback(request);
            }
        }
    }
    const generatorObject = makeGenerator(callbacks1);
    generatorObject.next();
    return generatorObject;
}
function queue(fn) {
    let lastPromise = Promise.resolve();
    return function(...args) {
        let returnedPromise = lastPromise.then(()=>fn(...args)
        );
        lastPromise = returnedPromise.catch(()=>{});
        return returnedPromise;
    };
}
export { delayingIterable as delayingIterable };
export { loopingRange as loopingRange };
export { makeObserver as makeObserver };
export { makeQueue as makeQueue };
export { queue as queue };
function takeN(iter, n) {
    const res = [];
    let count = 0;
    for(count = 0; count < n; count++){
        const ir = iter.next();
        if (ir.done) {
            break;
        }
        res.push(ir.value);
    }
    return [
        count,
        res
    ];
}
function iterate(f1, x1, n) {
    function* iterateGen(f, x) {
        while(true){
            yield x;
            x = f(x);
        }
    }
    if (n === undefined) {
        return iterateGen(f1, x1);
    } else {
        return takeN(iterateGen(f1, x1), n)[1];
    }
}
export { takeN as takeN };
export { iterate as iterate };
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
            const time2 = Date.now() - start;
            console.log(name, "took", time2, "ms");
            return time2;
        });
    }
    const time1 = Date.now() - start;
    console.log(name, "took", time1, "ms");
    return time1;
}
const log = slog;
log.pp = pp;
log.add = add;
log.time = time;
function getDateFormat() {
    const d = new Date().toISOString();
    const dateFmt = `[${d.slice(0, 10)} ${d.slice(11, 19)}]`;
    return dateFmt;
}
export { slog as slog };
export { pp as pp };
export { add as add };
export { time as time };
export { log as log };
export { getDateFormat as getDateFormat };
function importMetaResolve(filePath, moduleUrl) {
    return new URL(filePath, moduleUrl).pathname;
}
function importMetaResolveAndProtect(userSuppliedFilename, moduleUrl, rootSuffix) {
    if (typeof rootSuffix === "string" && (rootSuffix.trim().slice(-1) !== "/" || rootSuffix.trim()[0] === "/")) {
        throw new TypeError("Invalid 'rootSuffix'.");
    }
    if (userSuppliedFilename.indexOf("\0") !== -1) {
        throw new Error("Evil character in path.");
    }
    const rootDirectoryObj = new URL(rootSuffix ? rootSuffix : "./", moduleUrl);
    const path = new URL(userSuppliedFilename, rootDirectoryObj).pathname;
    if (!path.startsWith(rootDirectoryObj.pathname)) {
        throw new Error("Unallowed path reversal in path.");
    }
    return path;
}
function createUrlFromRequest(req, proto = "http") {
    return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}
function getFilename(filePath) {
    return filePath.split("/").pop();
}
function getExtension(fileName) {
    return fileName.split(".").pop();
}
function getDirname(path) {
    return path.slice(0, path.lastIndexOf("/"));
}
export { importMetaResolve as importMetaResolve };
export { importMetaResolveAndProtect as importMetaResolveAndProtect };
export { createUrlFromRequest as createUrlFromRequest };
export { getFilename as getFilename };
export { getExtension as getExtension };
export { getDirname as getDirname };
const env = typeof Deno !== "undefined" ? "deno" : typeof process !== "undefined" ? "node" : typeof document !== "undefined" ? "browser" : "unknown";
export { env as env };
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
export { concatTypedArrays as concatTypedArrays };
export { concatBytes as concatBytes };
export { areEqual as areEqual };

