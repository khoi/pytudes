use aoc2024::read_file_input;

#[derive(Debug, Clone, Copy)]
struct InputData {
    x1: u64,
    y1: u64,
    x2: u64,
    y2: u64,
    target_x: u64,
    target_y: u64,
}

type Input = Vec<InputData>;

fn solve(x1: f64, y1: f64, x2: f64, y2: f64, target_x: f64, target_y: f64) -> (usize, usize) {
    let a = (target_x * y2 - target_y * x2) / (x1 * y2 - y1 * x2);
    let b = (target_y * x1 - target_x * y1) / (x1 * y2 - y1 * x2);

    if a.fract() == 0.0 && b.fract() == 0.0 && a >= 0.0 && b >= 0.0 {
        (a as usize, b as usize)
    } else {
        (0, 0)
    }
}

fn parse(input: &str) -> Input {
    input
        .trim()
        .split("\n\n")
        .map(|section| {
            let lines: Vec<&str> = section.lines().collect();
            let (x1, y1) = parse_button(lines[0], "Button A");
            let (x2, y2) = parse_button(lines[1], "Button B");
            let (target_x, target_y) = parse_prize(lines[2]);

            InputData {
                x1,
                x2,
                y1,
                y2,
                target_x,
                target_y,
            }
        })
        .collect()
}

fn parse_button(line: &str, prefix: &str) -> (u64, u64) {
    let coords = line
        .strip_prefix(prefix)
        .unwrap()
        .strip_prefix(": ")
        .unwrap();
    let x = coords
        .split(", ")
        .next()
        .unwrap()
        .strip_prefix("X+")
        .unwrap()
        .parse::<u64>()
        .unwrap();
    let y = coords
        .split(", ")
        .nth(1)
        .unwrap()
        .strip_prefix("Y+")
        .unwrap()
        .parse::<u64>()
        .unwrap();
    (x, y)
}

fn parse_prize(line: &str) -> (u64, u64) {
    let coords = line.strip_prefix("Prize: ").unwrap();
    let x = coords
        .split(", ")
        .next()
        .unwrap()
        .strip_prefix("X=")
        .unwrap()
        .parse::<u64>()
        .unwrap();
    let y = coords
        .split(", ")
        .nth(1)
        .unwrap()
        .strip_prefix("Y=")
        .unwrap()
        .parse::<u64>()
        .unwrap();
    (x, y)
}

fn part1(input: Input) -> usize {
    input
        .iter()
        .map(|data| {
            let (a, b) = solve(
                data.x1 as f64,
                data.y1 as f64,
                data.x2 as f64,
                data.y2 as f64,
                data.target_x as f64,
                data.target_y as f64,
            );
            3 * a + b
        })
        .sum()
}

fn part2(input: Input) -> usize {
    input
        .iter()
        .map(|data| {
            let (a, b) = solve(
                data.x1 as f64,
                data.y1 as f64,
                data.x2 as f64,
                data.y2 as f64,
                (data.target_x + 10000000000000) as f64,
                (data.target_y + 10000000000000) as f64,
            );
            3 * a + b
        })
        .sum()
}

fn main() {
    let input = read_file_input(13);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279

";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 480);
    }
}
