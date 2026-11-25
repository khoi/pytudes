import { expect, test } from "bun:test";
import { type Adventure, escape } from "./index.ts";

class TestShip implements Adventure {
	constructor(
		private room = "Hull",
		private inventory = new Set<string>(),
		private checkpointItems = new Set<string>(),
	) {}

	clone() {
		return new TestShip(
			this.room,
			new Set(this.inventory),
			new Set(this.checkpointItems),
		);
	}

	command(text: string): string {
		if (text === "north") this.room = "Security Checkpoint";
		if (text === "south") this.room = "Hull";
		if (text === "east") {
			if (this.inventory.size === 1 && this.inventory.has("coin"))
				return "Proceed by typing 12345 on the keypad.";
			return "Alert! You are ejected back to the checkpoint.";
		}
		if (text === "take trap") return "The droid is stuck forever.";
		if (text.startsWith("take ")) {
			const item = text.slice(5);
			if (
				this.room === "Security Checkpoint" &&
				!this.checkpointItems.delete(item)
			)
				throw new Error("Item is absent");
			this.inventory.add(item);
			return `You take the ${item}.\n\nCommand?`;
		}
		if (text.startsWith("drop ")) {
			const item = text.slice(5);
			if (!this.inventory.delete(item)) throw new Error("Item is absent");
			if (this.room === "Security Checkpoint") this.checkpointItems.add(item);
			return `You drop the ${item}.\n\nCommand?`;
		}
		const features =
			this.room === "Hull"
				? "- north\n\nItems here:\n- trap\n- mug\n- coin"
				: "- south\n- east";
		return `== ${this.room} ==\n\nDoors here lead:\n${features}\n\nCommand?`;
	}
}

test("explores the ship, isolates a dangerous pickup and finds the accepted inventory", () => {
	expect(escape(new TestShip())).toBe("12345");
});
