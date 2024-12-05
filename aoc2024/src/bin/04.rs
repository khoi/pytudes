use aoc2024::{read_file_input, Direction, Grid, Point};

const TARGET: &str = "XMAS";
const DIRECTIONS: [Direction; 8] = [
    Direction::N,
    Direction::NE,
    Direction::E,
    Direction::SE,
    Direction::S,
    Direction::SW,
    Direction::W,
    Direction::NW,
];
use std::str::FromStr;

type Input = Grid<char>;

fn parse(input: &str) -> Input {
    Grid::from_str(input.trim()).unwrap()
}

fn part1(input: Input) -> usize {
    let mut count = 0;
    for start in input.points() {
        for direction in DIRECTIONS {
            let mut chars = vec![*input.get(&start)];
            let mut iter = input.iter(start, &direction);

            while chars.len() < TARGET.len() {
                if let Some(next_point) = iter.next() {
                    chars.push(*input.get(&next_point));
                } else {
                    break;
                }
            }

            if chars.len() == TARGET.len() && chars.iter().collect::<String>() == TARGET {
                count += 1;
            }
        }
    }
    count
}

fn part2(input: Input) -> usize {
    5
}

fn main() {
    let input = read_file_input(4);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 18);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 2);
    // }
}
