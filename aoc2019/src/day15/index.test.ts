import { expect, test } from "bun:test";
import { explore } from "./index.ts";

class CorridorDroid {
	constructor(private x = 0) {}
	clone() {
		return new CorridorDroid(this.x);
	}
	run([command]: number[]) {
		const dx = command === 3 ? -1 : command === 4 ? 1 : 0;
		const target = this.x + dx;
		if (!dx || target < -1 || target > 3) return [0];
		this.x = target;
		return [target === -1 ? 2 : 1];
	}
}

test("oxygen takes longer to reach the far wall than the repair droid takes to find oxygen", () => {
	expect(explore(new CorridorDroid())).toEqual({ distance: 1, minutes: 4 });
});
