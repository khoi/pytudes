#![allow(warnings)]

use aoc2024::read_file_input;
use nom::combinator::flat_map;

type Input = Vec<usize>;

fn blink(stones: &mut Vec<usize>, n: usize) {
    for x in 0..n {
        let mut i = 0;
        while i < stones.len() {
            if stones[i] == 0 {
                stones[i] = 1;
            } else if number_of_digits(stones[i]) % 2 == 0 {
                let (lhs, rhs) = split_number_in_half(stones[i]);
                stones.splice(i..=i, vec![lhs, rhs]);
                i += 1;
            } else {
                stones[i] = stones[i] * 2024;
            }

            i += 1;
        }
        println!("{} - {:?}", x, stones);
    }
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
    input
        .trim()
        .split_whitespace()
        .map(|s| s.parse::<usize>().unwrap())
        .collect()
}

fn part1(input: &mut Input) -> usize {
    blink(input, 25);
    input.len()
}

fn part2(input: &Input) -> usize {
    input.len()
}

fn main() {
    let input = read_file_input(11);
    let mut parsed = parse(&input);

    println!("{}", part1(&mut parsed));
    println!("{}", part2(&parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_six_blinks() {
        let mut input = parse("125 17");
        blink(&mut input, 6);
        assert_eq!(
            input,
            vec![
                2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8, 6, 7, 6,
                0, 3, 2
            ]
        );
    }

    #[test]
    fn test_25_blinks() {
        let mut input = parse("125 17");
        blink(&mut input, 25);
        assert_eq!(input.len(), 55312);
    }
    // #[test]
    // fn test_2() {
    //     let result = part2(&parse(INPUT));
    //     assert_eq!(result, 2);
    // }
}
