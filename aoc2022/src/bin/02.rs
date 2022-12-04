use aoc2022::read_file_input;

type Input = Vec<(u64, u64)>;

fn parse(input: &str) -> Input {
    input
        .lines()
        .filter_map(|l| {
            let bytes = l.as_bytes();
            Some(((bytes.first()? - 64) as u64, (bytes.last()? - 87) as u64))
        })
        .collect()
}

fn part1(input: &Input) -> u64 {
    input.iter().map(|(a, b)| score(*a, *b)).sum()
}

fn part2(input: &Input) -> u64 {
    input
        .iter()
        .map(|(a, b)| score(*a, (1 + (*b + *a) % 3) as u64))
        .sum()
}

fn score(left: u64, right: u64) -> u64 {
    (4 + right - left) % 3 * 3 + right
}

fn main() {
    let input = parse(&read_file_input(02));

    println!("{}", part1(&input));
    println!("{}", part2(&input));
}
