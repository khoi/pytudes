use aoc2024::{read_file_input, Grid, Point};

#[derive(Debug, Clone, Copy)]
struct Robot {
    pos: Point,
    vel_x: isize,
    vel_y: isize,
}

type Input = Vec<Robot>;

fn parse(input: &str) -> Input {
    input
        .trim()
        .lines()
        .map(|line| {
            let (pos, vel) = line.split_once(" v=").unwrap();
            let pos = pos.trim_start_matches("p=");
            let (px, py) = pos.split_once(',').unwrap();
            let (vx, vy) = vel.split_once(',').unwrap();

            Robot {
                pos: Point {
                    x: px.parse().unwrap(),
                    y: py.parse().unwrap(),
                },
                vel_x: vx.parse().unwrap(),
                vel_y: vy.parse().unwrap(),
            }
        })
        .collect()
}

fn simulate_robots(robots: &mut Input, grid: &mut Grid<usize>) {
    for robot in robots.iter_mut() {
        // Update position
        robot.pos.x += robot.vel_x;
        robot.pos.y += robot.vel_y;

        // Wrap positions
        robot.pos.x = robot.pos.x.rem_euclid(grid.width as isize);
        robot.pos.y = robot.pos.y.rem_euclid(grid.height as isize);
    }

    // Reset grid
    grid.data = vec![vec![0; grid.width]; grid.height];

    // Count robots at each position
    for robot in robots.iter_mut() {
        let x = robot.pos.x as usize;
        let y = robot.pos.y as usize;
        grid.data[y][x] += 1;
    }
}

fn part1(input: Input) -> usize {
    let mut grid = Grid {
        width: 101,
        height: 103,
        data: vec![vec![0; 101]; 103],
    };
    let mut robots = input;

    for _ in 0..100 {
        simulate_robots(&mut robots, &mut grid);
    }

    // Count robots in each quadrant
    let mut quadrant_counts = [0; 4];
    let mid_x = (grid.width / 2) as isize;
    let mid_y = (grid.height / 2) as isize;

    for point in grid.points() {
        let robo_count = grid.get(&point);
        if *robo_count > 0 {
            if point.x == mid_x || point.y == mid_y {
                continue;
            }
            let quadrant = match (point.x, point.y) {
                (x, y) if x < mid_x && y < mid_y => 0, // Q1
                (x, y) if x > mid_x && y < mid_y => 1, // Q2
                (x, y) if x < mid_x && y > mid_y => 2, // Q3
                (x, y) if x > mid_x && y > mid_y => 3, // Q4
                _ => panic!("Unexpected point {}", point),
            };
            quadrant_counts[quadrant] += robo_count;
        }
    }

    quadrant_counts.iter().product::<usize>()
}

fn part2(input: Input) -> usize {
    for second in 1..=1000000 {
        if second % 1000 == 0 {
            println!("Second: {}", second);
        }
        let robot_count = input.len();
    }
    0
}

fn main() {
    let input = read_file_input(14);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3

";

    #[test]
    fn test_part1_example() {
        let mut grid = Grid {
            width: 11,
            height: 7,
            data: vec![vec![0; 11]; 7],
        };
        let mut robots = parse(INPUT);

        for _ in 0..100 {
            simulate_robots(&mut robots, &mut grid);
        }

        // Count robots in each quadrant
        let mut quadrant_counts = [0; 4];
        let mid_x = (grid.width / 2) as isize;
        let mid_y = (grid.height / 2) as isize;

        for point in grid.points() {
            let robo_count = grid.get(&point);
            if *robo_count > 0 {
                if point.x == mid_x || point.y == mid_y {
                    continue;
                }
                let quadrant = match (point.x, point.y) {
                    (x, y) if x < mid_x && y < mid_y => 0,
                    (x, y) if x > mid_x && y < mid_y => 1,
                    (x, y) if x < mid_x && y > mid_y => 2,
                    (x, y) if x > mid_x && y > mid_y => 3,
                    _ => panic!("Unexpected point {}", point),
                };
                quadrant_counts[quadrant] += robo_count;
            }
        }

        assert_eq!(quadrant_counts.iter().product::<usize>(), 12);
    }

    #[test]
    fn test_part1_real() {
        let input = parse(&read_file_input(14));
        let result = part1(input);
        assert_eq!(result, 224438715);
    }
}
