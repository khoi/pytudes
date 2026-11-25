import { run } from "../../../scripts/aoc.ts";

type Image = string[];

function orientations(image: Image): Image[] {
	const variants: Image[] = [];
	let rotated = image;
	for (let turn = 0; turn < 4; turn++) {
		variants.push(rotated, [...rotated].reverse());
		rotated = rotated[0].split("").map((_, x) =>
			rotated
				.map((row) => row[x])
				.reverse()
				.join(""),
		);
	}
	return variants;
}

function edges(image: Image): string[] {
	return [
		image[0],
		image.map((row) => row.at(-1)).join(""),
		image.at(-1)!,
		image.map((row) => row[0]).join(""),
	];
}

function canonical(edge: string): string {
	const reversed = [...edge].reverse().join("");
	return edge < reversed ? edge : reversed;
}

interface Tile {
	id: number;
	image: Image;
	top: string;
	right: string;
	bottom: string;
	left: string;
}

function assemble(input: string): { tiles: Tile[]; side: number } {
	const edgeCounts = new Map<string, number>();
	const options: Tile[] = [];
	const groups = input.trim().split(/\r?\n\r?\n/);
	const side = Math.sqrt(groups.length);
	for (const group of groups) {
		const [header, ...image] = group.split(/\r?\n/);
		const id = Number(header.match(/\d+/)![0]);
		for (const edge of edges(image).map(canonical))
			edgeCounts.set(edge, (edgeCounts.get(edge) ?? 0) + 1);
		for (const variant of orientations(image)) {
			const [top, right, bottom, left] = edges(variant);
			options.push({ id, image: variant, top, right, bottom, left });
		}
	}
	function byEdge(key: "top" | "left") {
		const index = new Map<string, Tile[]>();
		for (const tile of options) {
			const bucket = index.get(tile[key]);
			if (bucket) bucket.push(tile);
			else index.set(tile[key], [tile]);
		}
		return index;
	}
	const tops = byEdge("top");
	const lefts = byEdge("left");
	const allBordersUnique =
		[...edgeCounts.values()].filter((n) => n === 1).length === 4 * side;
	const unique = (edge: string) => edgeCounts.get(canonical(edge)) === 1;
	const placed: Tile[] = [];
	const used = new Set<number>();
	function fill(): boolean {
		const pos = placed.length;
		if (pos === groups.length) return true;
		const x = pos % side;
		const y = Math.floor(pos / side);
		const top = y > 0 ? placed[pos - side].bottom : undefined;
		const left = x > 0 ? placed[pos - 1].right : undefined;
		const choices =
			left !== undefined
				? lefts.get(left)
				: top !== undefined
					? tops.get(top)
					: options;
		for (const tile of choices ?? []) {
			if (used.has(tile.id) || (top !== undefined && top !== tile.top))
				continue;
			if (
				allBordersUnique &&
				(unique(tile.top) !== (y === 0) ||
					unique(tile.bottom) !== (y === side - 1) ||
					unique(tile.left) !== (x === 0) ||
					unique(tile.right) !== (x === side - 1))
			)
				continue;
			placed.push(tile);
			used.add(tile.id);
			if (fill()) return true;
			used.delete(tile.id);
			placed.pop();
		}
		return false;
	}
	if (!Number.isInteger(side) || !fill())
		throw new Error("Tiles do not form a square");
	return { tiles: placed, side };
}

export function part1(input: string): number {
	const { tiles, side } = assemble(input);
	return (
		tiles[0].id *
		tiles[side - 1].id *
		tiles[tiles.length - side].id *
		tiles.at(-1)!.id
	);
}

const monster = [
	"                  # ",
	"#    ##    ##    ###",
	" #  #  #  #  #  #   ",
];
const marks = monster.flatMap((row, y) =>
	[...row].flatMap((cell, x) => (cell === "#" ? [[x, y]] : [])),
);

export function part2(input: string): number {
	const { tiles, side } = assemble(input);
	const image: Image = [];
	for (let row = 0; row < side; row++) {
		const strip = tiles.slice(row * side, (row + 1) * side);
		for (let inner = 1; inner < strip[0].image.length - 1; inner++) {
			image.push(strip.map((tile) => tile.image[inner].slice(1, -1)).join(""));
		}
	}
	const total = image.join("").split("#").length - 1;
	let mostMarked = 0;
	for (const variant of orientations(image)) {
		const marked = new Set<number>();
		const width = variant[0].length;
		for (let y = 0; y <= variant.length - monster.length; y++) {
			for (let x = 0; x <= width - monster[0].length; x++) {
				if (!marks.every(([dx, dy]) => variant[y + dy][x + dx] === "#"))
					continue;
				for (const [dx, dy] of marks) marked.add((y + dy) * width + x + dx);
			}
		}
		mostMarked = Math.max(mostMarked, marked.size);
	}
	return total - mostMarked;
}

if (import.meta.main) run(import.meta.url, part1, part2);
