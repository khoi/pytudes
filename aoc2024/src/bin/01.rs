use aoc2024::read_file_input;
use std::collections::HashMap;

fn main() {
    let input = read_file_input(1);
    let mut first_numbers = Vec::new();
    let mut second_numbers = Vec::new();

    input.lines().for_each(|line| {
        let numbers: Vec<i32> = line
            .split_whitespace()
            .map(|n| n.parse().expect("Failed to parse number"))
            .collect();

        if numbers.len() == 2 {
            first_numbers.push(numbers[0]);
            second_numbers.push(numbers[1]);
        }
    });

    let mut number_counts: HashMap<i32, i32> = HashMap::new();
    for &num in &second_numbers {
        *number_counts.entry(num).or_insert(0) += 1;
    }

    // Sort both arrays
    first_numbers.sort();
    second_numbers.sort();

    let mut part1 = 0;
    let mut part2 = 0;
    // Zip through both sorted arrays together
    for (first, second) in first_numbers.iter().zip(second_numbers.iter()) {
        part1 += (first - second).abs();
        part2 += number_counts.get(first).unwrap_or(&0) * first;
    }

    println!("{}", part1);
    println!("{}", part2);
}
