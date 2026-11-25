import { run } from "../../../scripts/aoc.ts";

type Transform = (word: string) => string;

function rotate(word: string, steps: number) {
	const start = ((-steps % word.length) + word.length) % word.length;
	return word.slice(start) + word.slice(0, start);
}

function operation(line: string, reverse: boolean): Transform {
	const words = line.split(" ");
	const [action, kind, first] = words;
	const second = words.at(-1)!;
	const a = Number(first);
	const b = Number(second);
	if (action === "swap" && kind === "position") {
		return (word) => {
			const letters = [...word];
			[letters[a], letters[b]] = [letters[b], letters[a]];
			return letters.join("");
		};
	}
	if (action === "swap" && kind === "letter") {
		return (word) =>
			[...word]
				.map((ch) => (ch === first ? second : ch === second ? first : ch))
				.join("");
	}
	if (action === "rotate" && kind !== "based") {
		const steps = kind === "right" ? a : -a;
		return (word) => rotate(word, reverse ? -steps : steps);
	}
	if (action === "rotate" && kind === "based") {
		return (word) => {
			const index = word.indexOf(second);
			return rotate(word, index + 1 + Number(index >= 4));
		};
	}
	if (action === "reverse") {
		return (word) =>
			word.slice(0, a) +
			[...word.slice(a, b + 1)].reverse().join("") +
			word.slice(b + 1);
	}
	if (action === "move") {
		return (word) => {
			const letters = [...word];
			const [from, to] = reverse ? [b, a] : [a, b];
			const [letter] = letters.splice(from, 1);
			letters.splice(to, 0, letter);
			return letters.join("");
		};
	}
	throw new Error(`Unknown scramble instruction: ${line}`);
}

export function part1(input: string, start = "abcdefgh") {
	let word = start;
	for (const line of input.trim().split(/\r?\n/))
		word = operation(line, false)(word);
	return word;
}

export function originals(input: string, scrambled: string) {
	let words = new Set([scrambled]);
	for (const line of input.trim().split(/\r?\n/).reverse()) {
		const transform = operation(line, true);
		const previous = new Set<string>();
		for (const word of words) {
			if (line.startsWith("rotate based")) {
				for (let i = 0; i < word.length; i++) {
					const guess = rotate(word, i);
					if (transform(guess) === word) previous.add(guess);
				}
			} else {
				previous.add(transform(word));
			}
		}
		words = previous;
	}
	return words;
}

export function part2(input: string, target = "fbgdceah") {
	const candidates = originals(input, target);
	if (candidates.size !== 1)
		throw new Error(`Found ${candidates.size} possible original passwords`);
	return candidates.values().next().value!;
}

if (import.meta.main) run(import.meta.url, part1, part2);
