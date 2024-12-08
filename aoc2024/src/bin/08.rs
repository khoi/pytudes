use std::{
    collections::{HashMap, HashSet},
    str::FromStr,
};

use aoc2024::{combinations, gcd, read_file_input, Grid, Point};

type Input = Grid<char>;

fn parse(input: &str) -> Input {
    Grid::from_str(input.trim()).unwrap()
}

fn part1(input: Input) -> usize {
    let char_positions: HashMap<char, Vec<Point>> = input
        .points()
        .filter(|p| {
            let c = *input.get(p);
            !c.is_ascii_whitespace() && c != '.'
        })
        .fold(HashMap::new(), |mut acc, p| {
            acc.entry(*input.get(&p)).or_default().push(p);
            acc
        });

    let mut all_points = HashSet::new();

    for positions in char_positions.values() {
        for combo in combinations(positions.clone(), 2) {
            let o1 = combo[0].opposite(&combo[1]);
            let o2 = combo[1].opposite(&combo[0]);

            if input.is_in_bound(&o1) {
                all_points.insert(o1);
            }
            if input.is_in_bound(&o2) {
                all_points.insert(o2);
            }
        }
    }

    all_points.len()
}

fn part2(input: Input) -> usize {
    let char_positions: HashMap<char, Vec<Point>> = input
        .points()
        .filter(|p| {
            let c = *input.get(p);
            !c.is_ascii_whitespace() && c != '.'
        })
        .fold(HashMap::new(), |mut acc, p| {
            acc.entry(*input.get(&p)).or_default().push(p);
            acc
        });

    let mut inline_points = HashSet::new();

    for positions in char_positions.values() {
        for combo in combinations(positions.clone(), 2) {
            let dx = combo[1].x - combo[0].x;
            let dy = combo[1].y - combo[0].y;

            // Get the GCD to find the smallest step size
            let gcd = gcd(dx, dy);
            let step_x = dx / gcd;
            let step_y = dy / gcd;

            // Calculate points in both directions using steps
            let steps_forward = (0..)
                .map(|i| Point {
                    x: combo[0].x + i * step_x,
                    y: combo[0].y + i * step_y,
                })
                .take_while(|p| input.is_in_bound(p));

            let steps_backward = (0..)
                .map(|i| Point {
                    x: combo[0].x - i * step_x,
                    y: combo[0].y - i * step_y,
                })
                .take_while(|p| input.is_in_bound(p));

            inline_points.extend(steps_forward);
            inline_points.extend(steps_backward);
        }
    }

    inline_points.len()
}

fn main() {
    let input = read_file_input(8);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 14);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 34);
    }
}
