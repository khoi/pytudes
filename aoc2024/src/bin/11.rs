use std::collections::HashMap;

use aoc2024::read_file_input;

type Input = HashMap<usize, usize>;

fn blink(stones: &Input, n: usize) -> Input {
    let mut current = stones.clone();

    for _ in 0..n {
        let mut next = HashMap::new();

        for (&stone, &count) in current.iter() {
            if count == 0 {
                continue;
            }

            if stone == 0 {
                *next.entry(1).or_insert(0) += count;
            } else if number_of_digits(stone) % 2 == 0 {
                let (lhs, rhs) = split_number_in_half(stone);
                *next.entry(lhs).or_insert(0) += count;
                *next.entry(rhs).or_insert(0) += count;
            } else {
                *next.entry(stone * 2024).or_insert(0) += count;
            }
        }

        current = next;
    }

    current
}

fn split_number_in_half(n: usize) -> (usize, usize) {
    let digits = number_of_digits(n);
    let half = digits / 2;
    let first = n / 10usize.pow(half as u32);
    let second = n % 10usize.pow(half as u32);
    (first, second)
}

fn number_of_digits(n: usize) -> usize {
    if n == 0 {
        return 1;
    }
    (n as f64).log10().floor() as usize + 1
}

fn parse(input: &str) -> Input {
    let mut stones = HashMap::new();
    for num in input
        .trim()
        .split_whitespace()
        .map(|s| s.parse::<usize>().unwrap())
    {
        *stones.entry(num).or_insert(0) += 1;
    }
    stones
}

fn part1(input: Input) -> usize {
    blink(&input, 25).values().sum()
}

fn part2(input: Input) -> usize {
    blink(&input, 75).values().sum()
}

fn main() {
    let input = read_file_input(11);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_six_blinks() {
        let input = parse("125 17");
        let res: usize = blink(&input, 6).values().sum();
        assert_eq!(res, 22);
    }

    #[test]
    fn test_25_blinks() {
        let input = parse("125 17");
        let res: usize = blink(&input, 25).values().sum();
        assert_eq!(res, 55312);
    }
}
