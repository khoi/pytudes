import { expect, test } from "bun:test";
import { alignment, movement } from "./index.ts";

test("camera intersections use both coordinates", () => {
	expect(alignment(["....#..", "....#..", "..#####", "....^.."])).toBe(8);
});
test("movement routines expand into a path for the camera map", () => {
	const [main, ...routines] = movement(["..##", "..#.", "^##."]);
	expect([main, ...routines].every((line) => line.length <= 20)).toBe(true);
	expect(
		main
			.split(",")
			.map((id) => routines["ABC".indexOf(id)])
			.join(","),
	).toBe("R,2,L,2,R,1");
});

test("a route through intersections fits into three reusable routines", () => {
	const grid = [
		"#######...#####",
		"#.....#...#...#",
		"#.....#...#...#",
		"......#...#...#",
		"......#...###.#",
		"......#.....#.#",
		"^########...#.#",
		"......#.#...#.#",
		"......#########",
		"........#...#..",
		"....#########..",
		"....#...#......",
		"....#...#......",
		"....#...#......",
		"....#####......",
	];
	const [main, ...routines] = movement(grid);
	expect([main, ...routines].every((line) => line.length <= 20)).toBe(true);
	const moves = main
		.split(",")
		.flatMap((id) => routines["ABC".indexOf(id)].split(","));
	let x = 0,
		y = 6,
		direction = 0;
	const visited = new Set(["0,6"]);
	for (let i = 0; i < moves.length; i += 2) {
		direction = (direction + (moves[i] === "R" ? 1 : 3)) % 4;
		const [dx, dy] = [
			[0, -1],
			[1, 0],
			[0, 1],
			[-1, 0],
		][direction];
		for (let n = 0; n < Number(moves[i + 1]); n++) {
			x += dx;
			y += dy;
			expect(grid[y]?.[x]).toMatch(/[#^]/);
			visited.add([x, y].join(","));
		}
	}
	expect(visited.size).toBe(grid.join("").match(/[#^]/g)!.length);
});
