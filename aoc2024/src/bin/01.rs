use aoc2024::read_file_input;

fn main() {
    let input = read_file_input(1);

    input.lines().for_each(|line| {
        println!("{}", line);
    });
}
