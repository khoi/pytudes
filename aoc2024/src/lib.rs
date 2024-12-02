use std::collections::HashMap;
use std::fmt::Debug;
use std::str::FromStr;
use std::{env, fs};

pub fn read_file_input(day: u8) -> String {
    let cwd = env::current_dir().unwrap();
    let filepath = cwd.join("src/inputs").join(format!("{:02}.txt", day));

    fs::read_to_string(filepath).unwrap()
}
