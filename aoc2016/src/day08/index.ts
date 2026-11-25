import { run } from "../../../scripts/aoc.ts";
import { decodeLetters } from "../../../scripts/ocr.ts";

export function screen(input: string, width = 50, height = 6): string[] {
	const pixels = Array.from({ length: height }, () =>
		Array<boolean>(width).fill(false),
	);
	for (const line of input.trim().split(/\r?\n/)) {
		const [a, b] = (line.match(/\d+/g) ?? []).map(Number);
		if (line.startsWith("rect ")) {
			for (let y = 0; y < b; y++) pixels[y].fill(true, 0, a);
		} else if (line.startsWith("rotate row")) {
			const row = pixels[a].slice();
			for (let x = 0; x < width; x++) pixels[a][(x + b) % width] = row[x];
		} else if (line.startsWith("rotate column")) {
			const column = pixels.map((row) => row[a]);
			for (let y = 0; y < height; y++) pixels[(y + b) % height][a] = column[y];
		} else {
			throw new Error(`Unknown screen operation: ${line}`);
		}
	}
	return pixels.map((row) => row.map((on) => (on ? "#" : ".")).join(""));
}

export const part1 = (input: string) =>
	screen(input).join("").replaceAll(".", "").length;
export const part2 = (input: string) => decodeLetters(screen(input));

if (import.meta.main) run(import.meta.url, part1, part2);
