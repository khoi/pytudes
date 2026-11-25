import { decodeLetters } from "../../../scripts/ocr.ts";
import { run } from "../../../scripts/aoc.ts";

function layers(input: string, width: number, height: number): string[] {
	const data = input.trim();
	const size = width * height;
	if (!size || data.length % size !== 0)
		throw new Error("Incomplete image layer");
	return Array.from({ length: data.length / size }, (_, i) =>
		data.slice(i * size, (i + 1) * size),
	);
}

export function part1(input: string, width = 25, height = 6): number {
	const count = (layer: string, digit: string) => layer.split(digit).length - 1;
	const layer = layers(input, width, height).reduce((best, next) =>
		count(next, "0") < count(best, "0") ? next : best,
	);
	return count(layer, "1") * count(layer, "2");
}

export function render(input: string, width = 25, height = 6): string {
	const image = layers(input, width, height);
	return Array.from({ length: height }, (_, y) =>
		Array.from({ length: width }, (_, x) => {
			const index = y * width + x;
			const layer = image.find((layer) => layer[index] !== "2");
			return layer?.[index] === "1" ? "#" : " ";
		}).join(""),
	).join("\n");
}

export const part2 = (input: string) =>
	decodeLetters(render(input).split("\n"));

if (import.meta.main) run(import.meta.url, part1, part2);
