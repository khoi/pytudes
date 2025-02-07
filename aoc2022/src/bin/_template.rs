use aoc2022::read_file_input;

type Input<'a> = Vec<&'a str>;

fn parse(input: &str) -> Input {
    input.lines().collect()
}

fn part1(input: Input) -> usize {
    1
}

fn part2(input: Input) -> usize {
    2
}

fn main() {
    let input = read_file_input();
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
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
