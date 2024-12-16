use std::collections::HashSet;
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

fn enlarge_the_map(input: Input) -> Input {
    let (original_grid, moves) = input;
    let mut new_data = Vec::with_capacity(original_grid.height);

    for row in original_grid.data.iter() {
        let mut new_row = Vec::with_capacity(original_grid.width * 2);
        for &c in row.iter() {
            match c {
                '#' => new_row.extend(['#', '#']),
                'O' => new_row.extend(['[', ']']),
                '.' => new_row.extend(['.', '.']),
                '@' => new_row.extend(['@', '.']),
                _ => panic!("Invalid character in grid: {}", c),
            }
        }
        new_data.push(new_row);
    }

    let new_grid = Grid {
        width: original_grid.width * 2,
        height: original_grid.height,
        data: new_data,
    };

    (new_grid, moves)
}

fn colliding_points(grid: &Grid<char>, pos: Point, moving_direction: Direction) -> HashSet<Point> {
    let mut visited = HashSet::new();
    let mut stack = vec![pos];
    let mut result = HashSet::new();

    while let Some(p) = stack.pop() {
        if !visited.insert(p) {
            continue;
        }

        let value = grid.get(&p);

        if value != &'[' && value != &']' {
            continue;
        }

        result.insert(p);

        let directions: Vec<Direction> = match (moving_direction, value) {
            (Direction::W | Direction::E, _) => vec![Direction::W, Direction::E],
            (Direction::S, &'[') => vec![Direction::E, Direction::S, Direction::SE],
            (Direction::S, &']') => vec![Direction::W, Direction::S, Direction::SW],
            (Direction::N, &'[') => vec![Direction::E, Direction::N, Direction::NE],
            (Direction::N, &']') => vec![Direction::W, Direction::N, Direction::NW],
            _ => panic!("Invalid moving direction: {:?}", moving_direction),
        };

        for d in directions {
            let n = p.get_neighbor(&d);
            if !grid.is_in_bound(&n) {
                continue;
            }
            stack.push(n);
        }
    }

    result
}

fn make_move2(grid: &mut Grid<char>, pos: Point, mv: char) -> Point {
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

    if *grid.get(&next_pos) == '.' {
        grid.data[next_pos.y as usize][next_pos.x as usize] = '@';
        grid.data[pos.y as usize][pos.x as usize] = '.';
        return next_pos;
    }

    let robots = colliding_points(grid, next_pos, direction);

    for robot in robots.iter() {
        let next_robot_pos = robot.get_neighbor(&direction);
        if robots.contains(&next_robot_pos) {
            continue;
        }

        if !grid.is_in_bound(&next_robot_pos) || *grid.get(&next_robot_pos) != '.' {
            return pos; // Can't move
        }
    }

    // Move robots
    for robot in robots.iter() {
        grid.data[robot.y as usize][robot.x as usize] = '.';
    }

    let mut sorted_robots: Vec<_> = robots.into_iter().collect();
    sorted_robots.sort_by_key(|p| p.x + grid.width as isize * p.y);

    for (i, robot) in sorted_robots.iter().enumerate() {
        let next_robot_pos = robot.get_neighbor(&direction);
        grid.data[next_robot_pos.y as usize][next_robot_pos.x as usize] =
            if (i) % 2 == 0 { '[' } else { ']' };
    }

    // Move self
    grid.data[next_pos.y as usize][next_pos.x as usize] = '@';
    grid.data[pos.y as usize][pos.x as usize] = '.';
    next_pos
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
        .map(|p| (p.y as usize) * 100 + p.x as usize)
        .sum()
}

fn gps2(grid: &Grid<char>) -> usize {
    let mut sorted_robots: Vec<_> = grid.points().collect();
    sorted_robots.sort_by_key(|p| p.x + grid.width as isize * p.y);

    let mut total = 0;
    for pair in sorted_robots.windows(2) {
        let (p1, p2) = (pair[0], pair[1]);
        if *grid.get(&p1) == '[' && *grid.get(&p2) == ']' {
            total += (p1.y as usize) * 100 + p1.x as usize;
        }
    }

    total
}

fn part1(input: Input) -> usize {
    let (mut grid, moves) = input;
    let mut start = grid.points().find(|c| *grid.get(c) == '@').unwrap();
    for mv in moves.iter() {
        start = make_move(&mut grid, start, *mv);
    }
    gps(&grid)
}

fn part2(input: Input) -> usize {
    let (mut grid, moves) = enlarge_the_map(input);
    let mut start = grid.points().find(|c| *grid.get(c) == '@').unwrap();
    for mv in moves {
        start = make_move2(&mut grid, start, mv);
    }
    gps2(&grid)
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

    #[test]
    fn test_2() {
        assert_eq!(part2(parse(INPUT2)), 9021);
    }

    #[test]
    fn test_gps2() {
        let input = "
##########
##...[]...
##........

";
        let grid = Grid::from_str(input.trim()).unwrap();
        assert_eq!(gps2(&grid), 105);
    }
}
