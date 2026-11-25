import { run } from "../../../scripts/aoc.ts";

function settle(input: string, hasFloor: boolean) {
	const blocked = new Set<string>();
	let deepest = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const points = line
			.split(" -> ")
			.map((point) => point.split(",").map(Number));
		let [x, y] = points[0];
		blocked.add([x, y].join(","));
		deepest = Math.max(deepest, y);
		for (const [endX, endY] of points.slice(1)) {
			while (x !== endX || y !== endY) {
				x += Math.sign(endX - x);
				y += Math.sign(endY - y);
				blocked.add([x, y].join(","));
			}
			deepest = Math.max(deepest, endY);
		}
	}
	const path = blocked.has("500,0") ? [] : [[500, 0]];
	let sand = 0;
	while (path.length > 0) {
		const [x, y] = path.at(-1)!;
		if (!hasFloor && y > deepest) break;
		const next = [x, x - 1, x + 1].find(
			(column) => !blocked.has([column, y + 1].join(",")),
		);
		if (next !== undefined && y + 1 < deepest + 2) {
			path.push([next, y + 1]);
		} else {
			blocked.add([x, y].join(","));
			path.pop();
			sand++;
		}
	}
	return sand;
}

export function part1(input: string) {
	return settle(input, false);
}

export function part2(input: string) {
	return settle(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
