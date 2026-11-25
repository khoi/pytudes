import { run } from "../../../scripts/aoc.ts";

function shots(input: string) {
	const [xMin, xMax, yMin, yMax] = input.match(/-?\d+/g)!.map(Number);
	const crossesZero = yMin <= 0 && yMax >= 0;
	const yTimeLimit = 2 * Math.max(Math.abs(yMin), Math.abs(yMax));
	let peak = -Infinity;
	let count = 0;
	for (let vx = Math.min(0, xMin); vx <= Math.max(0, xMax); vx++) {
		let x = 0;
		let speed = vx;
		const verticalSpeeds = new Set<number>();
		for (let time = 1; ; time++) {
			x += speed;
			speed -= Math.sign(speed);
			if ((x < xMin && speed <= 0) || (x > xMax && speed >= 0)) break;
			if (x < xMin || x > xMax) continue;
			if (!speed && crossesZero) return { peak: Infinity, count: Infinity };
			const fall = (time * (time - 1)) / 2;
			const lowest = Math.ceil((yMin + fall) / time);
			const highest = Math.floor((yMax + fall) / time);
			for (let vy = lowest; vy <= highest; vy++) verticalSpeeds.add(vy);
			if (!crossesZero && time >= yTimeLimit) break;
		}
		for (const vy of verticalSpeeds)
			peak = Math.max(peak, vy > 0 ? (vy * (vy + 1)) / 2 : 0);
		count += verticalSpeeds.size;
	}
	return { peak, count };
}

export function part1(input: string) {
	return shots(input).peak;
}
export function part2(input: string) {
	return shots(input).count;
}

if (import.meta.main) run(import.meta.url, part1, part2);
