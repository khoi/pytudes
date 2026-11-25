import { run } from "../../../scripts/aoc.ts";

function lagoon(input: string, encoded: boolean): bigint {
	let x = 0n,
		y = 0n,
		twiceArea = 0n,
		boundary = 0n;
	for (const line of input.trim().split(/\r?\n/)) {
		const [, direction, distance, color] =
			/^([RDLU]) (\d+) \(#([0-9a-f]{6})\)$/.exec(line)!;
		const d = encoded ? Number(color[5]) : "RDLU".indexOf(direction);
		const length = encoded
			? BigInt("0x" + color.slice(0, 5))
			: BigInt(distance);
		const nx = x + [1n, 0n, -1n, 0n][d] * length;
		const ny = y + [0n, 1n, 0n, -1n][d] * length;
		twiceArea += x * ny - nx * y;
		boundary += length;
		x = nx;
		y = ny;
	}
	if (x !== 0n || y !== 0n) throw new Error("Open trench");
	return ((twiceArea < 0n ? -twiceArea : twiceArea) + boundary) / 2n + 1n;
}

export const part1 = (input: string) => lagoon(input, false);
export const part2 = (input: string) => lagoon(input, true);
if (import.meta.main) run(import.meta.url, part1, part2);
