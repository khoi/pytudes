use std::collections::{HashSet};
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

fn count_tail_moves(input: &Input) -> usize {
    let mut current_head_pos= Point { x: 0, y: 0 };
    let mut current_tail_pos= Point { x: 0, y: 0 };
    
    let mut tail_grid = InfiniteGrid::new();
    tail_grid.insert(current_tail_pos.clone(), 1);

    input.iter().for_each(|f| {
        for _ in 0..f.1 {
            current_head_pos = current_head_pos.get_neighbor(&f.0);
            let new_tail_pos = calculate_new_tail_position(&current_head_pos, &current_tail_pos);
            
            let tails_move = current_head_pos.chebyshev_distance(&current_tail_pos) > 1; 
            if tails_move {
                current_tail_pos = new_tail_pos;
                tail_grid.insert(current_tail_pos.clone(), 1);
            }
        }
    });
    tail_grid.points.len() 
}

fn part1(input: Input) -> usize {
    count_tail_moves(&input)
}

fn part2(input: Input) -> u64 {
    2
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

    static INPUT: &str = "R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 13);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 4);
    // }
}
