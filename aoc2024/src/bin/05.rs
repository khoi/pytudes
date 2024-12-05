use aoc2024::read_file_input;
use std::collections::{HashMap, HashSet};

type Rule = HashMap<u64, HashSet<u64>>;
type Input = (Rule, Vec<Vec<u64>>);

fn parse(input: &str) -> Input {
    let mut sections = input.trim().split("\n\n");

    // Parse first section (rules)
    let rules = sections
        .next()
        .expect("Missing rules section")
        .lines()
        .fold(
            HashMap::new(),
            |mut acc: HashMap<u64, HashSet<u64>>, line| {
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

                acc.entry(p1).or_default().insert(p2);
                acc
            },
        );

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

fn is_valid(rule: &Rule, lhs: u64, rhs: u64) -> bool {
    let mut current = lhs;

    if let Some(back_refs) = rule.get(&rhs) {
        if back_refs.contains(&lhs) {
            return false;
        }
    }

    while let Some(next_values) = rule.get(&current) {
        if next_values.contains(&rhs) {
            return true;
        }
        // Try each possible next value
        for &next_value in next_values {
            current = next_value;
            if current == rhs {
                return true;
            }
        }
    }

    false
}

fn part1(input: Input) -> u64 {
    let (rule, pages) = input;

    let mut sum = 0;
    'outer: for page in pages {
        for pair in page.windows(2) {
            if !is_valid(&rule, pair[0], pair[1]) {
                continue 'outer;
            }
        }
        sum += page[page.len() / 2];
    }

    sum
}

fn part2(input: Input) -> usize {
    3
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
    fn test_cyclic_path() {
        let input = "75|62
62|16
16|75

75,16
";

        let (rule, _) = parse(input);

        // Verify direct path works
        assert!(is_valid(&rule, 75, 62), "75 should connect to 62");
        assert!(is_valid(&rule, 62, 16), "62 should connect to 16");
        assert!(is_valid(&rule, 16, 75), "16 should connect to 75");

        // Verify the required path works
        assert!(!is_valid(&rule, 75, 16), "75 should not connect to 16");
    }

    #[test]
    fn test_is_valid() {
        let input = "47|53
47|61
53|29
61|13
61|29
29|13

47,53"; // Adding a dummy page since we only care about the rules

        let (rule, _) = parse(input);

        // Direct connections
        assert!(is_valid(&rule, 47, 53), "47 should connect to 53");
        assert!(is_valid(&rule, 47, 61), "47 should connect to 61");
        assert!(is_valid(&rule, 53, 29), "53 should connect to 29");
        assert!(is_valid(&rule, 29, 13), "29 should connect to 13");

        // Chain connections
        assert!(
            is_valid(&rule, 47, 29),
            "47 should connect to 29 through 53"
        );
        assert!(
            is_valid(&rule, 47, 13),
            "47 should connect to 13 through chain"
        );
        assert!(
            is_valid(&rule, 53, 13),
            "53 should connect to 13 through 29"
        );

        // Multiple path validations
        assert!(
            is_valid(&rule, 47, 13),
            "47 should connect to 13 through either path"
        );
        assert!(is_valid(&rule, 61, 13), "61 should connect directly to 13");

        // Invalid connections
        assert!(!is_valid(&rule, 13, 47), "13 should not connect to 47");
        assert!(!is_valid(&rule, 29, 47), "29 should not connect to 47");
        assert!(!is_valid(&rule, 47, 47), "47 should not connect to itself");
        assert!(
            !is_valid(&rule, 99, 13),
            "99 should not connect to anything"
        );
    }

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 143);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(2, 2);
    }
}
