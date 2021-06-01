function isArray1(a) {
    return Array.isArray(a);
}
function is2DArray1(input) {
    return Array.isArray(input) && Array.isArray(input[0]);
}
export { isArray1 as isArray };
export { is2DArray1 as is2DArray };
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
function isBoolean1(input) {
    return input === true || input === false;
}
function isNull1(input) {
    return input === null;
}
function isUndefined1(input) {
    return input === undefined;
}
function isPresent1(t) {
    return t !== undefined && t !== null;
}
function isDefined1(t) {
    return t !== undefined;
}
function isNotNull1(t) {
    return t !== null;
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
    return isObjectWide1(obj) && key in obj;
}
function isEmail1(value) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof value === "string" && regex.test(value.toLowerCase());
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
export { isBoolean1 as isBoolean };
export { isNull1 as isNull };
export { isUndefined1 as isUndefined };
export { isPresent1 as isPresent };
export { isDefined1 as isDefined };
export { isNotNull1 as isNotNull };
export { isTrue1 as isTrue };
export { isFalse1 as isFalse };
export { equals1 as equals };
export { isObjectWide1 as isObjectWide };
export { isObject1 as isObject };
export { hasProperty1 as hasProperty };
export { isObjectAndHasProp1 as isObjectAndHasProp };
export { isEmail1 as isEmail };
export { hasPresentKey1 as hasPresentKey };
export { hasValueAtKey1 as hasValueAtKey };
function isFunction1(value) {
    return typeof value === "function";
}
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
export { isFunction1 as isFunction };
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
function add1(x) {
    return (y)=>x + y
    ;
}
function multiply1(x) {
    return (y)=>x * y
    ;
}
function greaterThan1(value) {
    return (x)=>x > value
    ;
}
function lessThan1(value) {
    return (x)=>x < value
    ;
}
function isNumber1(input) {
    return typeof input === "number";
}
export { add1 as add };
export { multiply1 as multiply };
export { greaterThan1 as greaterThan };
export { lessThan1 as lessThan };
export { isNumber1 as isNumber };
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
function pair1(a) {
    return (b)=>[
            a,
            b
        ]
    ;
}
function pairWith1(b) {
    return (a)=>[
            a,
            b
        ]
    ;
}
function pairBy1(f) {
    return (a)=>[
            a,
            f(a)
        ]
    ;
}
function duplicate1(a) {
    return [
        a,
        a
    ];
}
function mapFirst1(f) {
    return ([a, b])=>[
            f(a),
            b
        ]
    ;
}
function mapSecond1(g) {
    return ([a, b])=>[
            a,
            g(b)
        ]
    ;
}
function mapPair1(g) {
    return ([a, b])=>[
            a,
            g(a)(b)
        ]
    ;
}
function foldPair1(f) {
    return ([a, b])=>f(a)(b)
    ;
}
export { pair1 as pair };
export { pairWith1 as pairWith };
export { pairBy1 as pairBy };
export { duplicate1 as duplicate };
export { mapFirst1 as mapFirst };
export { mapSecond1 as mapSecond };
export { mapPair1 as mapPair };
export { foldPair1 as foldPair };
function split1(separator) {
    return (s)=>s.split(separator)
    ;
}
function join1(separator) {
    return (...items)=>{
        if (is2DArray1(items)) {
            return join1(separator)(...items[0]);
        }
        return items.join(separator);
    };
}
function surroundWith1(beginning) {
    return (end)=>(str)=>beginning + str + end
    ;
}
function lower1(input) {
    return input.toLowerCase();
}
function upper1(input) {
    return input.toUpperCase();
}
function capitalize1(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
function trim1(input) {
    return input.trim();
}
function containsSubstring1(substring) {
    return (candidate)=>candidate.includes(substring)
    ;
}
function isSubstringOf1(text) {
    return (candidate)=>containsSubstring1(candidate)(text)
    ;
}
function isString1(input) {
    return typeof input === "string";
}
export { split1 as split };
export { join1 as join };
export { surroundWith1 as surroundWith };
export { lower1 as lower };
export { upper1 as upper };
export { capitalize1 as capitalize };
export { trim1 as trim };
export { containsSubstring1 as containsSubstring };
export { isSubstringOf1 as isSubstringOf };
export { isString1 as isString };
function nth1(index) {
    return (input)=>input[index]
    ;
}
function first1(predicateOrInput) {
    if (isFunction1(predicateOrInput)) {
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
function second1(input) {
    return input[1];
}
function last1(predicateOrInput) {
    if (isFunction1(predicateOrInput)) {
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
function take1(n) {
    return (input)=>input.slice(0, n)
    ;
}
function takeFrom1(input) {
    return (n)=>take1(n)(input)
    ;
}
function takeLast1(n) {
    return (input)=>input.slice(Math.max(input.length - n, 0))
    ;
}
function takeLastFrom1(input) {
    return (n)=>takeLast1(n)(input)
    ;
}
function takeWhile1(predicate) {
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
function drop1(n) {
    return (input)=>input.slice(n)
    ;
}
function dropFrom1(input) {
    return (n)=>drop1(n)(input)
    ;
}
function dropLast1(n) {
    return (input)=>input.slice(0, -n)
    ;
}
function dropLastFrom1(input) {
    return (n)=>isString1(input) ? dropLast1(n)(input) : dropLast1(n)(input)
    ;
}
function dropWhile1(predicate) {
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
function append1(item) {
    return (input)=>isString1(input) ? input + item : [
            ...input,
            item
        ]
    ;
}
function appendTo1(input) {
    return (item)=>isString1(item) ? input + item : [
            ...input,
            item
        ]
    ;
}
function prepend1(item) {
    return (input)=>isString1(input) ? item + input : [
            item,
            ...input
        ]
    ;
}
function prependTo1(input) {
    return (item)=>isString1(input) ? item + input : [
            item,
            ...input
        ]
    ;
}
function concat1(...items) {
    if (items.length === 1) {
        const firstItem = items[0];
        if (isArray1(firstItem)) {
            if (firstItem.length === 1) {
                return firstItem[0];
            } else {
                return concat1(...firstItem);
            }
        }
    }
    return isString1(items[0]) ? items.reduce((acc, s)=>acc.concat(s)
    , "") : items.reduce((acc, s)=>acc.concat(s)
    , []);
}
function isEmpty1(input) {
    return input.length === 0;
}
function isNotEmpty1(input) {
    return input.length > 0;
}
function isOfLength1(length) {
    return (input)=>input.length === length
    ;
}
const isOfLengthOne1 = isOfLength1(1);
function isShorterThan1(length) {
    return (input)=>input.length < length
    ;
}
function isLongerThan1(length) {
    return (input)=>input.length > length
    ;
}
function length1(input) {
    return input.length;
}
function reverse1(input) {
    const inputLength = input.length;
    const reversedArray = Array(inputLength);
    for(let i = 0; i < inputLength; i++){
        reversedArray[i] = input[inputLength - i - 1];
    }
    return reversedArray;
}
export { nth1 as nth };
export { first1 as first };
export { second1 as second };
export { last1 as last };
export { take1 as take };
export { takeFrom1 as takeFrom };
export { takeLast1 as takeLast };
export { takeLastFrom1 as takeLastFrom };
export { takeWhile1 as takeWhile };
export { drop1 as drop };
export { dropFrom1 as dropFrom };
export { dropLast1 as dropLast };
export { dropLastFrom1 as dropLastFrom };
export { dropWhile1 as dropWhile };
export { append1 as append };
export { appendTo1 as appendTo };
export { prepend1 as prepend };
export { prependTo1 as prependTo };
export { concat1 as concat };
export { isEmpty1 as isEmpty };
export { isNotEmpty1 as isNotEmpty };
export { isOfLength1 as isOfLength };
export { isOfLengthOne1 as isOfLengthOne };
export { isShorterThan1 as isShorterThan };
export { isLongerThan1 as isLongerThan };
export { length1 as length };
export { reverse1 as reverse };
function parallel1(...promises) {
    if (isOfLengthOne1(promises)) {
        const firstItem = first1(promises);
        if (isArray1(firstItem)) {
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
function safeMatch1(regExp) {
    return (s)=>{
        const r = s.match(regExp);
        return r === null ? None1 : some1(r[0]);
    };
}
export { safeMatch1 as safeMatch };
function isSafe1(...predicates) {
    return (x)=>predicates.every((predicate)=>predicate(x)
        ) ? some1(x) : None1
    ;
}
export { isSafe1 as isSafe };
function transformOptionToResult1(mapOrErrorMessage) {
    return isFunction1(mapOrErrorMessage) ? (errorMessage)=>foldOption1(mapOrErrorMessage)(()=>failure1(errorMessage)
        )
     : foldOption1(success1)(()=>failure1(mapOrErrorMessage)
    );
}
function transformOptionToResultWithAnyMap1(mapOrErrorMessage) {
    return isFunction1(mapOrErrorMessage) ? (errorMessage)=>foldOption1((x)=>success1(mapOrErrorMessage(x))
        )(()=>failure1(errorMessage)
        )
     : foldOption1(success1)(()=>failure1(mapOrErrorMessage)
    );
}
function transformResultToPromise1(mapOrResult) {
    return isFunction1(mapOrResult) ? foldResult1(mapOrResult)((error)=>Promise.reject(error)
    ) : foldResult1((value)=>Promise.resolve(value)
    )((error)=>Promise.reject(error)
    )(mapOrResult);
}
function transformPromiseToResult1(mapOrPromise) {
    return isFunction1(mapOrPromise) ? (promise)=>promise.then((x)=>success1(mapOrPromise(x))
        ).catch(failure1)
     : mapOrPromise.then(success1).catch(failure1);
}
export { transformOptionToResult1 as transformOptionToResult };
export { transformOptionToResultWithAnyMap1 as transformOptionToResultWithAnyMap };
export { transformResultToPromise1 as transformResultToPromise };
export { transformPromiseToResult1 as transformPromiseToResult };

