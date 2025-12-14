import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	const tiles = input.trim().split("\n").map(line => line.split(",").map(Number));
	let maxArea = 0;

	for (let i = 0; i < tiles.length; i++) {
		for (let j = i + 1; j < tiles.length; j++) {
			const [x1, y1] = tiles[i];
			const [x2, y2] = tiles[j];
			const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
			maxArea = Math.max(maxArea, area);
		}
	}

	return maxArea;
}

export function part2(input: string): number {
	const tiles = input.trim().split("\n").map(line => line.split(",").map(Number));

	let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
	const xsSet = new Set<number>();
	const ysSet = new Set<number>();

	for (const [x, y] of tiles) {
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
		xsSet.add(x);
		xsSet.add(x + 1);
		ysSet.add(y);
		ysSet.add(y + 1);
	}

	xsSet.add(minX - 1);
	xsSet.add(maxX + 1);
	ysSet.add(minY - 1);
	ysSet.add(maxY + 1);

	const xs = [...xsSet].sort((a, b) => a - b);
	const ys = [...ysSet].sort((a, b) => a - b);
	const xCount = xs.length - 1;
	const yCount = ys.length - 1;
	const xWidths = xs.slice(1).map((x, i) => x - xs[i]);
	const yHeights = ys.slice(1).map((y, i) => y - ys[i]);

	const findIndex = (arr: number[], value: number): number => {
		let lo = 0, hi = arr.length - 2;
		while (lo <= hi) {
			const mid = (lo + hi) >> 1;
			if (arr[mid] <= value && value < arr[mid + 1]) return mid;
			if (value < arr[mid]) hi = mid - 1;
			else lo = mid + 1;
		}
		throw new Error(`value ${value} not found in compressed coords`);
	};

	const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
	const boundary = Array.from({ length: yCount }, () => new Array<boolean>(xCount).fill(false));

	for (let i = 0; i < tiles.length; i++) {
		const [x1, y1] = tiles[i];
		const [x2, y2] = tiles[(i + 1) % tiles.length];
		edges.push({ x1, y1, x2, y2 });

		if (x1 === x2) {
			const yStart = Math.min(y1, y2);
			const yEnd = Math.max(y1, y2);
			const xIdx = findIndex(xs, x1);
			const yStartIdx = findIndex(ys, yStart);
			const yEndIdx = findIndex(ys, yEnd);
			for (let yIdx = yStartIdx; yIdx <= yEndIdx; yIdx++) {
				boundary[yIdx][xIdx] = true;
			}
		} else {
			const xStart = Math.min(x1, x2);
			const xEnd = Math.max(x1, x2);
			const yIdx = findIndex(ys, y1);
			const xStartIdx = findIndex(xs, xStart);
			const xEndIdx = findIndex(xs, xEnd);
			for (let xIdx = xStartIdx; xIdx <= xEndIdx; xIdx++) {
				boundary[yIdx][xIdx] = true;
			}
		}
	}

	const verticalEdges = edges
		.filter(e => e.x1 === e.x2)
		.map(e => ({ x: e.x1, yMin: Math.min(e.y1, e.y2), yMax: Math.max(e.y1, e.y2) }));

	const valid = Array.from({ length: yCount }, () => new Array<boolean>(xCount).fill(false));

	for (let yIdx = 0; yIdx < yCount; yIdx++) {
		const yMid = ys[yIdx] + yHeights[yIdx] / 2;
		const crossings = verticalEdges
			.filter(e => yMid >= e.yMin && yMid < e.yMax)
			.map(e => e.x)
			.sort((a, b) => a - b);

		const uniqueCrossings = [...new Set(crossings)];

		let inside = false, crossIdx = 0;
		for (let xIdx = 0; xIdx < xCount; xIdx++) {
			const xMid = xs[xIdx] + xWidths[xIdx] / 2;
			while (crossIdx < uniqueCrossings.length && uniqueCrossings[crossIdx] <= xMid) {
				inside = !inside;
				crossIdx++;
			}
			valid[yIdx][xIdx] = inside || boundary[yIdx][xIdx];
		}
	}

	const prefix = Array.from({ length: yCount + 1 }, () => new Array<number>(xCount + 1).fill(0));
	for (let yIdx = 0; yIdx < yCount; yIdx++) {
		let rowSum = 0;
		for (let xIdx = 0; xIdx < xCount; xIdx++) {
			if (valid[yIdx][xIdx]) rowSum += xWidths[xIdx] * yHeights[yIdx];
			prefix[yIdx + 1][xIdx + 1] = prefix[yIdx][xIdx + 1] + rowSum;
		}
	}

	let maxArea = 0;
	for (let i = 0; i < tiles.length; i++) {
		for (let j = i + 1; j < tiles.length; j++) {
			const [x1, y1] = tiles[i];
			const [x2, y2] = tiles[j];
			const xMin = Math.min(x1, x2);
			const xMax = Math.max(x1, x2);
			const yMin = Math.min(y1, y2);
			const yMax = Math.max(y1, y2);
			const area = (xMax - xMin + 1) * (yMax - yMin + 1);

			const xStartIdx = findIndex(xs, xMin);
			const xEndIdx = findIndex(xs, xMax);
			const yStartIdx = findIndex(ys, yMin);
			const yEndIdx = findIndex(ys, yMax);

			const validArea =
				prefix[yEndIdx + 1][xEndIdx + 1] -
				prefix[yStartIdx][xEndIdx + 1] -
				prefix[yEndIdx + 1][xStartIdx] +
				prefix[yStartIdx][xStartIdx];

			if (validArea === area && area > maxArea) {
				maxArea = area;
			}
		}
	}

	return maxArea;
}

console.log("Sample Part 1:", part1(sample));
console.log("Sample Part 2:", part2(sample));
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
