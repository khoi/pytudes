use core::str;

use aoc2024::read_file_input;
use nom::{
    branch::alt,
    bytes::complete::tag,
    sequence::{delimited, separated_pair},
    IResult,
};

use nom::character::complete::i64;

type Input<'a> = &'a str;

#[derive(Debug, PartialEq)]
struct Mul {
    lhs: i64,
    rhs: i64,
}

#[derive(Debug, PartialEq, Clone)]
enum Instruction {
    Do,
    Dont,
}

fn parse_do(input: &str) -> IResult<&str, Instruction> {
    let (remaining, _) = tag("do()")(input)?;
    Ok((remaining, Instruction::Do))
}

fn parse_dont(input: &str) -> IResult<&str, Instruction> {
    let (remaining, _) = tag("don't()")(input)?;
    Ok((remaining, Instruction::Dont))
}

fn parse_integer_pair(input: &str) -> IResult<&str, (i64, i64)> {
    separated_pair(i64, tag(","), i64)(input)
}

fn parse_mul(input: &str) -> IResult<&str, Mul> {
    let (remaining, (lhs, rhs)) = delimited(tag("mul("), parse_integer_pair, tag(")"))(input)?;
    Ok((remaining, Mul { lhs, rhs }))
}

fn extract_muls(input: &str) -> Vec<(Mul, Instruction)> {
    let mut muls = Vec::new();
    let mut remaining = input;
    let mut current_instruction = Instruction::Do; // Initially enabled

    while !remaining.is_empty() {
        // Try to parse do() or don't() first
        if let Ok((rest, instruction)) = alt((parse_do, parse_dont))(remaining) {
            current_instruction = instruction;
            remaining = rest;
            continue;
        }

        // Try to parse mul regardless of enabled state
        if let Ok((rest, mul)) = parse_mul(remaining) {
            muls.push((mul, current_instruction.clone()));
            remaining = rest;
            continue;
        }

        // Move forward one character if no pattern matches
        remaining = &remaining[1..];
    }
    muls
}

fn parse(input: &str) -> Input {
    input.trim()
}

fn part1(input: Input) -> i64 {
    extract_muls(input)
        .into_iter()
        .map(|(mul, _)| mul.lhs * mul.rhs)
        .sum()
}

fn part2(input: Input) -> i64 {
    extract_muls(input)
        .into_iter()
        .filter(|(_m, instruction)| matches!(instruction, Instruction::Do))
        .map(|(mul, _)| mul.lhs * mul.rhs)
        .sum()
}

fn main() {
    let input = read_file_input(3);
    let parsed = parse(&input);

    println!("{}", part1(parsed));
    println!("{}", part2(parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    static INPUT2: &str =
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 161);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT2));
        assert_eq!(result, 48);
    }
}
