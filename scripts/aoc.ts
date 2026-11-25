import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type Solver = (input: string) => string | number | bigint;

export function readInput(moduleUrl: string, inputPath?: string): string {
	const current = new URL("./input.txt", moduleUrl);
	const day = new URL(".", moduleUrl).pathname.match(/\/day(\d+)\/$/)?.[1];
	const legacy = new URL(`../inputs/${day}.txt`, moduleUrl);
	const file = inputPath ?? (existsSync(current) ? current : legacy);
	if (!inputPath && !existsSync(file)) {
		throw new Error(
			`Puzzle input missing. Put your input in ${fileURLToPath(current)} or pass an input path.`,
		);
	}
	return readFileSync(file, "utf8")
		.replaceAll("\r\n", "\n")
		.replace(/\n+$/, "");
}

export function run(
	moduleUrl: string,
	part1: Solver,
	part2?: Solver,
	inputPath?: string,
): void {
	const input = readInput(moduleUrl, inputPath);
	console.log("Part 1:", String(part1(input)));
	if (part2) console.log("Part 2:", String(part2(input)));
}
