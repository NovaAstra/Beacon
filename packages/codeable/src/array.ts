export function sort<T, U>(
    input: T[],
    compareFn?: (a: T, b: T) => number,
    callbackFn?: (item: T, index: number) => U
): U[] {
    const callback: any = getCallback(input, callbackFn)

    if (input.length <= 1) return input.map(callback)

    const compare: any = getCompare(compareFn)

    const mid = Math.floor(input.length / 2);
    const left = sort(input.slice(0, mid), compare, callback);
    const right = sort(input.slice(mid), compare, callback);

    return merge(left, right, compare, callback);
}


export function merge<T, U>(
    left: T[],
    right: T[],
    compareFn: (a: T, b: T) => number,
    callbackFn?: (item: T, index: number) => U
): U[] {
    const sorted: U[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        const comparison = compareFn(left[i], right[j])

        if (comparison < 0) {
            sorted.push(callbackFn(left[i], 0));
            i++;
        } else {
            sorted.push(callbackFn(right[j], 0));
            j++;
        }
    }

    return sorted.concat(left.slice(i).map(callbackFn)).concat(right.slice(j).map(callbackFn));
}


export function getCallback<T>(
    input: T[]
): (item: T, index: number) => T
export function getCallback<T, U>(
    input: T[],
    callbackfn?: (item: T, index: number, array: T[]) => U
): (item: T, index: number) => U
export function getCallback<T, U>(
    input: T[],
    callbackfn?: (item: T, index: number, array: T[]) => U
): (item: T, index: number) => U | T {
    return (item: T, index: number): U | T => callbackfn ? callbackfn(item, index, input) : item
}

export function getCompare<T>(
    compareFn: (a: T, b: T) => number
): (a: T, b: T) => number {
    return (a: T, b: T) => compareFn ? compareFn(a, b) : String(a).localeCompare(String(b))
}
