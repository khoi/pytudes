import { run } from "../../../scripts/aoc.ts";

function evaluate(line: string, additionFirst: boolean): number {
	const tokens = line.match(/\d+|[+*()]/g) ?? [];
	let position = 0;
	function expression(minimum: number): number {
		const first = tokens[position++];
		let value = first === "(" ? expression(0) : Number(first);
		if (first === "(" && tokens[position++] !== ")")
			throw new Error("Missing closing parenthesis");
		while (position < tokens.length && tokens[position] !== ")") {
			const operator = tokens[position];
			const precedence = additionFirst && operator === "+" ? 2 : 1;
			if (precedence < minimum) break;
			position++;
			const right = expression(precedence + 1);
			value = operator === "+" ? value + right : value * right;
		}
		return value;
	}
	return expression(0);
}

function sum(input: string, additionFirst: boolean): number {
	return input
		.trim()
		.split(/\r?\n/)
		.reduce((total, line) => total + evaluate(line, additionFirst), 0);
}

export function part1(input: string): number {
	return sum(input, false);
}

export function part2(input: string): number {
	return sum(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
