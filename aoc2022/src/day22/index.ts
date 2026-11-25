import { run } from "../../../scripts/aoc.ts";

type Face = {
	x: number;
	y: number;
	right: number;
	down: number;
	normal: number;
};
type Step = { x: number; y: number; direction: number };
type Wrap = (x: number, y: number, direction: number) => Step;
const offsets = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];

function flatWrap(board: string[]): Wrap {
	const width = board[0].length;
	const height = board.length;
	return (x, y, direction) => {
		const [dx, dy] = offsets[direction];
		do {
			x = (x + dx + width) % width;
			y = (y + dy + height) % height;
		} while (board[y][x] === " ");
		return { x, y, direction };
	};
}

function cubeWrap(board: string[]): Wrap {
	const area = board.reduce(
		(sum, row) => sum + row.replaceAll(" ", "").length,
		0,
	);
	const side = Math.sqrt(area / 6);
	const originX = Math.min(
		...board.map((row) => row.search(/\S/)).filter((x) => x >= 0),
	);
	const first: Face = {
		x: Math.floor((board[0].indexOf(".") - originX) / side),
		y: 0,
		right: 1,
		down: 2,
		normal: 3,
	};
	const faces = new Map([[[first.x, 0].join(","), first]]);
	const queue = [first];
	for (let i = 0; i < queue.length; i++) {
		const { x, y, right, down, normal } = queue[i];
		const folds = [
			[-normal, down, right],
			[right, -normal, down],
			[normal, down, -right],
			[right, normal, -down],
		];
		for (let d = 0; d < 4; d++) {
			const nx = x + offsets[d][0];
			const ny = y + offsets[d][1];
			const tile = board[ny * side]?.[originX + nx * side];
			const key = [nx, ny].join(",");
			if (!tile || tile === " " || faces.has(key)) continue;
			const [r, b, n] = folds[d];
			const face = { x: nx, y: ny, right: r, down: b, normal: n };
			faces.set(key, face);
			queue.push(face);
		}
	}

	const tangents = (face: Face) => [
		face.right,
		face.down,
		-face.right,
		-face.down,
	];
	const byNormal = new Map(queue.map((face) => [face.normal, face]));
	return (x, y, direction) => {
		const face = faces.get(
			[Math.floor((x - originX) / side), Math.floor(y / side)].join(","),
		)!;
		const next = byNormal.get(tangents(face)[direction])!;
		const heading = tangents(next).indexOf(-face.normal);
		const sourceAxis = direction % 2 === 0 ? face.down : face.right;
		const targetAxis = heading % 2 === 0 ? next.down : next.right;
		let offset = (direction % 2 === 0 ? y : x - originX) % side;
		if (sourceAxis !== targetAxis) offset = side - 1 - offset;
		const targetX = [0, offset, side - 1, offset][heading];
		const targetY = [offset, 0, offset, side - 1][heading];
		return {
			x: originX + next.x * side + targetX,
			y: next.y * side + targetY,
			direction: heading,
		};
	};
}

function password(input: string, wrapper: (board: string[]) => Wrap): number {
	const [map, path] = input.trimEnd().replaceAll("\r", "").split("\n\n");
	const rows = map.split("\n");
	const width = Math.max(...rows.map((row) => row.length));
	const board = rows.map((row) => row.padEnd(width));
	const wrap = wrapper(board);
	let x = board[0].indexOf(".");
	let y = 0;
	let direction = 0;
	for (const token of path.match(/\d+|L|R/g)!) {
		if (token === "L" || token === "R") {
			direction = (direction + (token === "R" ? 1 : 3)) % 4;
			continue;
		}
		for (let i = 0; i < Number(token); i++) {
			const [dx, dy] = offsets[direction];
			let next = { x: x + dx, y: y + dy, direction };
			const tile = board[next.y]?.[next.x];
			if (!tile || tile === " ") next = wrap(x, y, direction);
			if (board[next.y][next.x] === "#") break;
			({ x, y, direction } = next);
		}
	}
	return 1000 * (y + 1) + 4 * (x + 1) + direction;
}

export const part1 = (input: string) => password(input, flatWrap);
export const part2 = (input: string) => password(input, cubeWrap);

if (import.meta.main) run(import.meta.url, part1, part2);
