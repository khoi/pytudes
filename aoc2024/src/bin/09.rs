use aoc2024::read_file_input;

type Input<'a> = &'a str;

fn expand_dense_format(input: &str) -> String {
    input
        .chars()
        .collect::<Vec<_>>()
        .chunks(2)
        .enumerate()
        .fold(String::new(), |mut acc, (i, chunk)| {
            acc.push_str(
                &i.to_string()
                    .repeat(chunk[0].to_digit(10).unwrap() as usize),
            );
            if chunk.len() == 2 {
                acc.push_str(&".".repeat(chunk[1].to_digit(10).unwrap() as usize));
            }
            acc
        })
}

fn compact(input: &str) -> String {
    let mut chars: Vec<char> = input.chars().collect();
    let mut left = 0;
    let mut right = chars.len() - 1;

    while left < right {
        // Move left pointer until we find a dot
        while left < right && chars[left] != '.' {
            left += 1;
        }

        // Move right pointer until we find a digit
        while left < right && !chars[right].is_ascii_digit() {
            right -= 1;
        }

        // If pointers are still valid, swap the characters
        if left < right {
            chars.swap(left, right);
            left += 1;
            right -= 1;
        }
    }

    chars.into_iter().collect()
}

fn checksum(input: &str) -> u64 {
    input.chars().enumerate().fold(0, |acc, (i, c)| {
        acc + (i as u64) * c.to_digit(10).unwrap_or(0) as u64
    })
}

fn parse(input: &str) -> Input {
    input.trim()
}

fn part1(input: Input) -> u64 {
    let expanded = expand_dense_format(input);
    let compacted = compact(&expanded);
    checksum(&compacted)
}

fn part2(input: Input) -> usize {
    input.len()
}

fn main() {
    let input = read_file_input(9);
    let parsed = parse(&input);

    println!("{}", part1(parsed));
    println!("{}", part2(parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "2333133121414131402";

    #[test]
    fn test_expand_dense() {
        let result = expand_dense_format(INPUT);
        assert_eq!(result, "00...111...2...333.44.5555.6666.777.888899");
    }

    #[test]
    fn test_checksum() {
        let result = checksum("0099811188827773336446555566..............");
        assert_eq!(result, 1928);
    }

    #[test]
    fn test_compact() {
        let result = compact("00...111...2...333.44.5555.6666.777.888899");
        assert_eq!(result, "0099811188827773336446555566..............");
    }
    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 1928);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 2);
    // }
}
