import { run } from "../../../scripts/aoc.ts";

function* rooms(input: string) {
	for (const line of input.trim().split(/\r?\n/)) {
		const match = /^([a-z-]+)-(\d+)\[([a-z]+)\]$/.exec(line);
		if (!match) throw new Error(`Invalid room: ${line}`);
		const [, name, sector, checksum] = match;
		const counts = new Map<string, number>();
		for (const ch of name) {
			if (ch !== "-") counts.set(ch, (counts.get(ch) ?? 0) + 1);
		}
		const top = [...counts]
			.sort(([a, ca], [b, cb]) => cb - ca || a.localeCompare(b))
			.slice(0, 5)
			.map(([ch]) => ch)
			.join("");
		if (top === checksum) yield { name, sector: Number(sector) };
	}
}

export function decrypt(name: string, sector: number): string {
	return [...name]
		.map((ch) =>
			ch === "-"
				? " "
				: String.fromCharCode(97 + ((ch.charCodeAt(0) - 97 + sector) % 26)),
		)
		.join("");
}

export function part1(input: string): number {
	let total = 0;
	for (const room of rooms(input)) total += room.sector;
	return total;
}

export function part2(input: string): number {
	for (const { name, sector } of rooms(input)) {
		if (decrypt(name, sector) === "northpole object storage") return sector;
	}
	throw new Error("North Pole storage room missing");
}

if (import.meta.main) run(import.meta.url, part1, part2);
