use aoc2024::read_file_input;
use std::collections::HashMap;

#[derive(Debug)]
struct Input {
    patterns: Vec<String>,
    designs: Vec<String>,
}

fn parse(input: &str) -> Input {
    let mut parts = input.trim().split("\n\n");

    let patterns = parts
        .next()
        .unwrap()
        .split(", ")
        .map(|s| s.to_string())
        .collect();

    let designs = parts
        .next()
        .unwrap()
        .lines()
        .map(|s| s.to_string())
        .collect();

    Input { patterns, designs }
}

fn can_make_pattern(target: &str, patterns: &[String], memo: &mut HashMap<String, bool>) -> bool {
    if target.is_empty() {
        return true;
    }

    if let Some(&result) = memo.get(target) {
        return result;
    }

    for pattern in patterns {
        if target.starts_with(pattern) {
            let remaining = &target[pattern.len()..];
            if can_make_pattern(remaining, patterns, memo) {
                memo.insert(target.to_string(), true);
                return true;
            }
        }
    }

    memo.insert(target.to_string(), false);
    false
}

fn count_pattern_combinations(target: &str, patterns: &[String], memo: &mut HashMap<String, usize>) -> usize {
    if target.is_empty() {
        return 1;
    }

    if let Some(&count) = memo.get(target) {
        return count;
    }

    let mut total = 0;
    for pattern in patterns {
        if target.starts_with(pattern) {
            let remaining = &target[pattern.len()..];
            total += count_pattern_combinations(remaining, patterns, memo);
        }
    }

    memo.insert(target.to_string(), total);
    total
}

fn part1(input: &Input) -> usize {
    let mut memo = HashMap::new();
    input
        .designs
        .iter()
        .filter(|design| can_make_pattern(design, &input.patterns, &mut memo))
        .count()
}

fn part2(input: &Input) -> usize {
    let mut memo = HashMap::new();
    input
        .designs
        .iter()
        .map(|design| count_pattern_combinations(design, &input.patterns, &mut memo))
        .sum()
}

fn main() {
    let input = read_file_input(19);
    let parsed = parse(&input);

    println!("{}", part1(&parsed));
    println!("{}", part2(&parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb";

    #[test]
    fn test_1() {
        let result = part1(&parse(INPUT));
        assert_eq!(result, 6);
    }

    #[test]
    fn test_2() {
        let result = part2(&parse(INPUT));
        assert_eq!(result, 16);
    }
}
