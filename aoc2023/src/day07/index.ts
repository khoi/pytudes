import { run } from "../../../scripts/aoc.ts";

function score(hand: string, jokers: boolean) {
	const valueOrder = jokers ? "J23456789TQKA" : "23456789TJQKA";
	const counts = new Map<string, number>();
	let wild = 0,
		tiebreak = 0;
	for (const card of hand) {
		tiebreak = tiebreak * 13 + valueOrder.indexOf(card);
		if (jokers && card === "J") wild++;
		else counts.set(card, (counts.get(card) ?? 0) + 1);
	}
	const [first = 0, second = 0] = [...counts.values()].sort((a, b) => b - a);
	return ((first + wild) * 6 + second) * 13 ** 5 + tiebreak;
}

function winnings(input: string, jokers: boolean) {
	const hands = input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [hand, bid] = line.split(/\s+/);
			return { score: score(hand, jokers), bid: Number(bid) };
		})
		.sort((a, b) => a.score - b.score);
	return hands.reduce((sum, hand, i) => sum + hand.bid * (i + 1), 0);
}

export const part1 = (input: string) => winnings(input, false);
export const part2 = (input: string) => winnings(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
