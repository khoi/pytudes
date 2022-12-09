use aoc2022::read_file_input;
use std::collections::HashMap;

type Input<'a> = HashMap<String, usize>;

fn parse(input: &str) -> HashMap<String, usize> {
    let mut nodes_map = [("".to_string(), 0)]
        .into_iter()
        .collect::<HashMap<String, usize>>();
    let mut current_dir = "".to_string();

    input
        .split("$ ")
        .skip(2)
        .map(|c| {
            let (cmd, other) = c.split_at(2);
            (cmd, other.trim())
        })
        .try_for_each(|(cmd, other)| match (cmd, other) {
            ("cd", "..") => {
                current_dir = current_dir
                    .split("/")
                    .take(current_dir.split("/").count() - 1)
                    .collect::<Vec<&str>>()
                    .join("/");
                Some(())
            }
            ("cd", dir) => {
                current_dir.push_str(format!("/{}", dir).as_str());
                Some(())
            }
            ("ls", nodes) => {
                nodes
                    .lines()
                    .for_each(|l| match l.split_once(" ").unwrap() {
                        ("dir", dir) => {
                            nodes_map.insert(format!("{}/{}", current_dir, dir), 0);
                        }
                        (size, file) => {
                            let mut path = current_dir.clone();
                            let size = size.parse::<usize>().unwrap();
                            loop {
                                nodes_map.entry(path.clone()).and_modify(|s| *s += size);
                                if path.is_empty() {
                                    break;
                                }
                                path.drain(path.rfind('/').unwrap_or(0)..);
                            }
                        }
                        _ => unreachable!(),
                    });
                Some(())
            }
            _ => unreachable!(),
        });

    nodes_map
}

pub fn part1(input: Input) -> usize {
    input.into_values().filter(|&size| size <= 100000).sum()
}

fn part2(input: Input) -> usize {
    let total = input[""];
    input
        .into_values()
        .filter(|size| 70000000 - (total - size) >= 30000000)
        .min()
        .unwrap_or(total)
}

fn main() {
    let input = read_file_input(07);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 95437);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(&parse(INPUT));
    //     assert_eq!(result, 4);
    // }
}
