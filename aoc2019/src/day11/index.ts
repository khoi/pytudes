import { decodeLetters } from "../../../scripts/ocr.ts";
import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function paint(input: string, firstWhite: boolean) {
	const computer = new Intcode(input);
	const white = new Set<string>(firstWhite ? ["0,0"] : []);
	const painted = new Set<string>();
	const directions = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];
	let x = 0,
		y = 0,
		facing = 0;
	while (!computer.halted) {
		const key = `${x},${y}`;
		const output = computer.run([Number(white.has(key))]);
		if (output.length === 0 && computer.halted) break;
		if (output.length !== 2)
			throw new Error("Expected one paint and turn instruction");
		const [color, turn] = output;
		if (color === 1) white.add(key);
		else white.delete(key);
		painted.add(key);
		facing = (facing + (turn === 1 ? 1 : 3)) % 4;
		x += directions[facing][0];
		y += directions[facing][1];
	}
	return { white, painted };
}

export const part1 = (input: string) => paint(input, false).painted.size;

export function registration(input: string): string {
	const { white } = paint(input, true);
	if (!white.size) return "";
	const points = [...white].map((cell) => cell.split(",").map(Number));
	const xs = points.map(([x]) => x),
		ys = points.map(([, y]) => y);
	const left = Math.min(...xs),
		top = Math.min(...ys);
	return Array.from({ length: Math.max(...ys) - top + 1 }, (_, y) =>
		Array.from({ length: Math.max(...xs) - left + 1 }, (_, x) =>
			white.has(`${x + left},${y + top}`) ? "#" : " ",
		).join(""),
	).join("\n");
}

export const part2 = (input: string) =>
	decodeLetters(registration(input).split("\n"));

if (import.meta.main) run(import.meta.url, part1, part2);
