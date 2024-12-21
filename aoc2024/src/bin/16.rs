#![allow(warnings)]

use aoc2024::read_file_input;
use aoc2024::{Direction, Grid, Point};
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

type Input = Grid<char>;

#[derive(Eq, PartialEq)]
struct Vertex {
    point: Point,
    distance: usize,
}

impl Ord for Vertex {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.distance.cmp(&other.distance)
    }
}

impl PartialOrd for Vertex {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn dijkstra(grid: &Grid<char>, start: Point) -> HashMap<Point, usize> {
    let mut distances: HashMap<Point, usize> = HashMap::new();
    let mut heap = BinaryHeap::new();

    // Initialize distances with infinity except for start
    distances.insert(start, 0);
    heap.push(Reverse(Vertex {
        point: start,
        distance: 0,
    }));

    // Main directions for movement
    let directions = [Direction::N, Direction::E, Direction::S, Direction::W];

    while let Some(Reverse(current)) = heap.pop() {
        let current_dist = distances[&current.point];

        // Skip if we've found a better path
        if current.distance > current_dist {
            continue;
        }

        // Get valid neighbors
        for dir in &directions {
            let neighbor = current.point.get_neighbor(dir);

            // Skip if out of bounds or wall
            if !grid.is_in_bound(&neighbor) || grid.get(&neighbor) == &'#' {
                continue;
            }

            // Calculate new distance
            let new_dist = current_dist + 1;

            // Update distance if it's better
            let entry = distances.entry(neighbor).or_insert(usize::MAX);
            if new_dist < *entry {
                *entry = new_dist;
                heap.push(Reverse(Vertex {
                    point: neighbor,
                    distance: new_dist,
                }));
            }
        }
    }

    distances
}

fn parse(input: &str) -> Input {
    input.trim().parse().unwrap()
}

fn part1(input: Input) -> usize {
    let mut start = None;
    let mut end = None;

    for p in input.points() {
        match input.get(&p) {
            'S' => start = Some(p),
            'E' => end = Some(p),
            _ => continue,
        }
    }

    let start = start.expect("No start point found");
    let end = end.expect("No end point found");
    println!("{:?}", input);
    println!("Start: {:?}", start);
    println!("End: {:?}", end);

    let distances = dijkstra(&input, start);

    // Create a grid for path visualization
    let mut path_grid = Grid {
        width: input.width,
        height: input.height,
        data: vec![vec!['.'; input.width]; input.height],
    };

    // Copy walls from input grid
    for p in input.points() {
        if input.get(&p) == &'#' {
            path_grid.data[p.y as usize][p.x as usize] = '#';
        }
    }

    // Start from end and work backwards
    let mut current = end;
    while current != start {
        let current_dist = distances[&current];
        let mut next_point = None;
        let mut next_dir = None;

        // Check all neighbors
        for dir in [Direction::N, Direction::E, Direction::S, Direction::W] {
            let neighbor = current.get_neighbor(&dir);
            if !input.is_in_bound(&neighbor) {
                continue;
            }

            if let Some(&dist) = distances.get(&neighbor) {
                if dist < current_dist {
                    next_point = Some(neighbor);
                    next_dir = Some(dir);
                    break;
                }
            }
        }

        // Place distance score
        path_grid.data[current.y as usize][current.x as usize] =
            std::char::from_digit(current_dist as u32 % 10, 10).unwrap_or('.');

        if let Some(next) = next_point {
            current = next;
        } else {
            break;
        }
    }

    // Mark start and end points
    path_grid.data[start.y as usize][start.x as usize] = 'S';
    path_grid.data[end.y as usize][end.x as usize] = 'E';

    println!("{:?}", path_grid);

    *distances.get(&end).unwrap_or(&0)
}

fn part2(input: Input) -> usize {
    2
}

fn main() {
    let input = read_file_input(16);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

fn is_90_degree_turn(prev: Direction, new: Direction) -> bool {
    match (prev, new) {
        (Direction::N, Direction::E) | (Direction::E, Direction::N) => true,
        (Direction::N, Direction::W) | (Direction::W, Direction::N) => true,
        (Direction::S, Direction::E) | (Direction::E, Direction::S) => true,
        (Direction::S, Direction::W) | (Direction::W, Direction::S) => true,
        _ => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############";

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
