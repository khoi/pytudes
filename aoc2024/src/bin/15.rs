#![allow(warnings)]

use std::str::FromStr;

use aoc2024::{read_file_input, Direction, Grid, Point};

type Input = (Grid<char>, Vec<char>);

fn parse(input: &str) -> Input {
    let parts: Vec<&str> = input.trim().split("\n\n").collect();

    // Parse grid
    let grid = Grid::from_str(parts[0]).unwrap();

    // Parse moves as char array
    let moves: Vec<char> = parts[1]
        .lines()
        .flat_map(|line| line.chars())
        .filter(|&c| !c.is_whitespace())
        .collect();

    (grid, moves)
}

fn make_move(grid: &mut Grid<char>, pos: Point, mv: char) -> Point {
    let direction = match mv {
        '<' => Direction::W,
        '>' => Direction::E,
        '^' => Direction::N,
        'v' => Direction::S,
        _ => panic!("Invalid move character: {}", mv),
    };

    let next_pos = pos.get_neighbor(&direction);
    if !grid.is_in_bound(&next_pos) || *grid.get(&next_pos) == '#' {
        return pos;
    }

    let mut connected_o_count = 0;
    let mut check_pos = next_pos;

    while grid.is_in_bound(&check_pos) && *grid.get(&check_pos) == 'O' {
        connected_o_count += 1;
        check_pos = check_pos.get_neighbor(&direction);
    }

    // Check if we have enough empty spaces after the O's
    let mut space_count = 0;
    let mut space_pos = check_pos;
    while grid.is_in_bound(&space_pos) && *grid.get(&space_pos) == '.' {
        space_count += 1;
        space_pos = space_pos.get_neighbor(&direction);
    }

    if grid.is_in_bound(&check_pos) && space_count >= 1 {
        let mut write_pos = check_pos;
        for _ in 0..connected_o_count {
            grid.data[write_pos.y as usize][write_pos.x as usize] = 'O';
            write_pos = write_pos.get_neighbor(&Direction::opposite(&direction));
        }

        grid.data[next_pos.y as usize][next_pos.x as usize] = '@';
        grid.data[pos.y as usize][pos.x as usize] = '.';
        return next_pos;
    }

    pos
}

fn gps(grid: &Grid<char>) -> usize {
    grid.points()
        .filter(|p| *grid.get(p) == 'O')
        .map(|p| {
            return (p.y as usize) * 100 + p.x as usize;
        })
        .sum()
}

fn part1(input: Input) -> usize {
    let (mut grid, moves) = input;
    let mut start = grid.points().find(|(c)| *grid.get(c) == '@').unwrap();
    for mv in moves.iter() {
        start = make_move(&mut grid, start, *mv);
    }
    gps(&grid)
}

fn part2(input: Input) -> usize {
    2
}

fn main() {
    let input = read_file_input(15);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<

";

    static INPUT2: &str = "
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^

";
    #[test]
    fn test_1() {
        assert_eq!(part1(parse(INPUT)), 2028);
    }

    #[test]
    fn test_1_2() {
        assert_eq!(part1(parse(INPUT2)), 10092);
    }

    #[test]
    fn test_gps() {
        let input = "
#######
#...O..
#......
";
        let grid = Grid::from_str(input.trim()).unwrap();
        assert_eq!(gps(&grid), 104);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(&parse(INPUT));
    //     assert_eq!(result, 0);
    // }
}
