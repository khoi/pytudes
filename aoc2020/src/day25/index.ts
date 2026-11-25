import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const [card, door] = input.trim().split(/\s+/).map(Number);
	const modulus = 20201227;
	let publicKey = 1;
	let encryptionKey = 1;
	for (let loop = 0; loop < modulus; loop++) {
		if (publicKey === card) return encryptionKey;
		publicKey = (publicKey * 7) % modulus;
		encryptionKey = (encryptionKey * door) % modulus;
	}
	throw new Error("Invalid public key");
}

if (import.meta.main) run(import.meta.url, part1);
