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

fn get_top_row(stack: &Stacks) -> String {
    stack.iter().filter_map(|m| m.last()).collect::<String>()
}

fn process(stacks: &mut Stacks, procedures: &[Procedure], multiple_mover: bool) {
    for (amount, from, to) in procedures {
        let origin = &mut stacks[*from - 1];
        let crates = origin.split_off(origin.len() - amount);
        if multiple_mover {
            stacks[*to - 1].extend(crates.iter());
        } else {
            stacks[*to - 1].extend(crates.iter().rev());
        }
    }
}

pub fn part1(input: Input) -> String {
    let (mut stacks, procedures) = input;
    process(&mut stacks, &procedures, false);
    get_top_row(&stacks)
}

pub fn part2(input: Input) -> String {
    let (mut stacks, procedures) = input;
    process(&mut stacks, &procedures, true);
    get_top_row(&stacks)
}

fn main() {
    let input = read_file_input(05);
    let parsed = parse(&input);
    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}
