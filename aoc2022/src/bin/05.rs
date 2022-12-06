use aoc2022::read_file_input;
use regex::Regex;

type Stacks = Vec<Vec<char>>;
type Procedure = (usize, usize, usize);
type Input = (Stacks, Vec<Procedure>);

fn parse(input: &str) -> Input {
    let (stack_str, procedure_str) = input.split_once("\n\n").unwrap();

    let mut stack_iter = stack_str.lines().rev();

    let mut stack = vec![vec![]; stack_iter.next().unwrap().split_whitespace().count()];

    for line in stack_iter {
        line.chars().skip(1).enumerate().for_each(|(i, c)| {
            if i % 4 == 0 && c != ' ' {
                stack[i / 4].push(c);
            }
        });
    }

    let procedure_regex = Regex::new(r"(?m)move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)").unwrap();

    let procedures: Vec<Procedure> = procedure_regex
        .captures_iter(procedure_str)
        .filter_map(|cap| {
            Some((
                cap[1].parse().ok()?,
                cap[2].parse().ok()?,
                cap[3].parse().ok()?,
            ))
        })
        .collect();

    (stack, procedures)
}

fn get_top_row(stack: &Stacks) -> Option<char> {
    Some(stack.iter().max_by_key(|v| v.len())?.last()?.clone())
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
    println!("{}", get_top_row(&parsed.0).unwrap());
}
