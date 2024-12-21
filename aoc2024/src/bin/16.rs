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
    let mut prev_directions: HashMap<Point, Direction> = HashMap::new();
    let mut heap = BinaryHeap::new();

    distances.insert(start, 0);
    heap.push(Reverse(Vertex {
        point: start,
        distance: 1,
    }));
    prev_directions.insert(start, Direction::E);

    let directions = [Direction::N, Direction::E, Direction::S, Direction::W];
    while let Some(Reverse(current)) = heap.pop() {
        let current_dist = distances[&current.point];
        for dir in &directions {
            let neighbor = current.point.get_neighbor(dir);
            if !grid.is_in_bound(&neighbor) || grid.get(&neighbor) == &'#' {
                continue;
            }

            let move_cost = match prev_directions.get(&current.point) {
                Some(&prev_dir) if is_90_degree_turn(prev_dir, *dir) => 1001,
                Some(_) => 1,
                None => panic!("Impossible case: no previous direction found"),
            };
            let new_dist = current_dist + move_cost;

            let entry = distances.entry(neighbor).or_insert(usize::MAX);
            if new_dist < *entry {
                *entry = new_dist;
                prev_directions.insert(neighbor, *dir);
                heap.push(Reverse(Vertex {
                    point: neighbor,
                    distance: new_dist,
                }));
            }
        }
    }

    distances
}

fn shortest_path(distance: &HashMap<Point, usize>, start: Point, end: Point) -> Vec<Point> {
    let mut path = vec![];
    let mut current = end;
    while current != start {
        let current_dist = distance[&current];
        let mut next_point = None;
        let mut next_dir = None;

        for dir in [Direction::N, Direction::E, Direction::S, Direction::W] {
            let neighbor = current.get_neighbor(&dir);
            if !distance.contains_key(&neighbor) {
                continue;
            }

            if let Some(&dist) = distance.get(&neighbor) {
                if dist < current_dist {
                    next_point = Some(neighbor);
                    next_dir = Some(dir);
                    break;
                }
            }
        }

        if let Some(next) = next_point {
            path.push(next);
            current = next;
        } else {
            break;
        }
    }

    path
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
    let distances = dijkstra(&input, start);
    let path = shortest_path(&distances, start, end);

    // Return the distance to the end point
    distances[&end]
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
        assert_eq!(result, 7036);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 2);
    }
}
