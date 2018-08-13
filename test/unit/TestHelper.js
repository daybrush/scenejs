export function orderByASC(arr) {
	return arr.sort((a,b) => a - b);
}
export function group(arr) {
	const result = [];

	arr.forEach(value => {
		(result.indexOf(value) === -1) && result.push(value);
	});
	return result;
}