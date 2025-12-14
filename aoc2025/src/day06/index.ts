import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function findProblems(lines: string[]) {
	const width = Math.max(...lines.map(line => line.length));
	const isSeparator = (col: number) =>
		lines.every(line => !line[col] || line[col] === ' ');

	const problems: { start: number, end: number }[] = [];
	let inProblem = false;
	let start = 0;

	for (let col = 0; col < width; col++) {
		if (!isSeparator(col) && !inProblem) {
			inProblem = true;
			start = col;
		} else if (isSeparator(col) && inProblem) {
			problems.push({ start, end: col - 1 });
			inProblem = false;
		}
	}

	if (inProblem) {
		problems.push({ start, end: width - 1 });
	}

	return problems;
}

function findOperator(operatorLine: string, start: number, end: number) {
	for (let col = start; col <= end; col++) {
		if (operatorLine[col] === '+' || operatorLine[col] === '*') {
			return operatorLine[col];
		}
	}
	return '+';
}

function calculate(numbers: number[], operator: string) {
	return numbers.reduce((acc, n) => operator === '+' ? acc + n : acc * n);
}

export function part1(input: string): number {
	const lines = input.trim().split("\n");
	const problems = findProblems(lines);
	const operatorLine = lines[lines.length - 1];
	const numberLines = lines.slice(0, -1);

	let total = 0;
	for (const { start, end } of problems) {
		const operator = findOperator(operatorLine, start, end);
		const numbers: number[] = [];

		for (const line of numberLines) {
			const region = line.substring(start, end + 1);
			const matches = region.match(/\d+/g);
			if (matches) {
				numbers.push(...matches.map(Number));
			}
		}

		if (numbers.length > 0) {
			total += calculate(numbers, operator);
		}
	}

	return total;
}

export function part2(input: string): number {
	const lines = input.trim().split("\n");
	const problems = findProblems(lines);
	const operatorLine = lines[lines.length - 1];
	const numberLines = lines.slice(0, -1);

	let total = 0;
	for (const { start, end } of problems) {
		const operator = findOperator(operatorLine, start, end);
		const numbers: number[] = [];

		for (let col = end; col >= start; col--) {
			const digits = numberLines
				.map(line => line[col])
				.filter(char => char >= '0' && char <= '9')
				.join('');

			if (digits) {
				numbers.push(parseInt(digits));
			}
		}

		if (numbers.length > 0) {
			total += calculate(numbers, operator);
		}
	}

	return total;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
