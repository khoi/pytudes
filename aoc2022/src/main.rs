use std::process::Command;
fn main() {
    for day in 1..=25 {
        let abc = "abcdef";
        let chars = abc.chars();
        chars.for_each(|c| println!("{}", c));
        chars.for_each(|c| println!("{}", c));
    }
}
