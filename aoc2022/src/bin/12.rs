use aoc2022::{read_file_input, Direction, Grid, Point};
use std::collections::{HashSet, VecDeque};

type Input<'a> = Grid<char>;

fn parse(input: &str) -> Input {
    input.replace("S", "a").replace("E", "{").parse().unwrap()
}

fn bfs(grid: &Input, start: Point) -> isize {
    let mut visited: HashSet<Point> = HashSet::new();
    let dirs = [Direction::N, Direction::E, Direction::S, Direction::W];
    let mut queue: VecDeque<(Point, isize)> = VecDeque::new();

    queue.push_back((start, 0));
    visited.insert(start);

    while let Some((point, depth)) = queue.pop_front() {
        if *grid.get(&point) == '{' {
            return depth;
        }

        for dir in dirs.iter() {
            let neighbor = point.get_neighbor(dir);

            if visited.contains(&neighbor)
                || !grid.is_in_bound(&neighbor)
                || *grid.get(&neighbor) as isize - *grid.get(&point) as isize > 1
            {
                continue;
            }

            visited.insert(neighbor);
            queue.push_back((neighbor, depth + 1));
        }
    }

    return -1;
}

fn part1(grid: Input) -> isize {
    bfs(&grid, Point { x: 0, y: 0 })
}

fn part2(input: Input) -> isize {
    // can probably be solved faster with Floyd–Warshall but I'm lazy
    input
        .points()
        .filter(|p| input.get(p) == &'a')
        .map(|p| bfs(&input, p))
        .filter(|&d| d != -1)
        .min()
        .unwrap()
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

    static INPUT: &str = "Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 31);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 29);
    }
}
