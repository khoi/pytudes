use std::{
    env,
    fmt::{self},
    fs,
    str::FromStr,
};

pub fn read_file_input(day: u8) -> String {
    let cwd = env::current_dir().unwrap();
    let filepath = cwd.join("src/inputs").join(format!("{:02}.txt", day));

    fs::read_to_string(filepath).unwrap()
}

#[derive(Clone, Copy, Debug)]
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

#[derive(Clone, Debug, Eq, Hash, PartialEq, Copy)]
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
            Direction::N => Point {
                x: self.x,
                y: self.y - 1,
            },
            Direction::NE => Point {
                x: self.x + 1,
                y: self.y - 1,
            },
            Direction::E => Point {
                x: self.x + 1,
                y: self.y,
            },
            Direction::SE => Point {
                x: self.x + 1,
                y: self.y + 1,
            },
            Direction::S => Point {
                x: self.x,
                y: self.y + 1,
            },
            Direction::SW => Point {
                x: self.x - 1,
                y: self.y + 1,
            },
            Direction::W => Point {
                x: self.x - 1,
                y: self.y,
            },
            Direction::NW => Point {
                x: self.x - 1,
                y: self.y - 1,
            },
        }
    }
}

#[derive(Clone)]
pub struct Grid<T> {
    pub width: usize,
    pub height: usize,
    pub data: Vec<Vec<T>>,
}

impl fmt::Debug for Grid<char> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for (i, line) in self.data.iter().enumerate() {
            for (j, c) in line.iter().enumerate() {
                write!(f, "{}({},{}) ", c, j, i)?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}

impl fmt::Display for Grid<char> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for line in self.data.iter() {
            for c in line.iter() {
                write!(f, "{}", c)?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}

impl<T> Grid<T> {
    pub fn is_in_bound(&self, point: &Point) -> bool {
        point.x >= 0
            && point.x < self.width as isize
            && point.y >= 0
            && point.y < self.height as isize
    }

    pub fn point_from_idx(&self, idx: usize) -> Point {
        Point {
            x: (idx % self.width) as isize,
            y: (idx / self.width) as isize,
        }
    }

    pub fn get(&self, point: &Point) -> &T {
        &self.data[point.y as usize][point.x as usize]
    }

    pub fn iter<'a>(&'a self, point: Point, direction: &'a Direction) -> GridIterator<T> {
        GridIterator {
            grid: self,
            current: point,
            direction,
        }
    }

    pub fn points(&self) -> impl Iterator<Item = Point> + '_ {
        let mut idx = 0;
        std::iter::from_fn(move || {
            if idx < self.width * self.height {
                let point = self.point_from_idx(idx);
                idx += 1;
                Some(point)
            } else {
                None
            }
        })
    }
}

impl FromStr for Grid<char> {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let data: Vec<Vec<char>> = s.lines().map(|line| line.chars().collect()).collect();

        let width = data[0].len();
        let height = data.len();

        Ok(Grid {
            width,
            height,
            data,
        })
    }
}

pub struct GridIterator<'a, T> {
    grid: &'a Grid<T>,
    current: Point,
    direction: &'a Direction,
}

impl<T> Iterator for GridIterator<'_, T> {
    type Item = Point;

    fn next(&mut self) -> Option<Self::Item> {
        let next = self.current.get_neighbor(self.direction);
        if self.grid.is_in_bound(&next) {
            self.current = next;
            Some(self.current)
        } else {
            None
        }
    }
}
