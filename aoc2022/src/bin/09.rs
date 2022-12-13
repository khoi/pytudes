use aoc2022::{Direction, Point, InfiniteGrid};
use std::cmp;

use aoc2022::read_file_input;

type Input<'a> = Vec<(Direction, usize)>;

fn parse(input: &str) -> Input {
    input.lines().filter_map(|l| {
        let (dir, dist) = l.split_once(' ')?;
        let dist = dist.parse().ok()?;
            let step = match dir {
                "R" => (Direction::E, dist),
                "U" => (Direction::N, dist),
                "L" => (Direction::W, dist),
                "D" => (Direction::S, dist),
                _ => unreachable!(),
            };
            Some(step)
    }).collect()
}

fn calculate_new_tail_position(head: &Point, tail: &Point) -> Point {
    Point {
        x: tail.x + cmp::max(cmp::min(head.x - tail.x, 1), -1),
        y: tail.y + cmp::max(cmp::min(head.y - tail.y, 1), -1),
    }
}

fn count_tail_moves(input: &Input, knot_count: usize) -> usize {
    let mut knots = (0..knot_count).map(|_| Point { x: 0, y: 0 }).collect::<Vec<_>>();

    let mut tail_grid = InfiniteGrid::new();
    tail_grid.insert(Point { x: 0, y: 0 }, 1);

    input.iter().for_each(|(dir, dist)| {
        for _ in 0..*dist {
            knots[0] = knots[0].get_neighbor(dir);

            for i in 0..(knot_count - 1) {
                let head = &knots[i];
                let tail = &knots[i + 1];
                let tails_move = head.chebyshev_distance(&tail) > 1; 
                if tails_move {
                    knots[i + 1] = calculate_new_tail_position(&head, &tail);
                    if i == knot_count - 2 {
                        tail_grid.insert(knots[i + 1].clone(), 1);
                    }
                }
            }
        }
    });
    tail_grid.points.len() 
}

fn part1(input: Input) -> usize {
    count_tail_moves(&input, 2)
}

fn part2(input: Input) -> usize {
    count_tail_moves(&input, 10)
}

fn main() {
    let input = read_file_input(09);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT1: &str = "R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2";
static INPUT2: &str = "R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT1));
        assert_eq!(result, 13);
    }

    #[test]
    fn test_2() {
        assert_eq!(part2(parse(INPUT1)), 1);
        assert_eq!(part2(parse(INPUT2)), 36);
    }
}
