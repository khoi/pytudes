import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

type Point = readonly [number, number];

type Shape = {
	id: number;
	orientations: {
		w: number;
		h: number;
		cells: Point[];
	}[];
	maxDim: number;
};

type Region = {
	w: number;
	h: number;
	counts: number[];
};

function parse(input: string): { shapes: Shape[]; regions: Region[] } {
	const lines = input.trimEnd().split("\n");
	let i = 0;

	const rawShapes = new Map<number, string[]>();
	while (i < lines.length) {
		const line = lines[i]?.trimEnd() ?? "";
		if (line === "") {
			i++;
			continue;
		}
		if (!/^\d+:$/.test(line)) break;

		const id = Number.parseInt(line.slice(0, -1), 10);
		i++;
		const grid: string[] = [];
		while (i < lines.length) {
			const row = lines[i]?.trimEnd() ?? "";
			if (row === "") break;
			grid.push(row);
			i++;
		}
		rawShapes.set(id, grid);
	}

	const shapes: Shape[] = [...rawShapes.entries()]
		.sort(([a], [b]) => a - b)
		.map(([id, grid]) => {
			const points: Point[] = [];
			for (let y = 0; y < grid.length; y++) {
				const row = grid[y] ?? "";
				for (let x = 0; x < row.length; x++) {
					if (row[x] === "#") points.push([x, y]);
				}
			}

			function normalize(cells: Point[]) {
				let minX = Number.POSITIVE_INFINITY;
				let minY = Number.POSITIVE_INFINITY;
				let maxX = Number.NEGATIVE_INFINITY;
				let maxY = Number.NEGATIVE_INFINITY;
				for (const [x, y] of cells) {
					minX = Math.min(minX, x);
					minY = Math.min(minY, y);
					maxX = Math.max(maxX, x);
					maxY = Math.max(maxY, y);
				}
				const norm = cells
					.map(([x, y]) => [x - minX, y - minY] as const)
					.sort((a, b) => (a[1] - b[1] ? a[1] - b[1] : a[0] - b[0]));
				return { cells: norm, w: maxX - minX + 1, h: maxY - minY + 1 };
			}

			const seen = new Set<string>();
			const orientations: Shape["orientations"] = [];

			const transforms: ((p: Point) => Point)[] = [
				([x, y]) => [x, y],
				([x, y]) => [x, -y],
				([x, y]) => [-x, y],
				([x, y]) => [-x, -y],
				([x, y]) => [y, x],
				([x, y]) => [y, -x],
				([x, y]) => [-y, x],
				([x, y]) => [-y, -x],
			];

			for (const tf of transforms) {
				const { cells, w, h } = normalize(points.map(tf));
				const key = cells.map(([x, y]) => `${x},${y}`).join(";");
				if (seen.has(key)) continue;
				seen.add(key);
				orientations.push({ w, h, cells });
			}

			const maxDim = orientations.reduce((m, o) => Math.max(m, o.w, o.h), 0);
			return { id, orientations, maxDim };
		});

	const regions: Region[] = [];
	for (; i < lines.length; i++) {
		const line = (lines[i] ?? "").trim();
		if (!line) continue;
		const m = line.match(/^(\d+)x(\d+):\s+(.*)$/);
		if (!m) continue;
		const w = Number.parseInt(m[1] ?? "", 10);
		const h = Number.parseInt(m[2] ?? "", 10);
		const counts = (m[3] ?? "")
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.map((n) => Number.parseInt(n, 10));
		regions.push({ w, h, counts });
	}

	return { shapes, regions };
}

export function part1(input: string): number {
	const { shapes, regions } = parse(input);
	const globalMaxDim = shapes.reduce((m, s) => Math.max(m, s.maxDim), 0);

	let ok = 0;
	for (const region of regions) {
		const counts = region.counts.slice(0, shapes.length);
		const totalPieces = counts.reduce((a, b) => a + b, 0);
		if (totalPieces === 0) {
			ok++;
			continue;
		}

		const canUseBlockPacking =
			region.w >= globalMaxDim &&
			region.h >= globalMaxDim &&
			totalPieces <=
				Math.floor(region.w / globalMaxDim) * Math.floor(region.h / globalMaxDim);

		if (canUseBlockPacking) {
			ok++;
			continue;
		}
	}
	return ok;
}

export function part2(input: string): number {
	void input;
	return 1;
}

if (import.meta.main) {
	console.log("Part 1:", part1(input));
	console.log("Part 2:", part2(input));
}
