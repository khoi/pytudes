import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

export function springScript(mode: "WALK" | "RUN") {
	const instructions = [
		"NOT A J",
		"NOT B T",
		"OR T J",
		"NOT C T",
		"OR T J",
		"AND D J",
	];
	if (mode === "RUN")
		instructions.push("NOT E T", "NOT T T", "OR H T", "AND T J");
	return [...instructions, mode].join("\n") + "\n";
}

function damage(input: string, mode: "WALK" | "RUN") {
	const script = Array.from(springScript(mode), (char) => char.charCodeAt(0));
	const output = new Intcode(input).run(script);
	const hull = output.at(-1);
	if (hull === undefined || hull <= 255)
		throw new Error(output.map((code) => String.fromCharCode(code)).join(""));
	return hull;
}

export function part1(input: string) {
	return damage(input, "WALK");
}
export function part2(input: string) {
	return damage(input, "RUN");
}

if (import.meta.main) run(import.meta.url, part1, part2);
