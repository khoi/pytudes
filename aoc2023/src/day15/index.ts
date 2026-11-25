import { run } from "../../../scripts/aoc.ts";

function hash(label: string) {
	let value = 0;
	for (const char of label) value = ((value + char.charCodeAt(0)) * 17) % 256;
	return value;
}

export function part1(input: string) {
	return input
		.trim()
		.split(",")
		.reduce((sum, step) => sum + hash(step), 0);
}

export function part2(input: string) {
	const boxes = Array.from({ length: 256 }, () => new Map<string, number>());
	for (const step of input.trim().split(",")) {
		const [label, focus] = step.split(/[-=]/);
		const box = boxes[hash(label)];
		if (focus === "") box.delete(label);
		else box.set(label, Number(focus));
	}
	let total = 0;
	for (const [i, box] of boxes.entries()) {
		let slot = 1;
		for (const focus of box.values()) total += (i + 1) * slot++ * focus;
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
