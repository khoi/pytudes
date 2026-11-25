import { run } from "../../../scripts/aoc.ts";

function directorySizes(input: string) {
	const directories = new Map<string, number>([["/", 0]]);
	const files = new Set<string>();
	let path = ["/"];
	for (const line of input.trim().split(/\r?\n/)) {
		if (line.startsWith("$ cd ")) {
			const target = line.slice(5);
			if (target === "/") path = ["/"];
			else if (target === "..") {
				if (path.length > 1) path.pop();
			} else {
				path.push(path.at(-1) + target + "/");
			}
		} else if (/^\d/.test(line)) {
			const separator = line.indexOf(" ");
			const file = path.at(-1) + line.slice(separator + 1);
			if (files.has(file)) continue;
			files.add(file);
			const size = Number(line.slice(0, separator));
			for (const directory of path) {
				directories.set(directory, (directories.get(directory) ?? 0) + size);
			}
		}
	}
	return directories;
}

export function part1(input: string) {
	return [...directorySizes(input).values()]
		.filter((size) => size <= 100000)
		.reduce((a, b) => a + b, 0);
}

export function part2(input: string) {
	const sizes = directorySizes(input);
	const required = sizes.get("/")! - 40000000;
	if (required <= 0) return 0;
	return Math.min(...[...sizes.values()].filter((size) => size >= required));
}

if (import.meta.main) run(import.meta.url, part1, part2);
