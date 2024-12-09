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

impl std::fmt::Display for Entry {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Entry::Free(size) => write!(f, "Free({})", size),
            Entry::File(file) => write!(f, "File(id:{},len:{})", file.id, file.length),
        }
    }
}

struct FS {
    entries: Vec<Entry>,
}

impl FS {
    fn checksum(&self) -> usize {
        let mut position = 0;
        let mut sum = 0;
        for (idx, entry) in self.entries.iter().enumerate() {
            if let Entry::File(file) = entry {
                for _ in 0..file.length {
                    sum += file.id * position;
                    position += 1;
                }
            }
        }
        sum
    }

    fn defrag(&mut self) {
        let mut left = 0;
        let mut right = self.entries.len() - 1;

        while left < right {
            // Find next free space from left
            while left < right {
                if let Entry::Free(_) = self.entries[left] {
                    break;
                }
                left += 1;
            }

            // Find next file from right
            while left < right {
                if let Entry::File(_) = self.entries[right] {
                    break;
                }
                right -= 1;
            }

            if left >= right {
                break;
            }

            // Get sizes
            let free_size = if let Entry::Free(size) = self.entries[left] {
                size
            } else {
                continue;
            };

            let file = if let Entry::File(file) = self.entries[right] {
                file
            } else {
                continue;
            };

            if free_size < file.length {
                self.entries[left] = Entry::File(File {
                    id: file.id,
                    length: free_size,
                });

                // Update original file with remaining size
                self.entries[right] = Entry::File(File {
                    id: file.id,
                    length: file.length - free_size,
                });
                self.entries.insert(right + 1, Entry::Free(free_size));
                left += 1;
            } else {
                // Whole file case: move file to free space
                self.entries[left] = Entry::File(file);

                // Mark original position as free
                self.entries[right] = Entry::Free(file.length);

                // If there's remaining free space after moving file
                if free_size > file.length {
                    self.entries
                        .insert(left + 1, Entry::Free(free_size - file.length));
                }
                left += 1;
                right -= 1;
            }
        }
    }
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

fn part1(input: Input) -> usize {
    let mut fs = input.parse::<FS>().unwrap();
    fs.defrag();
    fs.checksum()
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

    #[test]
    fn test_fs_defrag() {
        let mut fs = INPUT.parse::<FS>().unwrap();
        fs.defrag();
        assert_eq!(fs.to_string(), "0099811188827773336446555566..............");
    }

    #[test]
    fn test_1() {
        let mut fs = INPUT.parse::<FS>().unwrap();
        fs.defrag();
        assert_eq!(fs.checksum(), 1928);
    }

    #[test]
    fn test_part1() {
        let result = part1(parse(&read_file_input(9)));
        assert_eq!(result, 6200294120911);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 2);
    // }
}
