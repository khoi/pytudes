import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

type Room = { name: string; exits: string[]; items: string[] };
const reverse: Record<string, string> = {
	north: "south",
	south: "north",
	east: "west",
	west: "east",
};

function parseRoom(text: string): Room {
	const last = text.split(/^== (.+) ==$/m);
	if (last.length < 3) throw new Error("Expected an adventure room");
	const body = last.at(-1)!;
	const entries = (heading: string) => {
		const lines = body.split(heading + "\n")[1]?.split("\n\n")[0] ?? "";
		return lines
			.split("\n")
			.filter((line) => line.startsWith("- "))
			.map((line) => line.slice(2));
	};
	return {
		name: last.at(-2)!,
		exits: entries("Doors here lead:"),
		items: entries("Items here:"),
	};
}

export interface Adventure {
	command(text: string, limit?: number): string;
	clone(): Adventure;
}

class Droid implements Adventure {
	constructor(private machine: Intcode) {}
	clone() {
		return new Droid(this.machine.clone());
	}
	command(text: string, limit = Infinity): string {
		const codes = text
			? Array.from(text + "\n", (char) => char.charCodeAt(0))
			: [];
		const response = this.machine.run(codes, limit);
		return response.map((code) => String.fromCharCode(code)).join("");
	}
}

export function escape(ship: Adventure): string {
	const visited = new Set<string>();
	const inventory: string[] = [];
	let checkpoint: string[] | undefined,
		pressureDoor: string | undefined,
		code: string | undefined;

	function attemptItem(item: string) {
		const trial = ship.clone();
		const take = trial.command("take " + item, 200000);
		if (!take.includes(`You take the ${item}.`) || !take.includes("Command?"))
			return;
		const drop = trial.clone().command("drop " + item, 200000);
		if (!drop.includes(`You drop the ${item}.`) || !drop.includes("Command?"))
			return;
		inventory.push(item);
		ship = trial;
	}

	function explore(room: Room, path: string[]) {
		visited.add(room.name);
		if (room.name === "Security Checkpoint") checkpoint = path;
		for (const item of room.items) attemptItem(item);
		for (const direction of room.exits) {
			if (direction === reverse[path.at(-1)!]) continue;
			const text = ship.command(direction);
			code = text.match(/typing (\d+) on the keypad/)?.[1];
			if (code) return;
			if (text.includes("ejected back to the checkpoint")) {
				pressureDoor = direction;
				continue;
			}
			const neighbor = parseRoom(text);
			if (!visited.has(neighbor.name)) explore(neighbor, [...path, direction]);
			if (code) return;
			ship.command(reverse[direction]);
		}
	}

	explore(parseRoom(ship.command("")), []);
	if (code) return code;
	if (!checkpoint || !pressureDoor)
		throw new Error("Missing pressure-sensitive floor");
	for (const direction of checkpoint) ship.command(direction);
	for (const item of inventory) ship.command("drop " + item);

	for (let mask = 0; mask < 2 ** inventory.length; mask++) {
		const trial = ship.clone();
		for (let i = 0; i < inventory.length; i++) {
			if (mask & (1 << i)) trial.command("take " + inventory[i]);
		}
		const text = trial.command(pressureDoor);
		const password = text.match(/typing (\d+) on the keypad/);
		if (password) return password[1];
	}
	throw new Error("No combination of items cleared the checkpoint");
}

export const part1 = (input: string) => escape(new Droid(new Intcode(input)));
if (import.meta.main) run(import.meta.url, part1);
