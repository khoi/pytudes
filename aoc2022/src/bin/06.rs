use aoc2022::read_file_input;

type Input<'a> = Vec<char>;

fn parse(input: &str) -> Input {
    input.chars().collect()
}

fn find_marker(chars: &[char], window_size: usize) -> Option<usize> {
    chars
        .windows(window_size)
        .position(|w| {
            for i in 0..w.len() {
                for j in i + 1..w.len() {
                    if w[i] == w[j] {
                        return false;
                    }
                }
            }
            return true;
        })
        .map(|a| a + window_size)
}

fn part1(input: Input) -> Option<usize> {
    find_marker(&input, 4)
}

fn part2(input: Input) -> Option<usize> {
    find_marker(&input, 14)
}

fn main() {
    let input = read_file_input(06);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()).unwrap());
    println!("{}", part2(parsed.clone()).unwrap());
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "bvwbjplbgvbhsrlpgdmjqwftvncz";
    static INPUT2: &str = "nppdvjthqldpwncqszvftbrmjlhg";
    static INPUT3: &str = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
    static INPUT4: &str = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

    #[test]
    fn test_1() {
        assert_eq!(part1(parse(INPUT)).unwrap(), 5);
        assert_eq!(part1(parse(INPUT2)).unwrap(), 6);
        assert_eq!(part1(parse(INPUT3)).unwrap(), 10);
        assert_eq!(part1(parse(INPUT4)).unwrap(), 11);
    }

    #[test]
    fn test_2() {
        assert_eq!(part2(parse(INPUT)).unwrap(), 23);
        assert_eq!(part2(parse(INPUT2)).unwrap(), 23);
        assert_eq!(part2(parse(INPUT3)).unwrap(), 29);
        assert_eq!(part2(parse(INPUT4)).unwrap(), 26);
    }
}
