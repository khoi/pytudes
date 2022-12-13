use aoc2022::read_file_input;
use std::str::FromStr;

#[derive(Debug, Clone)]
struct MonkeyTest {
    divisible: usize,
    true_monkey: usize,
    false_monkey: usize,
}

#[derive(Debug, Clone, Copy)]
enum Operation {
    Square,
    Mul(usize),
    Add(usize),
}

impl Operation {
    fn apply(self, x: usize) -> usize {
        match self {
            Self::Square => x * x,
            Self::Mul(y) => x * y as usize,
            Self::Add(y) => x + y as usize,
        }
    }
}

impl FromStr for Operation {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s == "new = old * old" {
            Ok(Operation::Square)
        } else if let Some(x) = s.strip_prefix("new = old * ") {
            x.parse::<usize>().map(Operation::Mul).map_err(|_| ())
        } else if let Some(x) = s.strip_prefix("new = old + ") {
            x.parse::<usize>().map(Operation::Add).map_err(|_| ())
        } else {
            Err(())
        }
    }
}

#[derive(Debug, Clone)]
struct Monkey {
    items: Vec<usize>,
    operation: Operation,
    test: MonkeyTest,
}

impl FromStr for Monkey {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let lines: Vec<&str> = s.lines().skip(1).collect();
        let items: Vec<usize> = lines[0]
            .split_once(": ")
            .unwrap()
            .1
            .split(", ")
            .map(|s| s.parse().unwrap())
            .collect();

        let operation: Operation = lines[1].split_once(": ").unwrap().1.parse().unwrap();

        let divisible: usize = lines[2]
            .split_once("divisible by ")
            .unwrap()
            .1
            .parse()
            .unwrap();
        let true_monkey: usize = lines[3]
            .split_once("throw to monkey ")
            .unwrap()
            .1
            .parse()
            .unwrap();
        let false_monkey: usize = lines[4]
            .split_once("throw to monkey ")
            .unwrap()
            .1
            .parse()
            .unwrap();

        Ok(Monkey {
            items,
            operation,
            test: MonkeyTest {
                divisible,
                true_monkey,
                false_monkey,
            },
        })
    }
}

type Input<'a> = Vec<Monkey>;

fn parse(input: &str) -> Input {
    input
        .split("\n\n")
        .map(|s| Monkey::from_str(s).unwrap())
        .collect()
}

fn solve(mut input: Input, round: usize, worry_fn: impl Fn(usize) -> usize) -> usize {
    let mut count = vec![0; input.len()];
    for _ in 0..round {
        for i in 0..(input.len()) {
            let monkey = &mut input[i];

            let inspected_items: Vec<usize> = monkey
                .items
                .drain(..)
                .map(|item| worry_fn(monkey.operation.apply(item)))
                .collect();

            count[i] += inspected_items.len();

            let divide_by = monkey.test.divisible;
            let true_monkey = monkey.test.true_monkey;
            let false_monkey = monkey.test.false_monkey;

            for item in inspected_items {
                let target = if item % divide_by == 0 {
                    true_monkey
                } else {
                    false_monkey
                };

                input[target].items.push(item);
            }
        }
    }
    count.sort();
    count.iter().rev().take(2).product()
}

fn part1(input: Input) -> usize {
    solve(input, 20, |x| x / 3)
}

fn part2(input: Input) -> usize {
    let modulo: usize = input.iter().map(|m| m.test.divisible).product();
    solve(input, 10000, |x| x % modulo)
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

    static INPUT: &str = "Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 10605);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 2713310158);
    }
}
