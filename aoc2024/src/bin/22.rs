use aoc2024::read_file_input;

type Input = Vec<usize>;

fn parse(input: &str) -> Input {
    input.trim().lines().map(|l| l.parse().unwrap()).collect()
}

fn generate_next(secret: usize) -> usize {
    const MOD: usize = 16777216;
    let mut n = (secret ^ (secret * 64)) % MOD;
    n = (n ^ (n / 32)) % MOD;
    (n ^ (n * 2048)) % MOD
}

fn get_nth_number(start: usize, n: usize) -> usize {
    let mut current = start;
    for _ in 0..n {
        current = generate_next(current);
    }
    current
}

fn part1(input: Input) -> usize {
    input.iter().map(|&start| get_nth_number(start, 2000)).sum()
}

fn get_price(secret: usize) -> i32 {
    (secret % 10) as i32
}

const SIZE: usize = 19 * 19 * 19 * 19;

fn get_index(a: i32, b: i32, c: i32, d: i32) -> usize {
    (19 * 19 * 19 * (a + 9) + 19 * 19 * (b + 9) + 19 * (c + 9) + (d + 9)) as usize
}

fn part2(input: Input) -> usize {
    let mut market = vec![0; SIZE];
    let mut control = vec![-1i32; SIZE];

    for (buyer_idx, &start) in input.iter().enumerate() {
        let buyer_idx = buyer_idx as i32;
        let mut secret = start;
        let mut last_price = get_price(secret);
        let mut changes = Vec::with_capacity(4);

        for _ in 0..2000 {
            secret = generate_next(secret);
            let price = get_price(secret);
            let change = price - last_price;
            last_price = price;

            if changes.len() < 4 {
                changes.push(change);
                continue;
            }

            changes.copy_within(1..4, 0);
            changes[3] = change;

            let idx = get_index(changes[0], changes[1], changes[2], changes[3]);

            if control[idx] == buyer_idx {
                continue;
            }

            control[idx] = buyer_idx;
            market[idx] += price as usize;
        }
    }

    *market.iter().max().unwrap()
}

fn main() {
    let input = read_file_input(22);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "1
10
100
2024";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 37327623);
    }

    #[test]
    fn test_2() {
        let result = part2(parse("1\n2\n3\n2024"));
        assert_eq!(result, 23);
    }
}
