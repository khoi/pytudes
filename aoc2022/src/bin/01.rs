use aoc2022::read_file_input;
use std::collections::BinaryHeap;

fn main() {
    let input = read_file_input(01);

    let mut heap: BinaryHeap<i32> = BinaryHeap::new();

    let mut curr_iter_max = 0;
    input.lines().for_each(|line| {
        if line.is_empty() {
            heap.push(curr_iter_max);
            curr_iter_max = 0;
            return;
        }

        let num = line.parse::<i32>().unwrap();
        curr_iter_max += num;
    });

    let top3 = [
        heap.pop().unwrap(),
        heap.pop().unwrap(),
        heap.pop().unwrap(),
    ];
    println!("{}", top3[0]);
    println!("{}", top3.iter().sum::<i32>());
}
