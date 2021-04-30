/**
  * const num = 10
  * slog({num})
  */
export function slog(obj: Record<string | number | symbol, any>): void {
  Object.entries(obj).forEach(([key, value]) => console.log(key + ":", value));
}

/**
  * pp("my obj:", obj)
  */
export function pp(...objects: any) {
  function printPrettyObject(object: any) {
    return typeof object !== "object"
      ? console.log(object)
      : Object.entries(object).forEach(([key, value]) =>
        globalThis.Deno
          ? console.log(`${key}: ${Deno.inspect(value)}`)
          : console.log(`${key}:`, value)
      );
  }
  return objects.forEach(printPrettyObject);
}

export function add(fn: (...args: any[]) => any, logger = console.log) {
  return (...args: any[]) => {
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

export function time(name: string, action: () => (void | Promise<void>)) {
  let start = Date.now() // Current time in milliseconds
  ;
  const result = action();
  if (result && "then" in result && typeof result.then === "function") {
    return result.then((r) => {
      const time = Date.now() - start;
      console.log(name, "took", time, "ms");
      return time;
    });
  }
  const time = Date.now() - start;
  console.log(name, "took", time, "ms");
  return time;
}

type Log = {
  (
    obj: Record<string | number | symbol, any>,
  ): void;
  pp: typeof pp;
  add: typeof add;
  time: typeof time;
};

export const log = slog as Log;
log.pp = pp;
log.add = add;
log.time = time;
