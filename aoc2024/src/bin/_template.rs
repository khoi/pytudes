use aoc2024::read_file_input;

type Input<'a> = &'a str;

fn parse(input: &str) -> Input {
    input.trim()
}

fn part1(input: Input) -> usize {
    input.len()
}

fn part2(input: Input) -> usize {
    input.len()
}

fn main() {
    let input = read_file_input(1);
    let parsed = parse(&input);

    println!("{}", part1(parsed));
    println!("{}", part2(parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 1);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 2);
    }
}
