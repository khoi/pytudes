#![allow(warnings)]

use aoc2024::{read_file_input, Direction, Grid, Point};
use std::collections::{HashMap, HashSet, VecDeque};

type Input = Vec<[usize; 2]>;

fn parse(input: &str) -> Input {
    input
        .trim()
        .lines()
        .map(|line| {
            let (x, y) = line.split_once(',').unwrap();
            [x.parse().unwrap(), y.parse().unwrap()]
        })
        .collect()
}

fn find_shortest_path(grid: &Grid<char>, start: Point, end: Point) -> usize {
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    let mut distances = HashMap::new();

    queue.push_back(start);
    visited.insert(start);
    distances.insert(start, 0);

    let directions = [Direction::N, Direction::E, Direction::S, Direction::W];

    while let Some(current) = queue.pop_front() {
        if current == end {
            return *distances.get(&current).unwrap();
        }

        for neighbor in current.get_neighbors(&directions) {
            if grid.is_in_bound(&neighbor)
                && !visited.contains(&neighbor)
                && *grid.get(&neighbor) != '#'
            {
                visited.insert(neighbor);
                queue.push_back(neighbor);
                distances.insert(neighbor, distances[&current] + 1);
            }
        }
    }

    0
}

fn part1(input: Input, steps: usize) -> usize {
    let max_x = input.iter().map(|[x, _]| x).max().unwrap();
    let max_y = input.iter().map(|[_, y]| y).max().unwrap();

    let mut grid = Grid {
        width: max_x + 1,
        height: max_y + 1,
        data: vec![vec!['.'; max_x + 1]; max_y + 1],
    };

    for [x, y] in input.iter().take(steps) {
        grid.data[*y][*x] = '#';
    }

    let start = Point { x: 0, y: 0 };
    let end = Point {
        x: *max_x as isize,
        y: *max_y as isize,
    };

    find_shortest_path(&grid, start, end)
}

fn part2(input: Input) -> (usize, usize) {
    let max_x = input.iter().map(|[x, _]| x).max().unwrap();
    let max_y = input.iter().map(|[_, y]| y).max().unwrap();

    for i in 0..input.len() {
        let mut grid = Grid {
            width: max_x + 1,
            height: max_y + 1,
            data: vec![vec!['.'; max_x + 1]; max_y + 1],
        };

        for [x, y] in input.iter().take(i) {
            grid.data[*y][*x] = '#';
        }

        let start = Point { x: 0, y: 0 };
        let end = Point {
            x: *max_x as isize,
            y: *max_y as isize,
        };
        let shortest_path = find_shortest_path(&grid, start, end);

        if shortest_path == 0 {
            return (input[i - 1][0], input[i - 1][1]);
        }
    }
    panic!()
}

fn main() {
    let input = read_file_input(18);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone(), 1024));
    let (a, b) = part2(parsed.clone());
    println!("{},{}", a, b);
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0";

    // #[test]
    // fn test_example_1() {
    //     let result = part1(parse(INPUT), 12);
    //     assert_eq!(result, 22);
    // }

    #[test]
    fn test_example_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, (6, 1));
    }
}
