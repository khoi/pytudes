export function twist(
	lengths: number[],
	size: number,
	rounds: number,
): number[] {
	const ring = Array.from({ length: size }, (_, i) => i);
	let start = 0;
	let skip = 0;
	for (let round = 0; round < rounds; round++) {
		for (const length of lengths) {
			for (let i = 0; i < Math.floor(length / 2); i++) {
				const left = (start + i) % size;
				const right = (start + length - i - 1) % size;
				[ring[left], ring[right]] = [ring[right], ring[left]];
			}
			start = (start + length + skip) % size;
			skip++;
		}
	}
	return ring;
}

export function knotHash(text: string): number[] {
	const lengths = [...text]
		.map((char) => char.charCodeAt(0))
		.concat(17, 31, 73, 47, 23);
	const sparse = twist(lengths, 256, 64);
	const dense: number[] = [];
	for (let start = 0; start < sparse.length; start += 16) {
		dense.push(sparse.slice(start, start + 16).reduce((a, b) => a ^ b));
	}
	return dense;
}
