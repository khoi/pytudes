use aoc2024::read_file_input;
use aoc2024::{Direction, Grid, Point};
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap, HashSet};

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

#[derive(Debug, Clone, Copy)]
struct State {
    direction: Direction,
    distance: usize,
}

fn dijkstra(
    grid: &Grid<char>,
    start: Point,
    initial_direction: Direction,
) -> HashMap<Point, State> {
    let mut states: HashMap<Point, State> = HashMap::new();
    let mut heap = BinaryHeap::new();

    states.insert(
        start,
        State {
            direction: initial_direction,
            distance: 0,
        },
    );
    heap.push(Reverse(Vertex {
        point: start,
        distance: 0,
    }));

    //
    while let Some(Reverse(current)) = heap.pop() {
        let current_state = states[&current.point];

        for dir in &[Direction::N, Direction::E, Direction::S, Direction::W] {
            let neighbor = current.point.get_neighbor(dir);
            if !grid.is_in_bound(&neighbor) || grid.get(&neighbor) == &'#' {
                continue;
            }

            let move_cost = if is_90_degree_turn(current_state.direction, *dir) {
                1001
            } else {
                1
            };
            let new_dist = current_state.distance + move_cost;

            let should_update = match states.get(&neighbor) {
                Some(state) => new_dist < state.distance,
                None => true,
            };

            if should_update {
                states.insert(
                    neighbor,
                    State {
                        direction: *dir,
                        distance: new_dist,
                    },
                );
                heap.push(Reverse(Vertex {
                    point: neighbor,
                    distance: new_dist,
                }));
            }
        }
    }

    states
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
    let states = dijkstra(&input, start, Direction::E);
    states[&end].distance
}

fn part2(input: Input) -> usize {
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
    let from_start = dijkstra(&input, start, Direction::E);

    let mut good_seats = HashSet::new();
    let from_ends: HashMap<Direction, HashMap<Point, State>> =
        [Direction::N, Direction::E, Direction::S, Direction::W]
            .iter()
            .map(|dir| (*dir, dijkstra(&input, end, *dir)))
            .collect();

    for p in input.points() {
        if input.is_in_bound(&p) && input.get(&p) == &'#' {
            continue;
        }

        for dir in [Direction::N, Direction::E, Direction::S, Direction::W] {
            if from_start[&p].distance + from_ends[&flip(dir)][&p].distance
                == from_start[&end].distance
            {
                good_seats.insert(p);
            }
        }
    }

    good_seats.len()
}

fn main() {
    let input = read_file_input(16);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

fn flip(dir: Direction) -> Direction {
    match dir {
        Direction::N => Direction::S,
        Direction::S => Direction::N,
        Direction::E => Direction::W,
        Direction::W => Direction::E,
        _ => panic!("Invalid direction"),
    }
}

fn is_90_degree_turn(prev: Direction, new: Direction) -> bool {
    matches!(
        (prev, new),
        (Direction::N, Direction::E)
            | (Direction::E, Direction::N)
            | (Direction::N, Direction::W)
            | (Direction::W, Direction::N)
            | (Direction::S, Direction::E)
            | (Direction::E, Direction::S)
            | (Direction::S, Direction::W)
            | (Direction::W, Direction::S)
    )
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
        assert_eq!(result, 45);
    }
}
