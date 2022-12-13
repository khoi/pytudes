use std::collections::{HashSet};

use aoc2022::read_file_input;

type Input<'a> = Vec<(char, usize)>;
type Position = (isize, isize);

fn parse(input: &str) -> Input {
    input.lines().map(|l| {
        let w = l.split_whitespace().collect::<Vec<_>>();
        (w[0].chars().next().unwrap(), w[1].parse::<usize>().unwrap())
    }).collect()
}

fn is_touching(head: Position, tail: Position) -> bool {
    let del_x = (head.0 - tail.0).abs();
    let del_y = (head.1 - tail.1).abs();
    match (del_x, del_y) {
        (0, 0) => true,
        (1, 1) => true,
        (1, 0) => true,
        (0, 1) => true,
        _ => false,
    }
}

fn follow_instruction_directions(head: Position, tail: Position) -> Vec<char> {
    if is_touching(head, tail) {
        return vec![];
    }

    let mut directions = vec![];
    let del_x = head.0 - tail.0;
    let del_y = head.1 - tail.1;
    
    if del_x != 0 {
        directions.push(if del_x > 0 {'R'} else {'L'});
    }

    if del_y != 0 {
        directions.push(if del_y > 0 {'U'} else {'D'});
    }

    directions
}

fn new_pos(pos: Position, dir: char, dist: usize) -> Position {
    match dir {
        'R' => (pos.0 + dist as isize, pos.1),
        'L' => (pos.0 - dist as isize, pos.1),
        'U' => (pos.0, pos.1 + dist as isize),
        'D' => (pos.0, pos.1 - dist as isize),
        _ => panic!("Invalid direction"),
    }
}

fn part1(input: Input) -> usize {
    
    let mut current_head_pos: Position = (0, 0);
    let mut current_tail_pos: Position = (0, 0);
    let mut visited: HashSet<Position> = HashSet::new();
    visited.insert(current_tail_pos);

    input.iter().for_each(|f| {
        for _ in 0..f.1 {
            current_head_pos = new_pos(current_head_pos, f.0, 1);
            let follow_instructions = follow_instruction_directions(current_head_pos, current_tail_pos);

            for i in 0..follow_instructions.len() {
                let is_diagonal = follow_instructions.len() == 2;
                current_tail_pos = new_pos(current_tail_pos, follow_instructions[i], 1);
                if is_diagonal && i == 0 { // skip the first step of a diagonal
                    continue;
                }
                visited.insert(current_tail_pos);
            }
        }
    });
    visited.len() 
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

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 4);
    }
}
