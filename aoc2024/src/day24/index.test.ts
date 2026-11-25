import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("assembles output bits in descending significance", () => {
	const circuit = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;
	expect(part1(circuit)).toBe(4n);
});

const adder = `x00: 1
y00: 1
x01: 0
y01: 1
x02: 1
y02: 0

x00 XOR y00 -> z00
x00 AND y00 -> c01
x01 XOR y01 -> p01
x01 AND y01 -> g01
p01 XOR c01 -> z01
p01 AND c01 -> h01
g01 OR h01 -> c02
x02 XOR y02 -> p02
x02 AND y02 -> g02
p02 XOR c02 -> z02
p02 AND c02 -> h02
g02 OR h02 -> z03`;

test("leaves a correct ripple-carry adder intact", () => {
	expect(part1(adder)).toBe(8n);
	expect(part2(adder)).toBe("");
});

test("recovers swaps between internal wires and sum bits", () => {
	const swaps = new Map([
		["p01", "g02"],
		["g02", "p01"],
		["z01", "h02"],
		["h02", "z01"],
	]);
	const broken = adder.replace(
		/-> (\w+)/g,
		(_, wire: string) => "-> " + (swaps.get(wire) ?? wire),
	);
	expect(part2(broken)).toBe("g02,h02,p01,z01");
});
