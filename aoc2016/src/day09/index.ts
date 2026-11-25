import { run } from "../../../scripts/aoc.ts";

function decompressedLength(input: string, recursive: boolean): number {
	const data = input.replace(/\s/g, "");
	function measure(start: number, end: number): number {
		let size = 0;
		let i = start;
		while (i < end) {
			if (data[i] !== "(") {
				size++;
				i++;
				continue;
			}
			const close = data.indexOf(")", i);
			if (close < 0 || close >= end) throw new Error("Incomplete marker");
			const [width, count] = data
				.slice(i + 1, close)
				.split("x")
				.map(Number);
			i = close + 1;
			if (i + width > end) throw new Error("Marker exceeds segment");
			size += count * (recursive ? measure(i, i + width) : width);
			i += width;
		}
		return size;
	}
	return measure(0, data.length);
}

export const part1 = (input: string) => decompressedLength(input, false);
export const part2 = (input: string) => decompressedLength(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
