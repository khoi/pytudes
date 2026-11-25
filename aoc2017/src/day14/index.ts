import { run } from "../../../scripts/aoc.ts";

import { knotHash } from "../knot.ts";

const width = 128;

function disk(input: string): Uint8Array {
	const key = input.trim();
	const squares = new Uint8Array(width * width);
	let square = 0;
	for (let row = 0; row < width; row++) {
		for (const byte of knotHash(`${key}-${row}`)) {
			for (let bit = 7; bit >= 0; bit--) squares[square++] = (byte >> bit) & 1;
		}
	}
	return squares;
}

export function part1(input: string): number {
	return disk(input).reduce((sum, used) => sum + used, 0);
}

export function part2(input: string): number {
	const squares = disk(input);
	const stack: number[] = [];
	function take(square: number) {
		if (squares[square] !== 1) return;
		squares[square] = 0;
		stack.push(square);
	}
	let regions = 0;
	for (let i = 0; i < squares.length; i++) {
		if (!squares[i]) continue;
		regions++;
		take(i);
		while (stack.length) {
			const square = stack.pop()!;
			if (square % width !== 0) take(square - 1);
			if (square % width !== width - 1) take(square + 1);
			take(square - width);
			take(square + width);
		}
	}
	return regions;
}

if (import.meta.main) run(import.meta.url, part1, part2);
