export function orderByASC(arr: any[]) {
    return arr.map(v => parseFloat(v)).sort((a, b) => a - b);
}
export function group(arr: any[]) {
    const result = [];

    arr.forEach(value => {
        (result.indexOf(value) === -1) && result.push(value);
    });
    return result;
}
