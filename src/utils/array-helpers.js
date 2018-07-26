export function uniqArray(array=[], mapFn=(i => i)) {
	return array.filter((item, i) =>
		array.map(mapFn).indexOf(mapFn(item)) === i
	);
}