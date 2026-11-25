import { run } from "../../../scripts/aoc.ts";

type Expression = bigint | { left: string; operator: string; right: string };

function parse(input: string) {
	const jobs = new Map<string, Expression>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [name, job] = line.split(": ");
		const [left, operator, right] = job.split(" ");
		jobs.set(name, operator ? { left, operator, right } : BigInt(left));
	}
	return jobs;
}

function apply(operator: string, a: bigint, b: bigint): bigint {
	switch (operator) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			return a / b;
		default:
			throw new Error("Unknown operation " + operator);
	}
}

function evaluator(jobs: Map<string, Expression>, unknown?: string) {
	const cache = new Map<string, bigint | null>();
	function value(name: string): bigint | null {
		if (name === unknown) return null;
		if (cache.has(name)) return cache.get(name)!;
		const job = jobs.get(name)!;
		if (typeof job === "bigint") return job;
		const a = value(job.left);
		const b = value(job.right);
		const result = a === null || b === null ? null : apply(job.operator, a, b);
		cache.set(name, result);
		return result;
	}
	return value;
}

export function part1(input: string): number {
	return Number(evaluator(parse(input))("root"));
}

export function part2(input: string): number {
	const jobs = parse(input);
	const value = evaluator(jobs, "humn");
	const root = jobs.get("root")!;
	if (typeof root === "bigint") throw new Error("Expected an equation at root");
	let branch = value(root.left) === null ? root.left : root.right;
	let target = value(branch === root.left ? root.right : root.left)!;
	while (branch !== "humn") {
		const job = jobs.get(branch)!;
		if (typeof job === "bigint") throw new Error("Missing unknown");
		const left = value(job.left);
		if (left === null) {
			const right = value(job.right)!;
			switch (job.operator) {
				case "+":
					target -= right;
					break;
				case "-":
					target += right;
					break;
				case "*":
					target /= right;
					break;
				case "/":
					target *= right;
					break;
			}
			branch = job.left;
		} else {
			switch (job.operator) {
				case "+":
					target -= left;
					break;
				case "-":
					target = left - target;
					break;
				case "*":
					target /= left;
					break;
				case "/":
					target = left / target;
					break;
			}
			branch = job.right;
		}
	}
	return Number(target);
}

if (import.meta.main) run(import.meta.url, part1, part2);
