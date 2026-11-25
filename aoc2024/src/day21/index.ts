import { run } from "../../../scripts/aoc.ts";

const numeric = ["789", "456", "123", " 0A"];
const arrows = [" ^A", "<v>"];

function shortestCommands(keypad: string[], start: string, end: string) {
	const keys = keypad.join("");
	const src = keys.indexOf(start);
	const dst = keys.indexOf(end);
	const tx = dst % 3;
	const ty = Math.floor(dst / 3);
	const paths: string[] = [];
	function walk(x: number, y: number, commands: string) {
		if (keypad[y][x] === " ") return;
		if (x === tx && y === ty) paths.push(commands + "A");
		if (x < tx) walk(x + 1, y, commands + ">");
		if (x > tx) walk(x - 1, y, commands + "<");
		if (y < ty) walk(x, y + 1, commands + "v");
		if (y > ty) walk(x, y - 1, commands + "^");
	}
	walk(src % 3, Math.floor(src / 3), "");
	return paths;
}

function complexity(input: string, depth: number) {
	const memo = new Map<string, number>();
	function presses(
		from: string,
		to: string,
		layers: number,
		keypad: string[],
	): number {
		const key = [keypad === numeric, from, to, layers].join(":");
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const paths = shortestCommands(keypad, from, to);
		const cost = Math.min(
			...paths.map((path) => {
				if (layers === 0) return path.length;
				let sum = 0;
				for (let i = 0; i < path.length; i++)
					sum += presses(path[i - 1] ?? "A", path[i], layers - 1, arrows);
				return sum;
			}),
		);
		memo.set(key, cost);
		return cost;
	}
	let sum = 0;
	for (const code of input.trim().split(/\r?\n/)) {
		let length = 0;
		for (let i = 0; i < code.length; i++)
			length += presses(code[i - 1] ?? "A", code[i], depth, numeric);
		sum += Number.parseInt(code, 10) * length;
	}
	return sum;
}

export function part1(input: string) {
	return complexity(input, 2);
}
export function part2(input: string) {
	return complexity(input, 25);
}

if (import.meta.main) run(import.meta.url, part1, part2);
