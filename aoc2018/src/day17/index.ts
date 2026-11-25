import { run } from "../../../scripts/aoc.ts";

function reservoir(input: string) {
	const ground = new Map<string, string>();
	let minY = Infinity,
		maxY = -Infinity;
	for (const line of input.trim().split(/\r?\n/)) {
		const [, axis, fixed, low, high] =
			/^([xy])=(\d+), [xy]=(\d+)\.\.(\d+)$/.exec(line)!;
		for (let n = +low; n <= +high; n++) {
			const [x, y] = axis === "x" ? [+fixed, n] : [n, +fixed];
			ground.set(`${x},${y}`, "#");
			minY = Math.min(minY, y);
			maxY = Math.max(maxY, y);
		}
	}
	function fill(x: number, y: number): boolean {
		if (y > maxY) return false;
		const key = `${x},${y}`;
		const current = ground.get(key);
		if (current) return current !== "|";
		ground.set(key, "|");
		if (!fill(x, y + 1)) return false;
		function spread(direction: number) {
			let edge = x;
			while (ground.get(`${edge + direction},${y}`) !== "#") {
				edge += direction;
				ground.set(`${edge},${y}`, "|");
				if (!fill(edge, y + 1)) return { edge, enclosed: false };
			}
			return { edge, enclosed: true };
		}
		const left = spread(-1),
			right = spread(1);
		if (!left.enclosed || !right.enclosed) return false;
		for (let i = left.edge; i <= right.edge; i++) ground.set(`${i},${y}`, "~");
		return true;
	}
	fill(500, 0);
	let reached = 0,
		retained = 0;
	for (const [key, cell] of ground) {
		if (Number(key.slice(key.indexOf(",") + 1)) < minY || cell === "#")
			continue;
		reached++;
		if (cell === "~") retained++;
	}
	return { reached, retained };
}

export const part1 = (input: string) => reservoir(input).reached;
export const part2 = (input: string) => reservoir(input).retained;

if (import.meta.main) run(import.meta.url, part1, part2);
