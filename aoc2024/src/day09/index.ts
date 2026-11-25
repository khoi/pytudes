import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const blocks: number[] = [];
	for (const [i, digit] of [...input.trim()].entries()) {
		const id = i % 2 === 0 ? i / 2 : -1;
		for (let n = 0; n < Number(digit); n++) blocks.push(id);
	}
	let left = 0;
	let right = blocks.length - 1;
	while (left < right) {
		if (blocks[left] !== -1) left++;
		else if (blocks[right] === -1) right--;
		else {
			blocks[left++] = blocks[right];
			blocks[right--] = -1;
		}
	}
	return blocks.reduce(
		(sum, id, index) => (id === -1 ? sum : sum + id * index),
		0,
	);
}

type Span = { start: number; length: number };

export function part2(input: string): number {
	const files: Span[] = [];
	const gaps: Span[] = [];
	let start = 0;
	for (const [i, digit] of [...input.trim()].entries()) {
		const length = Number(digit);
		if (i % 2 === 0) files.push({ start, length });
		else if (length > 0) {
			const previous = gaps.at(-1);
			if (previous && previous.start + previous.length === start)
				previous.length += length;
			else gaps.push({ start, length });
		}
		start += length;
	}
	const firstFit = Array<number>(10).fill(0);
	let checksum = 0;
	for (let id = files.length - 1; id >= 0; id--) {
		const file = files[id];
		if (file.length === 0) continue;
		let i = firstFit[file.length];
		while (i < gaps.length && gaps[i].length < file.length) i++;
		firstFit[file.length] = i;
		const gap = gaps[i];
		if (gap && gap.start < file.start) {
			file.start = gap.start;
			gap.start += file.length;
			gap.length -= file.length;
		}
		checksum += (id * file.length * (2 * file.start + file.length - 1)) / 2;
	}
	return checksum;
}

if (import.meta.main) run(import.meta.url, part1, part2);
