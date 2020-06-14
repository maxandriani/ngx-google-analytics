/**
 * Google Analytics GTagFn call signature
 */
export type GtagFn = (...args: (string | { [param: string]: string })[]) => {};
