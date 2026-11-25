import { run } from "../../../scripts/aoc.ts";

const shapes = [
	[0b1111],
	[0b010, 0b111, 0b010],
	[0b111, 0b100, 0b100],
	[1, 1, 1, 1],
	[3, 3],
];

function towerHeight(input: string, total: number): number {
	const jets = input.trim();
	const rows: number[] = [];
	const seen = new Map<string, { count: number; height: number }>();
	const lowestProbed: number[] = [];
	let depth = 64;
	let skippedHeight = 0;
	let jet = 0;
	let count = 0;
	while (count < total) {
		if (!skippedHeight && rows.length >= depth) {
			const key = [count % shapes.length, jet, ...rows.slice(-depth)].join(",");
			const previous = seen.get(key);
			if (previous) {
				let lowest = rows.length;
				for (let i = previous.count; i < count; i++)
					lowest = Math.min(lowest, lowestProbed[i]);
				if (lowest >= previous.height - depth) {
					const period = count - previous.count;
					const repeats = Math.floor((total - count) / period);
					count += repeats * period;
					skippedHeight += repeats * (rows.length - previous.height);
					if (count === total) break;
				} else {
					depth = Math.max(depth * 2, previous.height - lowest);
					seen.clear();
				}
			} else {
				seen.set(key, { count, height: rows.length });
			}
		}
		const shape = shapes[count % shapes.length];
		let x = 2;
		let y = rows.length + 3;
		function fits(left: number, bottom: number): boolean {
			if (left < 0 || bottom < 0) return false;
			return shape.every((mask, i) => {
				const shifted = mask << left;
				return shifted < 128 && !(shifted & (rows[bottom + i] ?? 0));
			});
		}
		while (true) {
			const pushed = x + (jets[jet] === "<" ? -1 : 1);
			jet = (jet + 1) % jets.length;
			if (fits(pushed, y)) x = pushed;
			if (!fits(x, y - 1)) break;
			y--;
		}
		if (!skippedHeight) lowestProbed[count] = y - 1;
		for (const [i, mask] of shape.entries())
			rows[y + i] = (rows[y + i] ?? 0) | (mask << x);
		count++;
	}
	return rows.length + skippedHeight;
}

export const part1 = (input: string) => towerHeight(input, 2022);
export const part2 = (input: string) => towerHeight(input, 1_000_000_000_000);

if (import.meta.main) run(import.meta.url, part1, part2);
