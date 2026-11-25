import { run } from "../../../scripts/aoc.ts";

function axes(input: string): number[][] {
	const moons = input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.match(/-?\d+/g)!.map(Number));
	return [0, 1, 2].map((axis) => moons.map((moon) => moon[axis]));
}

function step(positions: number[], velocities: number[]): void {
	for (let i = 0; i < positions.length; i++) {
		for (let j = i + 1; j < positions.length; j++) {
			const change = Math.sign(positions[j] - positions[i]);
			velocities[i] += change;
			velocities[j] -= change;
		}
	}
	for (let i = 0; i < positions.length; i++) positions[i] += velocities[i];
}

export function part1(input: string, steps = 1000): number {
	const positions = axes(input);
	const velocities = positions.map((axis) => axis.map(() => 0));
	for (let t = 0; t < steps; t++) {
		for (let axis = 0; axis < 3; axis++)
			step(positions[axis], velocities[axis]);
	}
	return positions[0].reduce((total, _, moon) => {
		const energy = (coords: number[][]) =>
			coords.reduce((sum, axis) => sum + Math.abs(axis[moon]), 0);
		return total + energy(positions) * energy(velocities);
	}, 0);
}

export function part2(input: string): number {
	const periods = axes(input).map((start) => {
		const positions = start.slice(),
			velocities = start.map(() => 0);
		let steps = 0;
		do {
			step(positions, velocities);
			steps++;
		} while (positions.some((x, i) => x !== start[i] || velocities[i] !== 0));
		return steps;
	});
	return periods.reduce((combined, period) => {
		let a = combined,
			b = period;
		while (b) [a, b] = [b, a % b];
		return (combined / a) * period;
	});
}

if (import.meta.main) run(import.meta.url, part1, part2);
