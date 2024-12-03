use aoc2024::read_file_input;

type Input = Vec<Vec<i64>>;

fn parse(input: &str) -> Input {
    input
        .trim()
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|n| n.parse().unwrap())
                .collect()
        })
        .collect()
}

fn part1(input: Input) -> usize {
    let mut sum = 0;
    for row in input.iter() {
        if is_safe(row.clone()) {
            sum += 1;
        }
    }
    sum
}

// * The levels are either *all increasing* or *all decreasing*.
// * Any two adjacent levels differ by *at least one* and *at most three*.
fn is_safe(row: Vec<i64>) -> bool {
    if row.len() < 2 {
        return false;
    }

    let is_increasing = row[0] < row[1];
    for pair in row.windows(2) {
        let diff = pair[1] - pair[0];

        // Check if the direction matches the initial direction
        if (diff > 0) != is_increasing {
            return false;
        }

        // Check if the absolute difference is between 1 and 3
        let abs_diff = diff.abs();
        if !(1..=3).contains(&abs_diff) {
            return false;
        }
    }
    true
}

fn is_safe2(row: Vec<i64>) -> bool {
    if row.len() < 2 {
        return false;
    }

    // First check if it's already safe without removing anything
    if is_safe(row.clone()) {
        return true;
    }

    // Try removing each element one at a time
    for i in 0..row.len() {
        let mut modified_row = row.clone();
        modified_row.remove(i);

        if is_safe(modified_row) {
            return true;
        }
    }

    false
}

fn part2(input: Input) -> usize {
    let mut sum = 0;
    for row in input.iter() {
        if is_safe2(row.clone()) {
            sum += 1;
        }
    }
    sum
}

fn main() {
    let input = read_file_input(2);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 2);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 4);
    }
}
