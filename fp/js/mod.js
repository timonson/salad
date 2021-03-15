function not(predicate) {
    return (x)=>!predicate(x)
    ;
}
function anyPass(predicates) {
    return (x)=>{
        for(let i_p = 0; i_p < predicates.length; i_p++){
            if (predicates[i_p](x)) {
                return true;
            }
        }
        return false;
    };
}
function allPass(predicates) {
    return (x)=>{
        for(let i_p = 0; i_p < predicates.length; i_p++){
            if (!predicates[i_p](x)) {
                return false;
            }
        }
        return true;
    };
}
function isBoolean(input) {
    return input === true || input === false;
}
function isNull(input) {
    return input === null;
}
function isUndefined(input) {
    return input === undefined;
}
function isString(input) {
    return typeof input === "string";
}
function isNumber(input) {
    return typeof input === "number";
}
function isTrue(input) {
    return input === true;
}
function isFalse(input) {
    return input === false;
}
function equals(b) {
    return (a)=>a === b
    ;
}
function isFunction(input) {
    return input === "function";
}
function isObjectWide(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function isObject(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function hasProperty(key, obj) {
    return key in obj;
}
function isObjectAndHasProp(key, obj) {
    return typeof obj === "object" && Array.isArray(obj) === false && obj !== null && key in obj;
}
function isEmail(value) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof value === "string" && regex.test(value.toLowerCase());
}
function isPresent(t) {
    return t !== undefined && t !== null;
}
function isDefined(t) {
    return t !== undefined;
}
function isFilled(t) {
    return t !== null;
}
function hasPresentKey(k) {
    return function(a) {
        return a[k] !== undefined && a[k] !== null;
    };
}
function hasValueAtKey(k, v) {
    return function(a) {
        return a[k] === v;
    };
}
const mod = function() {
    return {
        not: not,
        anyPass: anyPass,
        allPass: allPass,
        isBoolean: isBoolean,
        isNull: isNull,
        isUndefined: isUndefined,
        isString: isString,
        isNumber: isNumber,
        isTrue: isTrue,
        isFalse: isFalse,
        equals: equals,
        isFunction: isFunction,
        isObjectWide: isObjectWide,
        isObject: isObject,
        hasProperty: hasProperty,
        isObjectAndHasProp: isObjectAndHasProp,
        isEmail: isEmail,
        isPresent: isPresent,
        isDefined: isDefined,
        isFilled: isFilled,
        hasPresentKey: hasPresentKey,
        hasValueAtKey: hasValueAtKey
    };
}();
function isFunction1(input) {
    return typeof input === "function";
}
function apply(x) {
    return (f)=>f(x)
    ;
}
function applyTo(f) {
    return (x)=>f(x)
    ;
}
function applyPair([a, b]) {
    return (f)=>f(a)(b)
    ;
}
function applyPairTo(f) {
    return ([a, b])=>f(a)(b)
    ;
}
function compose(...fns) {
    return fns.reduceRight((prevFn, nextFn)=>(...args)=>nextFn(prevFn(...args))
    , (value)=>value
    );
}
function perform(f) {
    return (x)=>{
        f(x);
        return x;
    };
}
function identity(x) {
    return x;
}
function constant(x) {
    return ()=>x
    ;
}
function curry(fn) {
    const arity = fn.length;
    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);
        }
        return fn.call(null, ...args);
    };
}
const mod1 = function() {
    return {
        isFunction: isFunction1,
        apply: apply,
        applyTo: applyTo,
        applyPair: applyPair,
        applyPairTo: applyPairTo,
        compose: compose,
        perform: perform,
        identity: identity,
        constant: constant,
        curry: curry
    };
}();
function some(value) {
    return {
        value,
        kind: "Some"
    };
}
const None = {
    kind: "None"
};
function isSome(input) {
    return input.kind === "Some";
}
function isNone(input) {
    return input.kind === "None";
}
function mapOption(f) {
    return (opt)=>isSome(opt) ? some(f(opt.value)) : None
    ;
}
function chainOption(f) {
    return (opt)=>isSome(opt) ? f(opt.value) : None
    ;
}
function foldOption(ifSome) {
    return (ifNone)=>(opt)=>isSome(opt) ? isFunction1(ifSome) ? ifSome(opt.value) : ifSome : isFunction1(ifNone) ? ifNone() : ifNone
    ;
}
function invertOptions(options) {
    return options.reduce((acc, opt)=>chainOption((arr)=>mapOption((value)=>[
                    ...arr,
                    value
                ]
            )(opt)
        )(acc)
    , some([]));
}
function concatOptions(options) {
    return options.reduce((arr, opt)=>foldOption((value)=>arr.concat([
                value
            ])
        )(arr)(opt)
    , []);
}
function alternativeOption(functionOrOption) {
    return (opt)=>isSome(opt) ? opt : isFunction1(functionOrOption) ? functionOrOption() : functionOrOption
    ;
}
function alternativeValue(functionOrValue) {
    return (opt)=>foldOption((x)=>x
        )(isFunction1(functionOrValue) ? functionOrValue() : functionOrValue)(opt)
    ;
}
function maybeNull(nullable) {
    return nullable === null ? None : some(nullable);
}
function maybeUndefined(undefinable) {
    return undefinable === undefined ? None : some(undefinable);
}
function ifPresent(sideEffect) {
    return (opt)=>{
        if (isSome(opt)) {
            sideEffect(opt.value);
        }
    };
}
function ifAbsent(sideEffect) {
    return (opt)=>{
        if (isNone(opt)) {
            sideEffect();
        }
    };
}
const mod2 = function() {
    return {
        some: some,
        None: None,
        isSome: isSome,
        isNone: isNone,
        mapOption: mapOption,
        chainOption: chainOption,
        foldOption: foldOption,
        invertOptions: invertOptions,
        concatOptions: concatOptions,
        alternativeOption: alternativeOption,
        alternativeValue: alternativeValue,
        maybeNull: maybeNull,
        maybeUndefined: maybeUndefined,
        ifPresent: ifPresent,
        ifAbsent: ifAbsent
    };
}();
function success(value) {
    return {
        value,
        kind: "Success"
    };
}
function failure(error) {
    return {
        error,
        kind: "Failure"
    };
}
function isSuccess(result) {
    return result.kind === "Success";
}
function isFailure(result) {
    return result.kind === "Failure";
}
function mapResult(f) {
    return (result)=>isSuccess(result) ? success(f(result.value)) : result
    ;
}
function chainResult(f) {
    return (result)=>isSuccess(result) ? f(result.value) : failure(result.error)
    ;
}
function foldResult(ifSuccess) {
    return (ifFailure)=>(res)=>isSuccess(res) ? isFunction1(ifSuccess) ? ifSuccess(res.value) : ifSuccess : isFunction1(ifFailure) ? ifFailure(res.error) : ifFailure
    ;
}
function foldIfSuccessElseThrow(ifSuccess) {
    return (result)=>foldResult(ifSuccess)((e)=>{
            throw e;
        })(result)
    ;
}
function invertResults(results) {
    return results.reduce((acc, result)=>chainResult((arr)=>mapResult((value)=>arr.concat(value)
            )(result)
        )(acc)
    , success([]));
}
function ifSucceeded(sideEffect) {
    return (result)=>{
        if (isSuccess(result)) {
            sideEffect(result.value);
        }
    };
}
function ifFailed(sideEffect) {
    return (result)=>{
        if (isFailure(result)) {
            sideEffect(result.error);
        }
    };
}
const mod3 = function() {
    return {
        success: success,
        failure: failure,
        isSuccess: isSuccess,
        isFailure: isFailure,
        mapResult: mapResult,
        chainResult: chainResult,
        foldResult: foldResult,
        foldIfSuccessElseThrow: foldIfSuccessElseThrow,
        invertResults: invertResults,
        ifSucceeded: ifSucceeded,
        ifFailed: ifFailed
    };
}();
function safeProperty(key) {
    return (obj)=>obj.hasOwnProperty(key) ? some(obj[key]) : None
    ;
}
function safePropertyOf(obj) {
    return (key)=>safeProperty(key)(obj)
    ;
}
const mod4 = function() {
    return {
        safeProperty: safeProperty,
        safePropertyOf: safePropertyOf
    };
}();
function isSafe(...predicates) {
    return (x)=>predicates.every((predicate)=>predicate(x)
        ) ? some(x) : None
    ;
}
const mod5 = function() {
    return {
        isSafe: isSafe
    };
}();
function parallel(...promises) {
    if (promises.length === 1) {
        const firstItem = promises[0];
        if (Array.isArray(firstItem)) {
            return parallel(...firstItem);
        }
    }
    return Promise.all(promises);
}
function parallelMap(f) {
    return (arr)=>parallel(arr.map(f))
    ;
}
function mapFulfilled(functionOrValue) {
    return (promise)=>promise.then(isFunction1(functionOrValue) ? functionOrValue : ()=>functionOrValue
        )
    ;
}
function mapPromise(ifFulfilled) {
    return (ifRejected)=>{
        return (promise)=>promise.then(isFunction1(ifFulfilled) ? ifFulfilled : ()=>ifFulfilled
            , isFunction1(ifRejected) ? ifRejected : ()=>ifRejected
            )
        ;
    };
}
const mod6 = function() {
    return {
        parallel: parallel,
        parallelMap: parallelMap,
        mapFulfilled: mapFulfilled,
        mapPromise: mapPromise
    };
}();
function safeFirst(arr) {
    return arr.length >= 1 ? some(arr[0]) : None;
}
function safeSingle(arr) {
    return arr.length === 1 ? some(arr[0]) : None;
}
function safeLast(arr) {
    return arr.length >= 1 ? some(arr[arr.length - 1]) : None;
}
function safeTake(n) {
    return (arr)=>arr.length >= n ? some(arr.slice(0, n)) : None
    ;
}
function safeDrop(n) {
    return (arr)=>arr.length >= n ? some(arr.slice(n)) : None
    ;
}
function safeFind(predicate) {
    return (arr)=>maybeUndefined(arr.find(predicate))
    ;
}
function safeFindIndex(predicate) {
    return (arr)=>{
        const result = arr.findIndex(predicate);
        return result !== -1 ? some(result) : None;
    };
}
const mod7 = function() {
    return {
        safeFirst: safeFirst,
        safeSingle: safeSingle,
        safeLast: safeLast,
        safeTake: safeTake,
        safeDrop: safeDrop,
        safeFind: safeFind,
        safeFindIndex: safeFindIndex
    };
}();
function match(regExp) {
    return (s)=>{
        const r = s.match(regExp);
        return r === null ? None : some(r[0]);
    };
}
const mod8 = function() {
    return {
        match: match
    };
}();
export { mod as booleanFunctions };
export { mod2 as options };
export { mod3 as result };
export { mod4 as safeObjectFunctions };
export { mod5 as safeValidationFunctions };
export { mod1 as higherOrderFunctions };
export { mod6 as promiseFunctions };
export { mod7 as safeArrayFunctions };
export { mod8 as safeStringFunctions };
export * as transformation;

