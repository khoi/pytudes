use aoc2022::read_file_input;
use regex::Regex;

type Input = u64;

#[derive(Debug)]
struct Procedure {
    count: u64,
    from: u64,
    to: u64,
}

fn parse(input: &str) -> Input {
    let lines: Vec<&str> = input.lines().collect();

    let mut empty_line_index = 0;

    for (i, line) in lines.iter().enumerate() {
        if line.trim().is_empty() {
            empty_line_index = i;
            break;
        }
    }

    let procedure_regex = Regex::new(r"(?m)move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)").unwrap();
    let procedure_str = lines
        .into_iter()
        .skip(empty_line_index + 1)
        .collect::<Vec<&str>>()
        .join(" ");

    let procedures: Vec<Procedure> = procedure_regex
        .captures_iter(&procedure_str)
        .map(|cap| {
            let count = cap[1].parse::<u64>().unwrap();
            let from = cap[2].parse::<u64>().unwrap();
            let to = cap[3].parse::<u64>().unwrap();
            Procedure { count, from, to }
        })
        .collect();

    println!("{:?}", procedures);
    println!("{:?}", empty_line_index);
    0
}

pub fn part1(input: &Input) -> char {
    'A'
}

pub fn part2(input: &Input) -> char {
    'B'
}

fn main() {
    let input = read_file_input(05);
    let parsed = parse(&input);
}
