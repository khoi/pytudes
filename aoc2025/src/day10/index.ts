import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function parseLine(line: string) {
	const target = line.match(/\[([.#]+)\]/)![1].split("").map(c => c === "#");
	const buttons = [...line.matchAll(/\(([0-9,]+)\)/g)].map(m => m[1].split(",").map(Number));
	return { target, buttons };
}

function countBits(n: number): number {
	let count = 0;
	while (n > 0) {
		count += n & 1;
		n >>= 1;
	}
	return count;
}

function solveMachine({ target, buttons }: { target: boolean[], buttons: number[][] }): number {
	let minPresses = Infinity;

	for (let mask = 0; mask < 1 << buttons.length; mask++) {
		const state = Array(target.length).fill(false);

		for (let b = 0; b < buttons.length; b++) {
			if (mask & (1 << b)) {
				for (const idx of buttons[b]) {
					state[idx] = !state[idx];
				}
			}
		}

		if (state.every((s, i) => s === target[i])) {
			minPresses = Math.min(minPresses, countBits(mask));
		}
	}

	return minPresses;
}

export function part1(input: string): number {
	return input.trim().split("\n")
		.map(line => solveMachine(parseLine(line)))
		.reduce((sum, n) => sum + n, 0);
}

function parseLineWithJoltage(line: string) {
	const buttons = [...line.matchAll(/\(([0-9,]+)\)/g)].map(m => m[1].split(",").map(Number));
	const joltage = line.match(/\{([0-9,]+)\}/)![1].split(",").map(Number);
	return { buttons, joltage };
}

function gcd(a: number, b: number): number {
	a = Math.abs(a);
	b = Math.abs(b);
	while (b) [a, b] = [b, a % b];
	return a;
}

class Rational {
	num: number;
	den: number;

	constructor(num: number, den = 1) {
		const sign = den < 0 ? -1 : 1;
		const g = gcd(num, den);
		this.num = (sign * num) / g;
		this.den = (sign * den) / g;
	}

	add(other: Rational) {
		return new Rational(this.num * other.den + other.num * this.den, this.den * other.den);
	}

	sub(other: Rational) {
		return new Rational(this.num * other.den - other.num * this.den, this.den * other.den);
	}

	mul(other: Rational) {
		return new Rational(this.num * other.num, this.den * other.den);
	}

	div(other: Rational) {
		return new Rational(this.num * other.den, this.den * other.num);
	}

	isZero() {
		return this.num === 0;
	}

	isInteger() {
		return this.den === 1;
	}

	toNumber() {
		return this.num / this.den;
	}
}

const ZERO = new Rational(0);
const ONE = new Rational(1);

function solveMachineJoltage(buttons: number[][], joltage: number[]): number {
	const n = joltage.length;
	const m = buttons.length;

	const matrix = Array.from({ length: n }, () => Array(m + 1).fill(ZERO));

	for (let b = 0; b < m; b++) {
		for (const idx of buttons[b]) {
			if (idx < n) matrix[idx][b] = ONE;
		}
	}

	for (let i = 0; i < n; i++) {
		matrix[i][m] = new Rational(joltage[i]);
	}

	let pivotRow = 0;
	const pivotCols: number[] = [];

	for (let col = 0; col < m && pivotRow < n; col++) {
		let maxRow = pivotRow;
		for (let row = pivotRow + 1; row < n; row++) {
			if (Math.abs(matrix[row][col].toNumber()) > Math.abs(matrix[maxRow][col].toNumber())) {
				maxRow = row;
			}
		}

		if (matrix[maxRow][col].isZero()) continue;

		[matrix[pivotRow], matrix[maxRow]] = [matrix[maxRow], matrix[pivotRow]];

		const pivot = matrix[pivotRow][col];
		for (let c = col; c <= m; c++) {
			matrix[pivotRow][c] = matrix[pivotRow][c].div(pivot);
		}

		for (let row = 0; row < n; row++) {
			if (row !== pivotRow && !matrix[row][col].isZero()) {
				const factor = matrix[row][col];
				for (let c = col; c <= m; c++) {
					matrix[row][c] = matrix[row][c].sub(factor.mul(matrix[pivotRow][c]));
				}
			}
		}

		pivotCols.push(col);
		pivotRow++;
	}

	const freeCols = Array.from({ length: m }, (_, i) => i).filter(i => !pivotCols.includes(i));
	const maxPress = buttons.map(indices => indices.length === 0 ? 0 : Math.min(...indices.map(i => joltage[i])));

	if (freeCols.length === 0) {
		const values = Array(m).fill(ZERO);
		for (let r = pivotCols.length - 1; r >= 0; r--) {
			const col = pivotCols[r];
			let sum = ZERO;
			for (let c = col + 1; c < m; c++) {
				sum = sum.add(matrix[r][c].mul(values[c]));
			}
			const val = matrix[r][m].sub(sum);
			if (!val.isInteger() || val.toNumber() < 0) return Infinity;
			values[col] = val;
		}
		return values.reduce((acc, v) => acc + v.toNumber(), 0);
	}

	const rank = pivotCols.length;
	const futureMin = Array.from({ length: rank }, () => Array(freeCols.length + 1).fill(ZERO));

	for (let row = 0; row < rank; row++) {
		for (let idx = freeCols.length - 1; idx >= 0; idx--) {
			const col = freeCols[idx];
			const coeff = matrix[row][col];
			const add = !coeff.isZero() && coeff.toNumber() < 0
				? coeff.mul(new Rational(maxPress[col]))
				: ZERO;
			futureMin[row][idx] = futureMin[row][idx + 1].add(add);
		}
	}

	let best = Infinity;

	function dfs(idx: number, contrib: Rational[], values: (number | undefined)[], presses: number) {
		if (idx === freeCols.length) {
			const result = values.slice();
			for (let r = rank - 1; r >= 0; r--) {
				const col = pivotCols[r];
				let sum = ZERO;
				for (let c = col + 1; c < m; c++) {
					if (result[c] !== undefined && !matrix[r][c].isZero()) {
						sum = sum.add(matrix[r][c].mul(new Rational(result[c]!)));
					}
				}
				const val = matrix[r][m].sub(sum);
				if (!val.isInteger() || val.toNumber() < 0) return;
				result[col] = val.toNumber();
			}
			const total = result.reduce((acc, v) => acc + (v ?? 0), 0);
			if (total < best) best = total;
			return;
		}

		const col = freeCols[idx];
		let upper = maxPress[col];

		for (let row = 0; row < rank; row++) {
			const coeff = matrix[row][col];
			if (coeff.isZero() || coeff.toNumber() <= 0) continue;

			const remaining = matrix[row][m].sub(contrib[row].add(futureMin[row][idx + 1]));
			if (remaining.toNumber() < 0) return;

			upper = Math.min(upper, Math.floor(remaining.div(coeff).toNumber() + 1e-9));
		}

		if (upper < 0) return;

		for (let t = 0; t <= upper; t++) {
			const nextContrib = contrib.map((v, row) => v.add(matrix[row][col].mul(new Rational(t))));

			if (nextContrib.some((v, row) => v.add(futureMin[row][idx + 1]).toNumber() - matrix[row][m].toNumber() > 1e-9)) {
				continue;
			}

			if (presses + t >= best) continue;

			const nextValues = values.slice();
			nextValues[col] = t;
			dfs(idx + 1, nextContrib, nextValues, presses + t);
		}
	}

	dfs(0, Array(rank).fill(ZERO), Array(m).fill(undefined), 0);
	return best;
}

export function part2(input: string): number {
	return input.trim().split("\n")
		.map(line => {
			const { buttons, joltage } = parseLineWithJoltage(line);
			return solveMachineJoltage(buttons, joltage);
		})
		.reduce((sum, n) => sum + n, 0);
}

if (import.meta.main) {
	console.log("Sample Part 1:", part1(sample));
	console.log("Sample Part 2:", part2(sample));
	console.log("Part 1:", part1(input));
	console.log("Part 2:", part2(input));
}
