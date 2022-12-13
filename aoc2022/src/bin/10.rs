use aoc2022::read_file_input;
use std::{collections::VecDeque, str::FromStr};

#[derive(Clone, Debug)]
enum Instruction {
    Noop,
    Add(isize),
}

impl FromStr for Instruction {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut parts = s.split_whitespace();
        match (parts.next(), parts.next()) {
            (Some("noop"), _) => Ok(Instruction::Noop),
            (Some("addx"), Some(val)) => Ok(Instruction::Add(val.parse().unwrap())),
            _ => Err(()),
        }
    }
}

type Input<'a> = VecDeque<Instruction>;

fn parse(input: &str) -> Input {
    input.lines().map(|l| l.parse().unwrap()).collect()
}

fn execute(input: &mut Input, scoring: impl Fn(i32, isize) -> isize) -> isize {
    let mut register = 1;
    let mut cycle = 1;
    let mut last_adding_instruction = None;
    let mut score = 0;

    while !input.is_empty() {
        if last_adding_instruction == None {
            match input.pop_front() {
                Some(Instruction::Noop) => (),
                Some(Instruction::Add(val)) => {
                    last_adding_instruction = Some((cycle + 1, val));
                }
                None => unreachable!(),
            }
        }

        score += scoring(cycle, register);

        if let Some((adding_cycle, val)) = last_adding_instruction {
            if adding_cycle == cycle {
                register += val;
                last_adding_instruction = None;
            }
        }

        cycle += 1
    }

    score
}

fn part1(input: Input) -> isize {
    execute(&mut input.clone(), |cycle, value| {
        if cycle == 20 || cycle % 40 == 20 {
            cycle as isize * value
        } else {
            0
        }
    })
}

fn part2(input: Input) -> isize {
    2
}

fn main() {
    let input = read_file_input(10);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    // println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 13140);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 4);
    }
}
