use std::str::FromStr;

use aoc2024::{read_file_input, Direction, Grid, Point};
use std::collections::HashSet;

type Input = Grid<char>;

fn parse(input: &str) -> Input {
    Grid::from_str(input.trim()).unwrap()
}

fn part1(input: Input) -> usize {
    let start = input.points().find(|p| *input.get(p) == '^').unwrap();
    let mut visited = HashSet::new();
    let mut current = start;
    let mut direction = Direction::N;
    visited.insert(current);

    loop {
        let next = current.get_neighbor(&direction);
        if !input.is_in_bound(&next) {
            break;
        }

        if *input.get(&next) != '#' {
            // Move forward
            current = next;
            visited.insert(current);
        } else {
            // Turn right 90 degrees
            direction = match direction {
                Direction::N => Direction::E,
                Direction::E => Direction::S,
                Direction::S => Direction::W,
                Direction::W => Direction::N,
                _ => unreachable!(),
            };
        }
    }

    visited.len()
}

fn path_has_loop(grid: &Grid<char>, start: Point) -> bool {
    let mut current = start;
    let mut direction = Direction::N;
    let mut visited = HashSet::new();
    visited.insert((current, direction));

    loop {
        let next = current.get_neighbor(&direction);
        if !grid.is_in_bound(&next) {
            return false; // Hit boundary, no loop
        }

        if *grid.get(&next) != '#' {
            current = next;
            if !visited.insert((current, direction)) {
                return true; // Found a loop - same position and direction
            }
        } else {
            direction = match direction {
                Direction::N => Direction::E,
                Direction::E => Direction::S,
                Direction::S => Direction::W,
                Direction::W => Direction::N,
                _ => unreachable!(),
            };
        }
    }
}

fn part2(input: Input) -> usize {
    let start = input.points().find(|p| *input.get(p) == '^').unwrap();
    let mut count = 0;
    // Try placing a '#' at each empty position
    for y in 0..input.height {
        for x in 0..input.width {
            let point = Point {
                x: x as isize,
                y: y as isize,
            };

            // Skip if not empty or is start position
            if *input.get(&point) != '.' || point == start {
                continue;
            }

            // Create modified grid with new '#'
            let mut test_grid = input.clone();
            test_grid.data[y][x] = '#';

            // Check if this creates a loop
            if path_has_loop(&test_grid, start) {
                count += 1;
            }
        }
    }

    count
}

fn main() {
    let input = read_file_input(6);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 41);
    }

    #[test]
    fn test_1_real() {
        let input = read_file_input(6);
        let parsed = parse(&input);
        let result = part1(parsed);
        assert_eq!(result, 5404);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 6);
    }

    #[test]
    fn test_2_real() {
        let input = read_file_input(6);
        let parsed = parse(&input);
        let result = part2(parsed);
        assert_eq!(result, 1984);
    }
}
