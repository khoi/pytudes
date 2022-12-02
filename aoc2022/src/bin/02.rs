use aoc2022::read_file_input;

fn main() {
    let input = read_file_input(02);

    let matches = input.lines().map(|line| {
        let mut iter = line.split_whitespace();
        (
            iter.next().unwrap().as_bytes().first().unwrap() - 64,
            iter.next().unwrap().as_bytes().first().unwrap() - 87,
        )
    });

    let score = matches.map(|m| score(m.0 as u64, m.1 as u64)).sum::<u64>();

    println!("{}", score);
}

fn score(left: u64, right: u64) -> u64 {
    (4 + right - left) % 3 * 3 + right
}
