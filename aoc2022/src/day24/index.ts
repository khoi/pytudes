import { run } from "../../../scripts/aoc.ts";

type Position = [number, number];
const moves = [
	[0, 0],
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
];
const mod = (n: number, size: number) => ((n % size) + size) % size;

function journey(input: string, trips: number): number {
	const map = input.trim().split(/\r?\n/);
	const width = map[0].length - 2;
	const height = map.length - 2;
	const entry: Position = [map[0].indexOf(".") - 1, -1];
	const exit: Position = [map.at(-1)!.indexOf(".") - 1, height];
	function gcd(a: number, b: number): number {
		return b === 0 ? a : gcd(b, a % b);
	}
	const period = (width * height) / gcd(width, height);
	function open(x: number, y: number, time: number): boolean {
		return (
			map[y + 1][1 + mod(x - time, width)] !== ">" &&
			map[y + 1][1 + mod(x + time, width)] !== "<" &&
			map[1 + mod(y - time, height)][x + 1] !== "v" &&
			map[1 + mod(y + time, height)][x + 1] !== "^"
		);
	}
	function travel(from: Position, to: Position, time: number): number {
		let frontier = [from];
		const seen = new Set<number>();
		while (frontier.length) {
			time++;
			const next: Position[] = [];
			for (const [x, y] of frontier) {
				for (const [dx, dy] of moves) {
					const nx = x + dx;
					const ny = y + dy;
					if (nx === to[0] && ny === to[1]) return time;
					if (nx !== from[0] || ny !== from[1]) {
						if (
							nx < 0 ||
							ny < 0 ||
							nx >= width ||
							ny >= height ||
							!open(nx, ny, time)
						)
							continue;
					}
					const key = ((time % period) * (height + 2) + ny + 1) * width + nx;
					if (seen.has(key)) continue;
					seen.add(key);
					next.push([nx, ny]);
				}
			}
			frontier = next;
		}
		throw new Error("No route through the valley");
	}
	let time = 0;
	for (let trip = 0; trip < trips; trip++) {
		time =
			trip % 2 === 0 ? travel(entry, exit, time) : travel(exit, entry, time);
	}
	return time;
}

export const part1 = (input: string) => journey(input, 1);
export const part2 = (input: string) => journey(input, 3);

if (import.meta.main) run(import.meta.url, part1, part2);
