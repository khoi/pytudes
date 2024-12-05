use aoc2024::{read_file_input, Direction, Grid, Point};

const TARGET: &str = "XMAS";
const CROSS_TARGET: &str = "MAS";
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

fn check_pattern(chars: [char; 3]) -> bool {
    let forward = chars.iter().collect::<String>();
    let reverse = chars.iter().rev().collect::<String>();
    forward == CROSS_TARGET || reverse == CROSS_TARGET
}

fn check_cross(input: &Input, center: Point) -> bool {
    // Check diagonal NW-SE pattern
    let diagonal1 = check_pattern([
        *input.get(&center.get_neighbor(&Direction::NW)),
        *input.get(&center),
        *input.get(&center.get_neighbor(&Direction::SE)),
    ]);

    // Check diagonal NE-SW pattern
    let diagonal2 = check_pattern([
        *input.get(&center.get_neighbor(&Direction::NE)),
        *input.get(&center),
        *input.get(&center.get_neighbor(&Direction::SW)),
    ]);

    diagonal1 && diagonal2
}

fn part2(input: Input) -> usize {
    let mut count = 0;
    // We need at least one point of padding on all sides to check for crosses
    for point in input.points() {
        if point.x == 0
            || point.y == 0
            || point.x == (input.width - 1) as isize
            || point.y == (input.height - 1) as isize
        {
            continue;
        }

        if check_cross(&input, point) {
            count += 1;
        }
    }
    count
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

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 9);
    }
}
