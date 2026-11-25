import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function scanner(input: string) {
	const drone = new Intcode(input);
	return (x: number, y: number) => drone.clone().run([x, y])[0] === 1;
}

export function part1(input: string) {
	const pulled = scanner(input);
	let count = 0;
	for (let y = 0; y < 50; y++) {
		for (let x = 0; x < 50; x++) if (pulled(x, y)) count++;
	}
	return count;
}

export function square(
	pulled: (x: number, y: number) => boolean,
	size: number,
) {
	let left = 0;
	for (let bottom = size - 1; ; bottom++) {
		while (!pulled(left, bottom)) left++;
		const top = bottom - size + 1;
		if (pulled(left + size - 1, top)) return 10_000 * left + top;
	}
}

export function part2(input: string) {
	return square(scanner(input), 100);
}

if (import.meta.main) run(import.meta.url, part1, part2);
