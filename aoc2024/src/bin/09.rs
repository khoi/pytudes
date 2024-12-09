use aoc2024::read_file_input;

type Input<'a> = &'a str;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct File {
    id: usize,
    length: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum Entry {
    Free(usize),
    File(File),
}

struct FS {
    entries: Vec<Entry>,
}

impl std::fmt::Display for FS {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for e in self.entries.iter() {
            match e {
                Entry::Free(size) => write!(f, "{}", ".".repeat(*size))?,
                Entry::File(file) => write!(f, "{}", file.id.to_string().repeat(file.length))?,
            }
        }

        Ok(())
    }
}

impl std::str::FromStr for FS {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut entries = vec![];
        for (i, c) in s.chars().enumerate() {
            if i % 2 == 0 {
                entries.push(Entry::File(File {
                    id: i / 2,
                    length: c.to_digit(10).unwrap() as usize,
                }));
            } else {
                entries.push(Entry::Free(c.to_digit(10).unwrap() as usize));
            }
        }
        Ok(FS { entries })
    }
}

fn parse(input: &str) -> Input {
    input.trim()
}

fn part1(input: Input) -> u64 {
    let fs = input.parse::<FS>().unwrap();
    println!("{}", fs);
    1
}

fn part2(input: Input) -> usize {
    2
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
    fn test_fs() {
        let fs = INPUT.parse::<FS>().unwrap();
        assert_eq!(fs.to_string(), "00...111...2...333.44.5555.6666.777.888899");
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 2);
    // }
}
