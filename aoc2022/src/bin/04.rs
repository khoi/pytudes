use aoc2022::read_file_input;
use std::cmp::{max, min};

type Input<'a> = Vec<(u64, u64, u64, u64)>;

fn parse(input: &str) -> Input {
    input
        .lines()
        .map(|l| {
            let split = l.split([',', '-']);
            let mut iter = split.map(|s| s.parse::<u64>().unwrap());
            (
                iter.next().unwrap(),
                iter.next().unwrap(),
                iter.next().unwrap(),
                iter.next().unwrap(),
            )
        })
        .collect()
}

pub fn part1(input: &Input) -> u64 {
    input
        .iter()
        .map(|i| {
            if (i.0 <= i.2 && i.1 >= i.3) || (i.0 >= i.2 && i.1 <= i.3) {
                1
            } else {
                0
            }
        })
        .sum()
}

fn part2(input: &Input) -> u64 {
    input
        .iter()
        .map(|i| {
            let overlap_start = max(i.0, i.2);
            let overlap_end = min(i.1, i.3);
            if overlap_end >= overlap_start {
                1
            } else {
                0
            }
        })
        .sum()
}

fn main() {
    let input = read_file_input(04);
    let parsed = parse(&input);

    println!("{}", part1(&parsed));
    println!("{}", part2(&parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8";

    #[test]
    fn test_1() {
        let result = part1(&parse(INPUT));
        assert_eq!(result, 2);
    }

    #[test]
    fn test_2() {
        let result = part2(&parse(INPUT));
        assert_eq!(result, 4);
    }
}
