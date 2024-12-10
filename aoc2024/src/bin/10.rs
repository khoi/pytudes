use aoc2024::{read_file_input, Direction, Grid, Point};
use std::collections::HashSet;
use std::str::FromStr;

type Input = Grid<char>;

pub fn get_digit(grid: &Grid<char>, point: &Point) -> Option<u8> {
    grid.get(point).to_digit(10).map(|d| d as u8)
}

fn find_positions(grid: &Grid<char>, c: char) -> Vec<Point> {
    grid.points().filter(|p| *grid.get(p) == c).collect()
}

fn find_peaks(grid: &Grid<char>, start: Point) -> (usize, usize) {
    let mut stack = vec![start];
    let mut peaks = HashSet::new();
    let mut path_count = 0;

    while let Some(point) = stack.pop() {
        [Direction::N, Direction::E, Direction::S, Direction::W]
            .iter()
            .map(|d| point.get_neighbor(d))
            .filter(|n| {
                grid.is_in_bound(n)
                    && match (get_digit(grid, n), get_digit(grid, &point)) {
                        (Some(next_digit), Some(current_digit)) => next_digit == current_digit + 1,
                        _ => false,
                    }
            })
            .for_each(|next| {
                stack.push(next);
                if grid.get(&next) == &'9' {
                    peaks.insert(next);
                    path_count += 1;
                }
            });
    }

    (peaks.len(), path_count)
}

fn parse(input: &str) -> Input {
    Grid::from_str(input.trim()).unwrap()
}

fn part1(input: Input) -> usize {
    let starts = find_positions(&input, '0');
    starts.iter().map(|p| find_peaks(&input, *p).0).sum()
}

fn part2(input: Input) -> usize {
    let starts = find_positions(&input, '0');
    starts.iter().map(|p| find_peaks(&input, *p).1).sum()
}

fn main() {
    let input = read_file_input(10);

    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_part1() {
        let result = part1(parse(
            "
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
",
        ));
        assert_eq!(result, 36);
    }

    #[test]
    fn test_part2() {
        let result = part2(parse(
            "
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
",
        ));
        assert_eq!(result, 81);
    }
}
