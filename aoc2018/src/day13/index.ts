import { run } from "../../../scripts/aoc.ts";

function simulate(input: string, firstCrash: boolean): string {
	const track = input
		.trimEnd()
		.split(/\r?\n/)
		.map((row) => [...row]);
	const width = Math.max(...track.map((row) => row.length));
	type Cart = {
		x: number;
		y: number;
		direction: number;
		turn: number;
		crashed: boolean;
	};
	let carts: Cart[] = [];
	const occupied = new Map<number, Cart>();
	const directions = "^>v<";
	for (const [y, row] of track.entries()) {
		for (const [x, tile] of row.entries()) {
			const direction = directions.indexOf(tile);
			if (direction === -1) continue;
			const cart = { x, y, direction, turn: -1, crashed: false };
			carts.push(cart);
			occupied.set(y * width + x, cart);
			row[x] = direction % 2 ? "-" : "|";
		}
	}
	while (carts.length > 1) {
		carts.sort((a, b) => a.y - b.y || a.x - b.x);
		for (const cart of carts) {
			if (cart.crashed) continue;
			occupied.delete(cart.y * width + cart.x);
			cart.x += [0, 1, 0, -1][cart.direction];
			cart.y += [-1, 0, 1, 0][cart.direction];
			const key = cart.y * width + cart.x;
			const collision = occupied.get(key);
			if (collision) {
				if (firstCrash) return [cart.x, cart.y].join(",");
				cart.crashed = collision.crashed = true;
				occupied.delete(key);
				continue;
			}
			occupied.set(key, cart);
			switch (track[cart.y][cart.x]) {
				case "/":
					cart.direction ^= 1;
					break;
				case "\\":
					cart.direction ^= 3;
					break;
				case "+":
					cart.direction = (cart.direction + cart.turn + 4) % 4;
					cart.turn = cart.turn === 1 ? -1 : cart.turn + 1;
					break;
			}
		}
		carts = carts.filter((cart) => !cart.crashed);
	}
	if (firstCrash || carts.length === 0) throw new Error("No cart result");
	return [carts[0].x, carts[0].y].join(",");
}

export function part1(input: string): string {
	return simulate(input, true);
}

export function part2(input: string): string {
	return simulate(input, false);
}

if (import.meta.main) run(import.meta.url, part1, part2);
