import { expect, test } from "bun:test";
import { part1 } from "./index.ts";

const sample = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

test("part one", () => expect(part1(sample)).toBe("2=-1=0"));
