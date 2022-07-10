export const tmp = 1;

export function cutCollectionFromName(str) {
	const ind = str.indexOf("C");
	return str.slice(0, ind);
}
