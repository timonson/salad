function not1(predicate) {
    return (x)=>!predicate(x)
    ;
}
function anyPass1(predicates) {
    return (x)=>{
        for(let i_p = 0; i_p < predicates.length; i_p++){
            if (predicates[i_p](x)) {
                return true;
            }
        }
        return false;
    };
}
function allPass1(predicates) {
    return (x)=>{
        for(let i_p = 0; i_p < predicates.length; i_p++){
            if (!predicates[i_p](x)) {
                return false;
            }
        }
        return true;
    };
}
function isFunction1(value) {
    return typeof value === "function";
}
function isBoolean1(input) {
    return input === true || input === false;
}
function isNull1(input) {
    return input === null;
}
function isUndefined1(input) {
    return input === undefined;
}
function isString1(input) {
    return typeof input === "string";
}
function isNumber1(input) {
    return typeof input === "number";
}
function isTrue1(input) {
    return input === true;
}
function isFalse1(input) {
    return input === false;
}
function equals1(b) {
    return (a)=>a === b
    ;
}
function isObjectWide1(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function isObject1(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function hasProperty1(key, obj) {
    return key in obj;
}
function isObjectAndHasProp1(key, obj) {
    return typeof obj === "object" && Array.isArray(obj) === false && obj !== null && key in obj;
}
function isEmail1(value) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof value === "string" && regex.test(value.toLowerCase());
}
function isPresent1(t) {
    return t !== undefined && t !== null;
}
function isDefined1(t) {
    return t !== undefined;
}
function isFilled1(t) {
    return t !== null;
}
function hasPresentKey1(k) {
    return function(a) {
        return a[k] !== undefined && a[k] !== null;
    };
}
function hasValueAtKey1(k, v) {
    return function(a) {
        return a[k] === v;
    };
}
export { not1 as not };
export { anyPass1 as anyPass };
export { allPass1 as allPass };
export { isFunction1 as isFunction };
export { isBoolean1 as isBoolean };
export { isNull1 as isNull };
export { isUndefined1 as isUndefined };
export { isString1 as isString };
export { isNumber1 as isNumber };
export { isTrue1 as isTrue };
export { isFalse1 as isFalse };
export { equals1 as equals };
export { isObjectWide1 as isObjectWide };
export { isObject1 as isObject };
export { hasProperty1 as hasProperty };
export { isObjectAndHasProp1 as isObjectAndHasProp };
export { isEmail1 as isEmail };
export { isPresent1 as isPresent };
export { isDefined1 as isDefined };
export { isFilled1 as isFilled };
export { hasPresentKey1 as hasPresentKey };
export { hasValueAtKey1 as hasValueAtKey };
function some1(value) {
    return {
        value,
        kind: "Some"
    };
}
const None1 = {
    kind: "None"
};
function isSome1(input) {
    return input.kind === "Some";
}
function isNone1(input) {
    return input.kind === "None";
}
function mapOption1(f) {
    return (opt)=>isSome1(opt) ? some1(f(opt.value)) : None1
    ;
}
function chainOption1(f) {
    return (opt)=>isSome1(opt) ? f(opt.value) : None1
    ;
}
function foldOption1(ifSome) {
    return (ifNone)=>(opt)=>isSome1(opt) ? isFunction1(ifSome) ? ifSome(opt.value) : ifSome : isFunction1(ifNone) ? ifNone() : ifNone
    ;
}
function invertOptions1(options) {
    return options.reduce((acc, opt)=>chainOption1((arr)=>mapOption1((value)=>[
                    ...arr,
                    value
                ]
            )(opt)
        )(acc)
    , some1([]));
}
function concatOptions1(options) {
    return options.reduce((arr, opt)=>foldOption1((value)=>arr.concat([
                value
            ])
        )(arr)(opt)
    , []);
}
function alternativeOption1(functionOrOption) {
    return (opt)=>isSome1(opt) ? opt : isFunction1(functionOrOption) ? functionOrOption() : functionOrOption
    ;
}
function alternativeValue1(functionOrValue) {
    return (opt)=>foldOption1((x)=>x
        )(isFunction1(functionOrValue) ? functionOrValue() : functionOrValue)(opt)
    ;
}
function maybeNull1(nullable) {
    return nullable === null ? None1 : some1(nullable);
}
function maybeUndefined1(undefinable) {
    return undefinable === undefined ? None1 : some1(undefinable);
}
function ifPresent1(sideEffect) {
    return (opt)=>{
        if (isSome1(opt)) {
            sideEffect(opt.value);
        }
    };
}
function ifAbsent1(sideEffect) {
    return (opt)=>{
        if (isNone1(opt)) {
            sideEffect();
        }
    };
}
export { some1 as some };
export { None1 as None };
export { isSome1 as isSome };
export { isNone1 as isNone };
export { mapOption1 as mapOption };
export { chainOption1 as chainOption };
export { foldOption1 as foldOption };
export { invertOptions1 as invertOptions };
export { concatOptions1 as concatOptions };
export { alternativeOption1 as alternativeOption };
export { alternativeValue1 as alternativeValue };
export { maybeNull1 as maybeNull };
export { maybeUndefined1 as maybeUndefined };
export { ifPresent1 as ifPresent };
export { ifAbsent1 as ifAbsent };
function success1(value) {
    return {
        value,
        kind: "Success"
    };
}
function failure1(error) {
    return {
        error,
        kind: "Failure"
    };
}
function isSuccess1(result) {
    return result.kind === "Success";
}
function isFailure1(result) {
    return result.kind === "Failure";
}
function mapResult1(f) {
    return (result)=>isSuccess1(result) ? success1(f(result.value)) : result
    ;
}
function chainResult1(f) {
    return (result)=>isSuccess1(result) ? f(result.value) : failure1(result.error)
    ;
}
function foldResult1(ifSuccess) {
    return (ifFailure)=>(res)=>isSuccess1(res) ? isFunction1(ifSuccess) ? ifSuccess(res.value) : ifSuccess : isFunction1(ifFailure) ? ifFailure(res.error) : ifFailure
    ;
}
function foldIfSuccessElseThrow1(ifSuccess) {
    return (result)=>foldResult1(ifSuccess)((e)=>{
            throw e;
        })(result)
    ;
}
function invertResults1(results) {
    return results.reduce((acc, result)=>chainResult1((arr)=>mapResult1((value)=>arr.concat(value)
            )(result)
        )(acc)
    , success1([]));
}
function ifSucceeded1(sideEffect) {
    return (result)=>{
        if (isSuccess1(result)) {
            sideEffect(result.value);
        }
    };
}
function ifFailed1(sideEffect) {
    return (result)=>{
        if (isFailure1(result)) {
            sideEffect(result.error);
        }
    };
}
export { success1 as success };
export { failure1 as failure };
export { isSuccess1 as isSuccess };
export { isFailure1 as isFailure };
export { mapResult1 as mapResult };
export { chainResult1 as chainResult };
export { foldResult1 as foldResult };
export { foldIfSuccessElseThrow1 as foldIfSuccessElseThrow };
export { invertResults1 as invertResults };
export { ifSucceeded1 as ifSucceeded };
export { ifFailed1 as ifFailed };
function safeProperty1(key) {
    return (obj)=>obj.hasOwnProperty(key) ? some1(obj[key]) : None1
    ;
}
function safePropertyOf1(obj) {
    return (key)=>safeProperty1(key)(obj)
    ;
}
export { safeProperty1 as safeProperty };
export { safePropertyOf1 as safePropertyOf };
function isSafe1(...predicates) {
    return (x)=>predicates.every((predicate)=>predicate(x)
        ) ? some1(x) : None1
    ;
}
export { isSafe1 as isSafe };
function apply1(x) {
    return (f)=>f(x)
    ;
}
function applyTo1(f) {
    return (x)=>f(x)
    ;
}
function applyPair1([a, b]) {
    return (f)=>f(a)(b)
    ;
}
function applyPairTo1(f) {
    return ([a, b])=>f(a)(b)
    ;
}
function perform1(f) {
    return (x)=>{
        f(x);
        return x;
    };
}
function identity1(x) {
    return x;
}
function constant1(x) {
    return ()=>x
    ;
}
function curry1(fn) {
    const arity = fn.length;
    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);
        }
        return fn.call(null, ...args);
    };
}
function composeMultivariate1(...fns) {
    return fns.reduce((f, g)=>(...xs)=>f(...g(...xs))
    );
}
function compose1(...funcs) {
    if (funcs.length === 0) {
        return (arg)=>arg
        ;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b)=>(...args)=>a(b(...args))
    );
}
export { apply1 as apply };
export { applyTo1 as applyTo };
export { applyPair1 as applyPair };
export { applyPairTo1 as applyPairTo };
export { perform1 as perform };
export { identity1 as identity };
export { constant1 as constant };
export { curry1 as curry };
export { composeMultivariate1 as composeMultivariate };
export { compose1 as compose };
function parallel1(...promises) {
    if (promises.length === 1) {
        const firstItem = promises[0];
        if (Array.isArray(firstItem)) {
            return parallel1(...firstItem);
        }
    }
    return Promise.all(promises);
}
function parallelMap1(f) {
    return (arr)=>parallel1(arr.map(f))
    ;
}
function mapFulfilled1(functionOrValue) {
    return (promise)=>promise.then(isFunction1(functionOrValue) ? functionOrValue : ()=>functionOrValue
        )
    ;
}
function mapPromise1(ifFulfilled) {
    return (ifRejected)=>{
        return (promise)=>promise.then(isFunction1(ifFulfilled) ? ifFulfilled : ()=>ifFulfilled
            , isFunction1(ifRejected) ? ifRejected : ()=>ifRejected
            )
        ;
    };
}
export { parallel1 as parallel };
export { parallelMap1 as parallelMap };
export { mapFulfilled1 as mapFulfilled };
export { mapPromise1 as mapPromise };
function safeFirst1(arr) {
    return arr.length >= 1 ? some1(arr[0]) : None1;
}
function safeSingle1(arr) {
    return arr.length === 1 ? some1(arr[0]) : None1;
}
function safeLast1(arr) {
    return arr.length >= 1 ? some1(arr[arr.length - 1]) : None1;
}
function safeTake1(n) {
    return (arr)=>arr.length >= n ? some1(arr.slice(0, n)) : None1
    ;
}
function safeDrop1(n) {
    return (arr)=>arr.length >= n ? some1(arr.slice(n)) : None1
    ;
}
function safeFind1(predicate) {
    return (arr)=>maybeUndefined1(arr.find(predicate))
    ;
}
function safeFindIndex1(predicate) {
    return (arr)=>{
        const result = arr.findIndex(predicate);
        return result !== -1 ? some1(result) : None1;
    };
}
export { safeFirst1 as safeFirst };
export { safeSingle1 as safeSingle };
export { safeLast1 as safeLast };
export { safeTake1 as safeTake };
export { safeDrop1 as safeDrop };
export { safeFind1 as safeFind };
export { safeFindIndex1 as safeFindIndex };
function match1(regExp) {
    return (s)=>{
        const r = s.match(regExp);
        return r === null ? None1 : some1(r[0]);
    };
}
export { match1 as match };
function transformResultToPromise1(mapOrResult) {
    return isFunction1(mapOrResult) ? foldResult1(mapOrResult)((error)=>Promise.reject(error)
    ) : foldResult1((value)=>Promise.resolve(value)
    )((error)=>Promise.reject(error)
    )(mapOrResult);
}
function transformOptionToResult1(mapOrErrorMessage) {
    return isFunction1(mapOrErrorMessage) ? (errorMessage)=>foldOption1(mapOrErrorMessage)(()=>failure1(errorMessage)
        )
     : foldOption1(success1)(()=>failure1(mapOrErrorMessage)
    );
}
export { transformResultToPromise1 as transformResultToPromise };
export { transformOptionToResult1 as transformOptionToResult };

