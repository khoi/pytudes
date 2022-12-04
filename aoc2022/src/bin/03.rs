use aoc2022::read_file_input;

type Input<'a> = Vec<&'a str>;

fn parse(input: &str) -> Input {
    input.lines().collect()
}

fn score_char(code: u8) -> u8 {
    code % 32 + 26 * if code <= 90 { 1 } else { 0 }
}

pub fn part1(input: &Input) -> u32 {
    input
        .iter()
        .filter_map(|l| {
            let parts = l.split_at(l.len() / 2);
            let a = parts.0.as_bytes();
            let b = parts.1.as_bytes();
            a.iter()
                .find(|byte| b.contains(byte))
                .map(|&byte| score_char(byte) as u32)
        })
        .sum()
}

fn part2(input: &Input) -> u32 {
    input
        .chunks(3)
        .filter_map(|chunk| {
            let a = chunk[0].as_bytes();
            let b = chunk[1].as_bytes();
            let c = chunk[2].as_bytes();
            a.iter()
                .find(|byte| b.contains(byte) && c.contains(byte))
                .map(|&byte| score_char(byte) as u32)
        })
        .sum()
}

fn main() {
    let input = read_file_input(03);
    let parsed = parse(&input);

    println!("{}", part1(&parsed));
    println!("{}", part2(&parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
";

    #[test]
    fn test_1() {
        let result = part1(&parse(INPUT));
        assert_eq!(result, 157);
    }

    #[test]
    fn test_2() {
        let result = part2(&parse(INPUT));
        assert_eq!(result, 70);
    }
}
