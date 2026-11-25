import { run } from "../../../scripts/aoc.ts";

function business(input: string, rounds: number, relief: boolean) {
	const monkeys = input
		.trim()
		.split(/\r?\n\s*\r?\n/)
		.map((block) => {
			const [, items, operation, test, yes, no] = block.split(/\r?\n/);
			const [, operator, operand] = operation.match(
				/new = old ([+*]) (\d+|old)/,
			)!;
			return {
				items: (items.match(/\d+/g) ?? []).map(BigInt),
				operator,
				operand: operand === "old" ? undefined : BigInt(operand),
				divisor: BigInt(test.match(/\d+/)![0]),
				yes: Number(yes.match(/\d+/)![0]),
				no: Number(no.match(/\d+/)![0]),
				inspections: 0,
			};
		});
	const modulus = monkeys.reduce((product, m) => product * m.divisor, 1n);
	for (let round = 0; round < rounds; round++) {
		for (const monkey of monkeys) {
			for (const old of monkey.items) {
				const operand = monkey.operand ?? old;
				const raw = monkey.operator === "*" ? old * operand : old + operand;
				const worry = relief ? raw / 3n : raw % modulus;
				const target = worry % monkey.divisor === 0n ? monkey.yes : monkey.no;
				monkeys[target].items.push(worry);
				monkey.inspections++;
			}
			monkey.items = [];
		}
	}
	const [first, second] = monkeys
		.map((m) => m.inspections)
		.sort((a, b) => b - a);
	return first * second;
}

export function part1(input: string) {
	return business(input, 20, true);
}

export function part2(input: string) {
	return business(input, 10000, false);
}

if (import.meta.main) run(import.meta.url, part1, part2);
