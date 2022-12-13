use std::{env, fs};
use std::collections::{HashMap};

pub fn read_file_input(day: u8) -> String {
    let cwd = env::current_dir().unwrap();
    let filepath = cwd.join("src/inputs").join(format!("{:02}.txt", day));

    fs::read_to_string(filepath).unwrap()
}

#[derive(Clone)]
pub enum Direction {
    N,
    NE,
    E,
    SE,
    S,
    SW,
    W,
    NW,
}


#[derive(Clone, Debug, Eq, Hash, PartialEq)]
pub struct Point {
    pub x: isize,
    pub y: isize,
}

impl Point {
    pub fn manhattan_distance(&self, other: &Point) -> usize {
        ((self.x - other.x).abs() + (self.y - other.y).abs()) as usize
    }

    pub fn chebyshev_distance(&self, other: &Point) -> usize {
        ((self.x - other.x).abs().max((self.y - other.y).abs())) as usize
    }

    pub fn get_neighbor(&self, direction: &Direction) -> Point {
        match direction {
            Direction::N => Point { x: self.x, y: self.y + 1 },
            Direction::NE => Point { x: self.x + 1, y: self.y + 1 },
            Direction::E => Point { x: self.x + 1, y: self.y },
            Direction::SE => Point { x: self.x + 1, y: self.y - 1 },
            Direction::S => Point { x: self.x, y: self.y - 1 },
            Direction::SW => Point { x: self.x - 1, y: self.y - 1 },
            Direction::W => Point { x: self.x - 1, y: self.y },
            Direction::NW => Point { x: self.x - 1, y: self.y + 1 },
        }
    }
}

#[derive(Clone)]
pub struct InfiniteGrid<T> {
    pub points: HashMap<Point, T>,
}

impl<T> InfiniteGrid<T> {
    pub fn new() -> InfiniteGrid<T> {
        InfiniteGrid {
            points: HashMap::new(),
        }
    }

    pub fn get(&self, point: &Point) -> Option<&T> {
        self.points.get(point)
    }

    pub fn insert(&mut self, point: Point, data: T) {
        self.points.insert(point, data);
    }
}