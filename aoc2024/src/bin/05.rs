use aoc2024::read_file_input;
use std::collections::{HashMap, HashSet};

type Rule = HashSet<u64>;
type Input = (Rule, Vec<Vec<u64>>);

fn szudzik_pair(a: u64, b: u64) -> u64 {
    if a >= b {
        a * a + a + b
    } else {
        a + b * b
    }
}

fn parse(input: &str) -> Input {
    let mut sections = input.trim().split("\n\n");

    // Parse first section (rules)
    let rules = sections
        .next()
        .expect("Missing rules section")
        .lines()
        .fold(HashSet::new(), |mut acc, line| {
            let mut parts = line.split('|');
            let p1: u64 = parts
                .next()
                .expect("Missing first number")
                .parse()
                .expect("Invalid first number");
            let p2: u64 = parts
                .next()
                .expect("Missing second number")
                .parse()
                .expect("Invalid second number");

            acc.insert(szudzik_pair(p1, p2));
            acc
        });

    // Parse second section (number lists)
    let numbers = sections
        .next()
        .expect("Missing numbers section")
        .lines()
        .map(|line| {
            line.split(',')
                .map(|num| num.parse().expect("Invalid number in second section"))
                .collect()
        })
        .collect();

    (rules, numbers)
}

fn part1(input: Input) -> u64 {
    let (rule, pages) = input;

    let mut sum = 0;
    'outer: for page in pages {
        for pair in page.windows(2) {
            if !rule.contains(&szudzik_pair(pair[0], pair[1])) {
                continue 'outer;
            }
        }
        sum += page[page.len() / 2];
    }

    sum
}

fn part2(input: Input) -> u64 {
    let (rule, pages) = input;
    let mut sum = 0;

    for mut page in pages {
        // Check if page is invalid
        let mut is_invalid = false;
        for pair in page.windows(2) {
            if !rule.contains(&szudzik_pair(pair[0], pair[1])) {
                is_invalid = true;
                break;
            }
        }

        if is_invalid {
            // Sort the page using the provided comparison logic
            page.sort_by(|&a, &b| {
                if rule.contains(&szudzik_pair(a, b)) {
                    std::cmp::Ordering::Less
                } else {
                    std::cmp::Ordering::Greater
                }
            });

            sum += page[page.len() / 2];
        }
    }

    sum
}

fn main() {
    let input = read_file_input(5);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 143);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 123);
    }
}
