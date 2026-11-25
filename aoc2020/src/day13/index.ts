import { run } from "../../../scripts/aoc.ts";
import { combine } from "../../../scripts/congruence.ts";

function schedule(input: string) {
	const [earliest, departures] = input.trim().split(/\r?\n/);
	return {
		earliest: Number(earliest),
		buses: departures
			.split(",")
			.flatMap((bus, offset) =>
				bus === "x" ? [] : [{ id: BigInt(bus), offset: BigInt(offset) }],
			),
	};
}

export function part1(input: string) {
	const { earliest, buses } = schedule(input);
	let shortest = Infinity;
	let answer = 0;
	for (const { id } of buses) {
		const bus = Number(id);
		const wait = (bus - (earliest % bus)) % bus;
		if (wait < shortest) {
			shortest = wait;
			answer = bus * wait;
		}
	}
	return answer;
}

export function part2(input: string) {
	let alignment = { at: 0n, period: 1n };
	for (const { id, offset } of schedule(input).buses) {
		const next = combine(alignment, { at: -offset, period: id });
		if (!next) throw new Error("Inconsistent bus schedule");
		alignment = next;
	}
	return alignment.at;
}

if (import.meta.main) run(import.meta.url, part1, part2);
