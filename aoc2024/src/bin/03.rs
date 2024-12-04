use aoc2024::read_file_input;
use nom::{
    branch::alt,
    bytes::complete::tag,
    sequence::{delimited, separated_pair, tuple},
    IResult,
};

use nom::character::complete::i64;

type Input<'a> = Vec<&'a str>;

#[derive(Debug, PartialEq)]
struct Mul {
    lhs: i64,
    rhs: i64,
}

fn parse_integer_pair(input: &str) -> IResult<&str, (i64, i64)> {
    separated_pair(i64, tag(","), i64)(input)
}

fn parse_mul(input: &str) -> IResult<&str, Mul> {
    let (remaining, (lhs, rhs)) = delimited(tag("mul("), parse_integer_pair, tag(")"))(input)?;
    Ok((remaining, Mul { lhs, rhs }))
}

fn extract_muls(input: &str) -> Vec<Mul> {
    let mut muls = Vec::new();
    let mut remaining = input;

    while !remaining.is_empty() {
        match parse_mul(remaining) {
            Ok((rest, mul)) => {
                muls.push(mul);
                remaining = rest;
            }
            Err(_) => {
                // Move forward one character if no valid mul pattern is found
                remaining = &remaining[1..];
                if remaining.is_empty() {
                    break;
                }
            }
        }
    }
    muls
}

fn parse(input: &str) -> Input {
    input.trim().lines().collect()
}

fn part1(input: Input) -> i64 {
    let mut sum = 0;
    for line in input {
        let muls = extract_muls(line);
        let res = muls.iter().fold(0, |acc, mul| acc + mul.lhs * mul.rhs);
        sum += res
    }
    sum
}

fn part2(input: Input) -> i64 {
    2
}

fn main() {
    let input = read_file_input(3);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 161);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 2);
    }
}
