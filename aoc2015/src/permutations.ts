export function* permutations<T>(items: T[]): Generator<T[]> {
	if (items.length === 0) {
		yield [];
		return;
	}
	for (let i = 0; i < items.length; i++) {
		const rest = [...items.slice(0, i), ...items.slice(i + 1)];
		for (const tail of permutations(rest)) yield [items[i], ...tail];
	}
}
