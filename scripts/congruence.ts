export type Schedule = { at: bigint; period: bigint };

export function combine(a: Schedule, b: Schedule): Schedule | undefined {
	let gcd = a.period,
		remaining = b.period;
	let x = 1n,
		y = 0n;
	while (remaining !== 0n) {
		const quotient = gcd / remaining;
		[gcd, remaining] = [remaining, gcd % remaining];
		[x, y] = [y, x - quotient * y];
	}

	const difference = b.at - a.at;
	if (difference % gcd !== 0n) return;
	const period = (a.period / gcd) * b.period;
	const offset = ((difference / gcd) * x) % (b.period / gcd);
	const at = (a.at + a.period * offset) % period;
	return { at: (at + period) % period, period };
}

export function firstAlignment(
	groups: Schedule[][],
	lower: bigint,
): bigint | undefined {
	let candidates: Schedule[] = [{ at: 0n, period: 1n }];
	for (const group of groups.toSorted((a, b) => a.length - b.length)) {
		const distinct = new Map<string, Schedule>();
		for (const candidate of candidates) {
			for (const option of group) {
				const overlap = combine(candidate, option);
				if (overlap) distinct.set(`${overlap.at}/${overlap.period}`, overlap);
			}
		}
		if (!distinct.size) return;
		candidates = [...distinct.values()];
	}

	let earliest: bigint | undefined;
	for (const { at, period } of candidates) {
		const offset = (((at - lower) % period) + period) % period;
		const time = lower + offset;
		if (earliest === undefined || time < earliest) earliest = time;
	}
	return earliest;
}
