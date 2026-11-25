import { run } from "../../../scripts/aoc.ts";

type Vector = [number, number];
const cardinal: Record<string, Vector> = {
	E: [1, 0],
	N: [0, 1],
	W: [-1, 0],
	S: [0, -1],
};

function navigate(input: string, waypoint: boolean) {
	const ship: Vector = [0, 0];
	let bearing: Vector = waypoint ? [10, 1] : [1, 0];
	for (const instruction of input.trim().split(/\s+/)) {
		const command = instruction[0];
		const value = Number(instruction.slice(1));
		if (command === "L" || command === "R") {
			for (let angle = 0; angle < value; angle += 90) {
				bearing =
					command === "L"
						? [-bearing[1], bearing[0]]
						: [bearing[1], -bearing[0]];
			}
		} else {
			const [dx, dy] = command === "F" ? bearing : cardinal[command];
			const target = command === "F" || !waypoint ? ship : bearing;
			target[0] += dx * value;
			target[1] += dy * value;
		}
	}
	return Math.abs(ship[0]) + Math.abs(ship[1]);
}

export function part1(input: string) {
	return navigate(input, false);
}

export function part2(input: string) {
	return navigate(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
