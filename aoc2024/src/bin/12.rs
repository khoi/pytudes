#![allow(warnings)]

use std::{
    collections::{HashSet, VecDeque},
    str::FromStr,
    thread::current,
};

use aoc2024::{read_file_input, Direction, Grid, Point};

enum FenceOrientation {
    Horizontal,
    Vertical,
}

type Input = Grid<char>;

fn parse(input: &str) -> Input {
    Grid::from_str(input.trim()).unwrap()
}

struct Result {
    neighbors: HashSet<Point>,
    perimeters: HashSet<(Point, Point)>,
}

fn count_similar_neighbors(grid: &Grid<char>, start: Point) -> Result {
    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();
    let mut perimeters: HashSet<(Point, Point)> = HashSet::new();
    let target_char = *grid.get(&start);

    visited.insert(start);
    queue.push_back(start);

    while let Some(current) = queue.pop_front() {
        let neighbors =
            current.get_neighbors(&[Direction::N, Direction::E, Direction::S, Direction::W]);

        for neighbor in neighbors {
            if grid.is_in_bound(&neighbor) && *grid.get(&neighbor) == target_char {
                if !visited.contains(&neighbor) {
                    visited.insert(neighbor);
                    queue.push_back(neighbor);
                }
            } else {
                perimeters.insert((current, neighbor));
            }
        }
    }

    Result {
        neighbors: visited,
        perimeters,
    }
}

fn part1(input: Input) -> usize {
    let mut evaluated: HashSet<Point> = HashSet::new();
    let mut total_score = 0;

    for point in input.points() {
        if !evaluated.contains(&point) {
            let result = count_similar_neighbors(&input, point);
            evaluated.extend(result.neighbors.iter());
            let score = result.perimeters.len() * result.neighbors.len();
            total_score += score;
        }
    }

    total_score
}

fn part2(input: Input) -> usize {
    2
}

fn main() {
    let input = read_file_input(12);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
AAAA
BBCD
BBCC
EEEC
";

    static INPUT2: &str = "
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 140);
    }

    #[test]
    fn test_1_2() {
        let result = part1(parse(INPUT2));
        assert_eq!(result, 772);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 2);
    }
}
