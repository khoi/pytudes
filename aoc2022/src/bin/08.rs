use aoc2022::read_file_input;

type Input<'a> = Vec<Vec<usize>>;

fn parse(input: &str) -> Input {
    input
        .lines()
        .map(|l| {
            l.chars()
                .map(|c| c.to_digit(10).unwrap() as usize)
                .collect()
        })
        .collect()
}

pub fn part1(input: Input) -> usize {
    let width = input.len();
    let height = input[0].len();
    let mut trees = 2 * width + 2 * height - 4;
    for row in 1..width - 1 {
        for col in 1..height - 1 {
            let tree = input[row][col];
            let left: usize = (0..col)
                .map(|i| if input[row][i] >= tree { 1 } else { 0 })
                .sum();
            let right: usize = (col + 1..width)
                .map(|i| if input[row][i] >= tree { 1 } else { 0 })
                .sum();
            let top: usize = (0..row)
                .map(|i| if input[i][col] >= tree { 1 } else { 0 })
                .sum();
            let down: usize = (row + 1..height)
                .map(|i| if input[i][col] >= tree { 1 } else { 0 })
                .sum();

            if left == 0 || right == 0 || top == 0 || down == 0 {
                trees += 1;
            }
        }
    }
    trees
}

fn part2(input: Input) -> usize {
    let width = input.len();
    let height = input[0].len();
    let mut max_score = 0;
    for row in 1..width - 1 {
        for col in 1..height - 1 {
            let tree = input[row][col];

            let top: usize = (0..row)
                .rev()
                .enumerate()
                .take_while(|e| input[e.1][col] < tree && e.1 != 0)
                .count()
                + 1;

            let right: usize = (col + 1..width)
                .enumerate()
                .take_while(|e| input[row][e.1] < tree && e.1 != width - 1)
                .count()
                + 1;

            let down: usize = (row + 1..height)
                .enumerate()
                .take_while(|e| (input[e.1][col] < tree) && e.1 != height - 1)
                .count()
                + 1;

            let left = (0..col)
                .rev()
                .enumerate()
                .take_while(|e| input[row][e.1] < tree && e.1 != 0)
                .count()
                + 1;

            max_score = max_score.max(top * right * down * left);
        }
    }
    max_score
}

fn main() {
    let input = read_file_input(08);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "30373
25512
65332
33549
35390";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 21);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 8);
    }
}
