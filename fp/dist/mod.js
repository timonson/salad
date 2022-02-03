// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function isArray(a) {
    return Array.isArray(a);
}
function is2DArray(input) {
    return Array.isArray(input) && Array.isArray(input[0]);
}
export { isArray as isArray };
export { is2DArray as is2DArray };
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
function isPresent(t) {
    return t !== undefined && t !== null;
}
function isDefined(t) {
    return t !== undefined;
}
function isNotNull(t) {
    return t !== null;
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
function isObjectWide(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function isObject(obj) {
    return obj !== null && typeof obj === "object" && Array.isArray(obj) === false;
}
function hasProperty(key) {
    return (obj)=>key in obj
    ;
}
function isObjectAndHasProp(key) {
    return (obj)=>isObject(obj) && hasProperty(key)(obj)
    ;
}
function isEmail(value) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof value === "string" && regex.test(value.toLowerCase());
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
export { not as not };
export { anyPass as anyPass };
export { allPass as allPass };
export { isBoolean as isBoolean };
export { isNull as isNull };
export { isUndefined as isUndefined };
export { isPresent as isPresent };
export { isDefined as isDefined };
export { isNotNull as isNotNull };
export { isTrue as isTrue };
export { isFalse as isFalse };
export { equals as equals };
export { isObjectWide as isObjectWide };
export { isObject as isObject };
export { hasProperty as hasProperty };
export { isObjectAndHasProp as isObjectAndHasProp };
export { isEmail as isEmail };
export { hasPresentKey as hasPresentKey };
export { hasValueAtKey as hasValueAtKey };
function isFunction(value) {
    return typeof value === "function";
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
function perform(f) {
    return (x)=>{
        f(x);
        return x;
    };
}
function flip(f) {
    return (b)=>(a)=>f(a)(b)
    ;
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
function composeMultivariate(...fns) {
    return fns.reduce((f, g)=>(...xs)=>f(...g(...xs))
    );
}
function compose(...funcs) {
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
export { isFunction as isFunction };
export { apply as apply };
export { applyTo as applyTo };
export { applyPair as applyPair };
export { applyPairTo as applyPairTo };
export { perform as perform };
export { flip as flip };
export { identity as identity };
export { constant as constant };
export { curry as curry };
export { composeMultivariate as composeMultivariate };
export { compose as compose };
function add(x) {
    return (y)=>x + y
    ;
}
function multiply(x) {
    return (y)=>x * y
    ;
}
function greaterThan(value) {
    return (x)=>x > value
    ;
}
function lessThan(value) {
    return (x)=>x < value
    ;
}
function isNumber(input) {
    return typeof input === "number";
}
export { add as add };
export { multiply as multiply };
export { greaterThan as greaterThan };
export { lessThan as lessThan };
export { isNumber as isNumber };
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
    return (ifNone)=>(opt)=>isSome(opt) ? isFunction(ifSome) ? ifSome(opt.value) : ifSome : isFunction(ifNone) ? ifNone() : ifNone
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
    return (opt)=>isSome(opt) ? opt : isFunction(functionOrOption) ? functionOrOption() : functionOrOption
    ;
}
function alternativeValue(functionOrValue) {
    return (opt)=>foldOption((x)=>x
        )(isFunction(functionOrValue) ? functionOrValue() : functionOrValue)(opt)
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
export { some as some };
export { None as None };
export { isSome as isSome };
export { isNone as isNone };
export { mapOption as mapOption };
export { chainOption as chainOption };
export { foldOption as foldOption };
export { invertOptions as invertOptions };
export { concatOptions as concatOptions };
export { alternativeOption as alternativeOption };
export { alternativeValue as alternativeValue };
export { maybeNull as maybeNull };
export { maybeUndefined as maybeUndefined };
export { ifPresent as ifPresent };
export { ifAbsent as ifAbsent };
function pair(a) {
    return (b)=>[
            a,
            b
        ]
    ;
}
function pairWith(b) {
    return (a)=>[
            a,
            b
        ]
    ;
}
function pairBy(f) {
    return (a)=>[
            a,
            f(a)
        ]
    ;
}
function duplicate(a) {
    return [
        a,
        a
    ];
}
function mapFirst(f) {
    return ([a, b])=>[
            f(a),
            b
        ]
    ;
}
function mapSecond(g) {
    return ([a, b])=>[
            a,
            g(b)
        ]
    ;
}
function mapPair(g) {
    return ([a, b])=>[
            a,
            g(a)(b)
        ]
    ;
}
function foldPair(f) {
    return ([a, b])=>f(a)(b)
    ;
}
export { pair as pair };
export { pairWith as pairWith };
export { pairBy as pairBy };
export { duplicate as duplicate };
export { mapFirst as mapFirst };
export { mapSecond as mapSecond };
export { mapPair as mapPair };
export { foldPair as foldPair };
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
    return (promise)=>promise.then(isFunction(functionOrValue) ? functionOrValue : ()=>functionOrValue
        )
    ;
}
function mapPromise(ifFulfilled) {
    return (ifRejected)=>{
        return (promise)=>promise.then(isFunction(ifFulfilled) ? ifFulfilled : ()=>ifFulfilled
            , isFunction(ifRejected) ? ifRejected : ()=>ifRejected
            )
        ;
    };
}
export { parallel as parallel };
export { parallelMap as parallelMap };
export { mapFulfilled as mapFulfilled };
export { mapPromise as mapPromise };
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
function tryCatch(f) {
    return (value)=>{
        try {
            return success(f(value));
        } catch (err) {
            return failure(err);
        }
    };
}
function foldResult(ifSuccess) {
    return (ifFailure)=>(res)=>isSuccess(res) ? isFunction(ifSuccess) ? ifSuccess(res.value) : ifSuccess : isFunction(ifFailure) ? ifFailure(res.error) : ifFailure
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
export { success as success };
export { failure as failure };
export { isSuccess as isSuccess };
export { isFailure as isFailure };
export { mapResult as mapResult };
export { chainResult as chainResult };
export { tryCatch as tryCatch };
export { foldResult as foldResult };
export { foldIfSuccessElseThrow as foldIfSuccessElseThrow };
export { invertResults as invertResults };
export { ifSucceeded as ifSucceeded };
export { ifFailed as ifFailed };
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
export { safeFirst as safeFirst };
export { safeSingle as safeSingle };
export { safeLast as safeLast };
export { safeTake as safeTake };
export { safeDrop as safeDrop };
export { safeFind as safeFind };
export { safeFindIndex as safeFindIndex };
function safeProperty(key) {
    return (obj)=>obj.hasOwnProperty(key) ? some(obj[key]) : None
    ;
}
function safePropertyOf(obj) {
    return (key)=>safeProperty(key)(obj)
    ;
}
export { safeProperty as safeProperty };
export { safePropertyOf as safePropertyOf };
function safeMatch(regExp) {
    return (s)=>{
        const r = s.match(regExp);
        return r === null ? None : some(r[0]);
    };
}
export { safeMatch as safeMatch };
function isSafe(...predicates) {
    return (x)=>predicates.every((predicate)=>predicate(x)
        ) ? some(x) : None
    ;
}
export { isSafe as isSafe };
function split(separator) {
    return (s)=>s.split(separator)
    ;
}
function join(separator) {
    return (...items)=>{
        if (is2DArray(items)) {
            return join(separator)(...items[0]);
        }
        return items.join(separator);
    };
}
function surroundWith(beginning) {
    return (end)=>(str)=>beginning + str + end
    ;
}
function lower(input) {
    return input.toLowerCase();
}
function upper(input) {
    return input.toUpperCase();
}
function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
function trim(input) {
    return input.trim();
}
function containsSubstring(substring) {
    return (candidate)=>candidate.includes(substring)
    ;
}
function isSubstringOf(text) {
    return (candidate)=>containsSubstring(candidate)(text)
    ;
}
function isString(input) {
    return typeof input === "string";
}
export { split as split };
export { join as join };
export { surroundWith as surroundWith };
export { lower as lower };
export { upper as upper };
export { capitalize as capitalize };
export { trim as trim };
export { containsSubstring as containsSubstring };
export { isSubstringOf as isSubstringOf };
export { isString as isString };
function nth(index) {
    return (input)=>input[index]
    ;
}
function first(predicateOrInput) {
    if (isFunction(predicateOrInput)) {
        return (input)=>{
            for(let i = 0; i < input.length; i++){
                const item = input[i];
                if (predicateOrInput(item)) {
                    return item;
                }
            }
            return null;
        };
    } else {
        return predicateOrInput[0];
    }
}
function second(input) {
    return input[1];
}
function last(predicateOrInput) {
    if (isFunction(predicateOrInput)) {
        return (input)=>{
            for(let i = input.length - 1; i >= 0; i--){
                const item = input[i];
                if (predicateOrInput(item)) {
                    return item;
                }
            }
            return null;
        };
    } else {
        return predicateOrInput[0];
    }
}
function take(n) {
    return (input)=>input.slice(0, n)
    ;
}
function takeFrom(input) {
    return (n)=>take(n)(input)
    ;
}
function takeLast(n) {
    return (input)=>input.slice(Math.max(input.length - n, 0))
    ;
}
function takeLastFrom(input) {
    return (n)=>takeLast(n)(input)
    ;
}
function takeWhile(predicate) {
    return (input)=>{
        const res = [];
        for(let i = 0; i < input.length; i++){
            const item = input[i];
            if (!predicate(item)) {
                return res;
            }
            res.push(item);
        }
        return res;
    };
}
function drop(n) {
    return (input)=>input.slice(n)
    ;
}
function dropFrom(input) {
    return (n)=>drop(n)(input)
    ;
}
function dropLast(n) {
    return (input)=>input.slice(0, -n)
    ;
}
function dropLastFrom(input) {
    return (n)=>isString(input) ? dropLast(n)(input) : dropLast(n)(input)
    ;
}
function dropWhile(predicate) {
    return (input)=>{
        let dropped = 0;
        while(dropped < input.length){
            const item = input[dropped];
            if (predicate(item)) {
                dropped++;
            } else {
                break;
            }
        }
        return input.slice(dropped);
    };
}
function append(item) {
    return (input)=>isString(input) ? input + item : [
            ...input,
            item
        ]
    ;
}
function appendTo(input) {
    return (item)=>isString(item) ? input + item : [
            ...input,
            item
        ]
    ;
}
function prepend(item) {
    return (input)=>isString(input) ? item + input : [
            item,
            ...input
        ]
    ;
}
function prependTo(input) {
    return (item)=>isString(input) ? item + input : [
            item,
            ...input
        ]
    ;
}
function concat(...items) {
    if (items.length === 1) {
        const firstItem = items[0];
        if (Array.isArray(firstItem)) {
            if (firstItem.length === 1) {
                return firstItem[0];
            } else {
                return concat(...firstItem);
            }
        }
    }
    return isString(items[0]) ? items.reduce((acc, s)=>acc.concat(s)
    , "") : items.reduce((acc, s)=>acc.concat(s)
    , []);
}
function isEmpty(input) {
    return input.length === 0;
}
function isNotEmpty(input) {
    return input.length > 0;
}
function isOfLength(length1) {
    return (input)=>input.length === length1
    ;
}
const isOfLengthOne = isOfLength(1);
function isShorterThan(length2) {
    return (input)=>input.length < length2
    ;
}
function isLongerThan(length3) {
    return (input)=>input.length > length3
    ;
}
function length(input) {
    return input.length;
}
function reverse(input) {
    const inputLength = input.length;
    const reversedArray = Array(inputLength);
    for(let i = 0; i < inputLength; i++){
        reversedArray[i] = input[inputLength - i - 1];
    }
    return reversedArray;
}
export { nth as nth };
export { first as first };
export { second as second };
export { last as last };
export { take as take };
export { takeFrom as takeFrom };
export { takeLast as takeLast };
export { takeLastFrom as takeLastFrom };
export { takeWhile as takeWhile };
export { drop as drop };
export { dropFrom as dropFrom };
export { dropLast as dropLast };
export { dropLastFrom as dropLastFrom };
export { dropWhile as dropWhile };
export { append as append };
export { appendTo as appendTo };
export { prepend as prepend };
export { prependTo as prependTo };
export { concat as concat };
export { isEmpty as isEmpty };
export { isNotEmpty as isNotEmpty };
export { isOfLength as isOfLength };
export { isOfLengthOne as isOfLengthOne };
export { isShorterThan as isShorterThan };
export { isLongerThan as isLongerThan };
export { length as length };
export { reverse as reverse };
function transformOptionToResult(mapOrErrorMessage) {
    return isFunction(mapOrErrorMessage) ? (errorMessage)=>foldOption(mapOrErrorMessage)(()=>failure(errorMessage)
        )
     : foldOption(success)(()=>failure(mapOrErrorMessage)
    );
}
function transformOptionToResultWithAnyMap(mapOrErrorMessage) {
    return isFunction(mapOrErrorMessage) ? (errorMessage)=>foldOption((x)=>success(mapOrErrorMessage(x))
        )(()=>failure(errorMessage)
        )
     : foldOption(success)(()=>failure(mapOrErrorMessage)
    );
}
function transformResultToPromise(mapOrResult) {
    return isFunction(mapOrResult) ? foldResult(mapOrResult)((error)=>Promise.reject(error)
    ) : foldResult((value)=>Promise.resolve(value)
    )((error)=>Promise.reject(error)
    )(mapOrResult);
}
function transformPromiseToResult(mapOrPromise) {
    return isFunction(mapOrPromise) ? (promise)=>promise.then((x)=>success(mapOrPromise(x))
        ).catch(failure)
     : mapOrPromise.then(success).catch(failure);
}
export { transformOptionToResult as transformOptionToResult };
export { transformOptionToResultWithAnyMap as transformOptionToResultWithAnyMap };
export { transformResultToPromise as transformResultToPromise };
export { transformPromiseToResult as transformPromiseToResult };

