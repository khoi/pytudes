#![allow(warnings)]

use aoc2024::read_file_input;

#[derive(Debug)]
enum Instruction {
    /// Divides A by 2^operand, stores in A (combo operand)
    Adv = 0,
    /// XORs B with literal operand, stores in B
    Bxl = 1,
    /// Sets B to operand mod 8 (combo operand)
    Bst = 2,
    /// Jumps to literal operand if A != 0
    Jnz = 3,
    /// XORs B with C, stores in B (ignores operand)
    Bxc = 4,
    /// Outputs operand mod 8 (combo operand)
    Out = 5,
    /// Like Adv but stores in B
    Bdv = 6,
    /// Like Adv but stores in C
    Cdv = 7,
}

#[derive(Debug, Clone, Copy)]
enum Operand {
    // 0-7 used directly as value
    Literal(u8),
    // 0-3: literal value
    // 4: value from reg A
    // 5: value from reg B
    // 6: value from reg C
    // 7: reserved
    Combo(u8),
}

impl Instruction {
    fn from_opcode(opcode: u8) -> Option<Instruction> {
        match opcode & 0b111 {
            0 => Some(Instruction::Adv),
            1 => Some(Instruction::Bxl),
            2 => Some(Instruction::Bst),
            3 => Some(Instruction::Jnz),
            4 => Some(Instruction::Bxc),
            5 => Some(Instruction::Out),
            6 => Some(Instruction::Bdv),
            7 => Some(Instruction::Cdv),
            _ => None,
        }
    }
}

#[derive(Debug, Clone)]
struct Computer {
    register_a: isize,
    register_b: isize,
    register_c: isize,
    instruction_ptr: usize,
    program: Vec<u8>,
}

impl Computer {
    fn new(register_a: isize, register_b: isize, register_c: isize, program: Vec<u8>) -> Self {
        Computer {
            register_a,
            register_b,
            register_c,
            instruction_ptr: 0,
            program,
        }
    }

    fn is_halted(&self) -> bool {
        self.instruction_ptr >= self.program.len()
    }

    fn execute(&mut self) -> Vec<isize> {
        let mut output = Vec::new();

        while !self.is_halted() {
            let opcode = self.program[self.instruction_ptr];
            let operand = self
                .program
                .get(self.instruction_ptr + 1)
                .expect("Missing operand");
            let instruction = Instruction::from_opcode(opcode).unwrap();
            let operand = match instruction {
                Instruction::Adv | Instruction::Bst | Instruction::Out => Operand::Combo(*operand),
                _ => Operand::Literal(*operand),
            };

            let operand_value = match operand {
                Operand::Literal(val) => val as isize,
                Operand::Combo(val) => match val {
                    0..=3 => val as isize,
                    4 => self.register_a,
                    5 => self.register_b,
                    6 => self.register_c,
                    _ => panic!("Unexpected combo operand value: {}", val),
                },
            };

            match instruction {
                Instruction::Adv => {
                    self.register_a /= 1 << operand_value;
                }
                Instruction::Bxl => {
                    self.register_b ^= operand_value;
                }
                Instruction::Bst => {
                    self.register_b = operand_value % 8;
                }
                Instruction::Jnz => {
                    if self.register_a != 0 {
                        self.instruction_ptr = operand_value as usize;
                        continue;
                    }
                }
                Instruction::Bxc => {
                    self.register_b ^= self.register_c;
                }
                Instruction::Out => {
                    output.push(operand_value % 8);
                }
                Instruction::Bdv => {
                    self.register_b = self.register_a / (1 << operand_value);
                }
                Instruction::Cdv => {
                    self.register_c = self.register_a / (1 << operand_value);
                }
            }

            self.instruction_ptr += 2;
        }

        output
    }
}

fn parse(input: &str) -> Computer {
    let input = input.trim();

    // Parse register values
    let mut registers = input.lines().take(3).map(|line| {
        line.split_once(": ")
            .map(|(_, val)| val.parse::<isize>().unwrap())
            .unwrap_or(0)
    });

    // Parse program bytes
    let program = input
        .lines()
        .find(|line| line.starts_with("Program:"))
        .map(|line| {
            line.split_once(": ")
                .unwrap()
                .1
                .split(',')
                .map(|n| n.trim().parse().unwrap())
                .collect()
        })
        .unwrap_or_default();

    Computer::new(
        registers.next().unwrap(),
        registers.next().unwrap(),
        registers.next().unwrap(),
        program,
    )
}

fn part1(mut computer: Computer) -> String {
    println!("{:?}", computer);
    let result = computer.execute();
    result
        .into_iter()
        .map(|n| n.to_string())
        .collect::<Vec<_>>()
        .join(",")
}

fn part2(computer: Computer) -> usize {
    2
}

fn main() {
    let input = read_file_input(17);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_execute() {
        let test_cases = vec![
            (
                729,
                0,
                0,
                vec![0, 1, 5, 4, 3, 0],
                vec![4, 6, 3, 5, 6, 3, 5, 2, 1, 0],
                None,
                None,
                None,
            ),
            (0, 0, 9, vec![2, 6], vec![], None, Some(1), None),
            (
                10,
                0,
                0,
                vec![5, 0, 5, 1, 5, 4],
                vec![0, 1, 2],
                None,
                None,
                None,
            ),
            (
                2024,
                0,
                0,
                vec![0, 1, 5, 4, 3, 0],
                vec![4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0],
                Some(0),
                None,
                None,
            ),
            (0, 29, 0, vec![1, 7], vec![], None, Some(26), None),
            (0, 2024, 43690, vec![4, 0], vec![], None, Some(44354), None),
        ];

        for (reg_a, reg_b, reg_c, program, expected_output, expected_a, expected_b, expected_c) in
            test_cases
        {
            let mut computer = Computer::new(reg_a, reg_b, reg_c, program);
            let output = computer.execute();

            assert_eq!(
                output, expected_output,
                "Output mismatch for A={}, B={}, C={}",
                reg_a, reg_b, reg_c
            );

            if let Some(a) = expected_a {
                assert_eq!(
                    computer.register_a, a,
                    "Register A mismatch for initial A={}, B={}, C={}",
                    reg_a, reg_b, reg_c
                );
            }
            if let Some(b) = expected_b {
                assert_eq!(
                    computer.register_b, b,
                    "Register B mismatch for initial A={}, B={}, C={}",
                    reg_a, reg_b, reg_c
                );
            }
            if let Some(c) = expected_c {
                assert_eq!(
                    computer.register_c, c,
                    "Register C mismatch for initial A={}, B={}, C={}",
                    reg_a, reg_b, reg_c
                );
            }
        }
    }
}
