import { run } from "../../../scripts/aoc.ts";

function sensors(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [x, y, beaconX, beaconY] = line.match(/-?\d+/g)!.map(Number);
			return {
				x,
				y,
				beaconX,
				beaconY,
				radius: Math.abs(x - beaconX) + Math.abs(y - beaconY),
			};
		});
}

export function part1(input: string, row = 2000000) {
	const readings = sensors(input);
	const intervals = readings
		.flatMap(({ x, y, radius }) => {
			const reach = radius - Math.abs(y - row);
			return reach < 0 ? [] : [[x - reach, x + reach]];
		})
		.sort((a, b) => a[0] - b[0]);
	let count = 0;
	let end = -Infinity;
	for (const [left, right] of intervals) {
		count += Math.max(0, right - Math.max(left, end + 1) + 1);
		end = Math.max(end, right);
	}
	const beacons = new Set(
		readings.filter((s) => s.beaconY === row).map((s) => s.beaconX),
	);
	return count - beacons.size;
}

export function part2(input: string, limit = 4000000) {
	const readings = sensors(input);
	for (let y = 0; y <= limit; y++) {
		let x = 0;
		while (x <= limit) {
			let end = x - 1;
			for (const sensor of readings) {
				const reach = sensor.radius - Math.abs(y - sensor.y);
				if (x >= sensor.x - reach && x <= sensor.x + reach) {
					end = Math.max(end, sensor.x + reach);
				}
			}
			if (end < x) return x * 4000000 + y;
			x = end + 1;
		}
	}
	throw new Error("No uncovered point");
}

if (import.meta.main) run(import.meta.url, part1, part2);
