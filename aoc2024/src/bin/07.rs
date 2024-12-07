use aoc2024::read_file_input;

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

fn evaluate(nums: &[u64], ops: &[char]) -> u64 {
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
            _ => panic!("Unknown operator"),
        }
    }
    result
}

fn can_make_value(target: u64, nums: &[u64]) -> bool {
    if nums.len() == 1 {
        return nums[0] == target;
    }

    let ops = ['+', '*'];
    let n = nums.len() - 1;
    let total_combinations = ops.len().pow(n as u32);

    // Try all possible combinations of operators
    for i in 0..total_combinations {
        let mut operators = Vec::with_capacity(n);
        let mut num = i;

        // Convert number to base-2 to get operator combinations
        for _ in 0..n {
            operators.push(ops[num % 2]);
            num /= 2;
        }

        if evaluate(nums, &operators) == target {
            return true;
        }
    }

    false
}

fn part1(input: Input) -> u64 {
    input
        .iter()
        .filter_map(|(target, nums)| {
            if can_make_value(*target, nums) {
                Some(target)
            } else {
                None
            }
        })
        .sum()
}

fn part2(input: Input) -> usize {
    input.iter().count()
}

fn main() {
    let input = read_file_input(7);
    let parsed = parse(&input);

    println!("{}", part1(parsed));
    // println!("{}", part2(parsed));
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

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(1, 1);
    // }
}
