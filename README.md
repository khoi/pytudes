# pytudes

Programming exercises and experiments, including TypeScript solutions to [Advent of Code](https://adventofcode.com/events) for 2015 through 2025. Each day lives in `aocYYYY/src/dayDD/` with a solver and Bun tests. The 2022 and 2024 directories also contain Rust implementations.

From the repository root, run a day with [Bun](https://bun.sh/).

```sh
bun run day 2025 1
bun run day 2015 1 path/to/input.txt
```

The runner reads `input.txt` beside the solver and also recognizes the older `src/inputs/DD.txt` layout. To download a missing input with an authenticated [aoc-cli](https://github.com/scarvalhojr/aoc-cli), specify the year, day and destination.

```sh
aoc download --year 2015 --day 1 --input-only --input-file aoc2015/src/day01/input.txt
```

Run the tests and type checker with these commands. Once all inputs are available locally, `bun run answers` prints one CSV row per puzzle part.

```sh
bun install --frozen-lockfile
bun test
bun run typecheck
```
