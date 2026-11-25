import { run } from "../../../scripts/aoc.ts";

const moves: Record<string, [number, number]> = {
	U: [0, -1],
	D: [0, 1],
	L: [-1, 0],
	R: [1, 0],
};

function bathroomCode(input: string, keypad: string[]): string {
	let y = keypad.findIndex((row) => row.includes("5"));
	let x = keypad[y].indexOf("5");
	let code = "";
	for (const line of input.trim().split(/\r?\n/)) {
		for (const direction of line) {
			const [dx, dy] = moves[direction];
			const next = keypad[y + dy]?.[x + dx];
			if (next && next !== " ") {
				x += dx;
				y += dy;
			}
		}
		code += keypad[y][x];
	}
	return code;
}

export const part1 = (input: string) =>
	bathroomCode(input, ["123", "456", "789"]);
export const part2 = (input: string) =>
	bathroomCode(input, ["  1  ", " 234 ", "56789", " ABC ", "  D  "]);

if (import.meta.main) run(import.meta.url, part1, part2);
