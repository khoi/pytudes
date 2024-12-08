use aoc2024::read_file_input;

fn cartesian_product<T: Clone>(items: Vec<T>, repeat: usize) -> Vec<Vec<T>> {
    if repeat == 0 {
        return vec![vec![]];
    }

    let mut result = Vec::new();
    let items_clone = items.clone();

    for item in items {
        for mut sub_product in cartesian_product(items_clone.clone(), repeat - 1) {
            sub_product.insert(0, item.clone());
            result.push(sub_product);
        }
    }

    result
}
type Input = Vec<(u64, Vec<u64>)>;

fn parse(input: &str) -> Input {
    input
        .trim()
        .lines()
        .map(|line| {
            let (num, rest) = line.split_once(':').unwrap();
            let numbers: Vec<u64> = rest
                .split_whitespace()
                .map(|n| n.parse().unwrap())
                .collect();
            (num.parse().unwrap(), numbers)
        })
        .collect()
}

fn evaluate(nums: &[u64], ops: Vec<char>) -> u64 {
    assert_eq!(
        ops.len(),
        nums.len() - 1,
        "Number of operators must be one less than number of operands"
    );

    let mut result = nums[0];
    for (i, &op) in ops.iter().enumerate() {
        match op {
            '+' => result += nums[i + 1],
            '*' => result *= nums[i + 1],
            '|' => {
                let digits = (nums[i + 1] as f64).log10().floor() as u32 + 1;
                result = result * 10_u64.pow(digits) + nums[i + 1];
            }
            _ => panic!("Unknown operator"),
        }
    }

    result
}

fn can_make_value(target: u64, nums: &[u64], ops: Vec<char>) -> bool {
    if nums.len() == 1 {
        return nums[0] == target;
    }

    let operator_combinations = cartesian_product(ops, nums.len() - 1);

    for ops in operator_combinations {
        if evaluate(nums, ops) == target {
            return true;
        }
    }

    false
}

fn part1(input: Input) -> u64 {
    input
        .iter()
        .filter_map(|(target, nums)| {
            if can_make_value(*target, nums, vec!['+', '*']) {
                Some(target)
            } else {
                None
            }
        })
        .sum()
}

fn part2(input: Input) -> u64 {
    input
        .iter()
        .filter_map(|(target, nums)| {
            if can_make_value(*target, nums, vec!['+', '*', '|']) {
                Some(target)
            } else {
                None
            }
        })
        .sum()
}

fn main() {
    let input = read_file_input(7);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 3749);
    }

    #[test]
    fn test_2() {
        let result = part2(parse(INPUT));
        assert_eq!(result, 11387);
    }
}
