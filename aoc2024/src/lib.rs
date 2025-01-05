use std::{
    env,
    fmt::{self, Display},
    fs,
    str::FromStr,
};

pub fn combinations<T: Clone>(items: Vec<T>, k: usize) -> Vec<Vec<T>> {
    if k == 0 {
        return vec![vec![]];
    }
    if k > items.len() {
        return vec![];
    }

    let mut result = Vec::new();

    for (i, item) in items.iter().enumerate() {
        let remaining: Vec<T> = items[i + 1..].to_vec();
        for mut combination in combinations(remaining, k - 1) {
            combination.insert(0, item.clone());
            result.push(combination);
        }
    }

    result
}

pub fn gcd(mut a: isize, mut b: isize) -> isize {
    a = a.abs();
    b = b.abs();
    while b != 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }
    a
}

pub fn cartesian_product<T: Clone>(items: Vec<T>, repeat: usize) -> Vec<Vec<T>> {
    if repeat == 0 {
        return vec![vec![]];
    }

    let mut result = Vec::new();
    let items_clone = items.clone();

    for item in items {
        for mut sub_product in cartesian_product(items_clone.clone(), repeat - 1) {
            sub_product.insert(0, item.clone());
            result.push(sub_product);
        }
    }

    result
}

pub fn read_file_input(day: u8) -> String {
    let cwd = env::current_dir().unwrap();
    let filepath = cwd.join("src/inputs").join(format!("{:02}.txt", day));

    fs::read_to_string(filepath).unwrap()
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
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

impl Direction {
    pub fn opposite(dir: &Direction) -> Direction {
        match dir {
            Direction::N => Direction::S,
            Direction::NE => Direction::SW,
            Direction::E => Direction::W,
            Direction::SE => Direction::NW,
            Direction::S => Direction::N,
            Direction::SW => Direction::NE,
            Direction::W => Direction::E,
            Direction::NW => Direction::SE,
        }
    }
}

#[derive(Clone, Debug, Eq, Hash, PartialEq, Copy)]
pub struct Point {
    pub x: isize,
    pub y: isize,
}

impl Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

impl Point {
    pub fn new(x: usize, y: usize) -> Point {
        Point {
            x: x as isize,
            y: y as isize,
        }
    }

    pub fn opposite(&self, other: &Point) -> Point {
        Point {
            x: other.x + (other.x - self.x),
            y: other.y + (other.y - self.y),
        }
    }

    pub fn manhattan_distance(&self, other: &Point) -> usize {
        ((self.x - other.x).abs() + (self.y - other.y).abs()) as usize
    }

    pub fn chebyshev_distance(&self, other: &Point) -> usize {
        ((self.x - other.x).abs().max((self.y - other.y).abs())) as usize
    }

    pub fn get_neighbors(&self, directions: &[Direction]) -> Vec<Point> {
        directions.iter().map(|d| self.get_neighbor(d)).collect()
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

impl<T: fmt::Debug> fmt::Debug for Grid<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        // Print column headers
        write!(f, "  |")?;
        for x in 0..self.width {
            write!(f, " {:>2} ", x)?;
        }
        writeln!(f)?;

        // Print separator line
        write!(f, "--+")?;
        writeln!(f, "{:-<width$}", "", width = self.width * 2)?;

        // Print each row with row numbers
        for (y, line) in self.data.iter().enumerate() {
            write!(f, "{:>2}|", y)?;
            for val in line.iter() {
                write!(f, " {:?}", val)?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}

impl<T: fmt::Display> fmt::Display for Grid<T> {
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

    pub fn get_as_digit(&self, point: &Point) -> Option<u8>
    where
        T: std::convert::AsRef<char>,
    {
        self.get(point).as_ref().to_digit(10).map(|d| d as u8)
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_point_opposite() {
        let p1 = Point { x: 1, y: 1 };
        let p2 = Point { x: 2, y: 3 };
        let opposite = p1.opposite(&p2);
        assert_eq!(opposite, Point { x: 3, y: 5 });

        let p3 = Point { x: -1, y: -2 };
        let p4 = Point { x: 1, y: 2 };
        let opposite2 = p3.opposite(&p4);
        assert_eq!(opposite2, Point { x: 3, y: 6 });
    }

    #[test]
    fn test_manhattan_distance() {
        let p1 = Point { x: 0, y: 0 };
        let p2 = Point { x: 3, y: 4 };
        assert_eq!(p1.manhattan_distance(&p2), 7);

        let p3 = Point { x: -2, y: -3 };
        let p4 = Point { x: 2, y: 1 };
        assert_eq!(p3.manhattan_distance(&p4), 8);

        let p5 = Point { x: 1, y: 1 };
        assert_eq!(p5.manhattan_distance(&p5), 0);
    }

    #[test]
    fn test_chebyshev_distance() {
        let p1 = Point { x: 0, y: 0 };
        let p2 = Point { x: 3, y: 4 };
        assert_eq!(p1.chebyshev_distance(&p2), 4);

        let p3 = Point { x: -2, y: -3 };
        let p4 = Point { x: 2, y: 1 };
        assert_eq!(p3.chebyshev_distance(&p4), 4);

        let p5 = Point { x: 1, y: 1 };
        assert_eq!(p5.chebyshev_distance(&p5), 0);
    }

    #[test]
    fn test_get_neighbor() {
        let p = Point { x: 1, y: 1 };

        assert_eq!(p.get_neighbor(&Direction::N), Point { x: 1, y: 0 });
        assert_eq!(p.get_neighbor(&Direction::NE), Point { x: 2, y: 0 });
        assert_eq!(p.get_neighbor(&Direction::E), Point { x: 2, y: 1 });
        assert_eq!(p.get_neighbor(&Direction::SE), Point { x: 2, y: 2 });
        assert_eq!(p.get_neighbor(&Direction::S), Point { x: 1, y: 2 });
        assert_eq!(p.get_neighbor(&Direction::SW), Point { x: 0, y: 2 });
        assert_eq!(p.get_neighbor(&Direction::W), Point { x: 0, y: 1 });
        assert_eq!(p.get_neighbor(&Direction::NW), Point { x: 0, y: 0 });

        let p2 = Point { x: -1, y: -1 };
        assert_eq!(p2.get_neighbor(&Direction::N), Point { x: -1, y: -2 });
        assert_eq!(p2.get_neighbor(&Direction::E), Point { x: 0, y: -1 });
    }

    #[test]
    fn test_get_neighbors() {
        let p = Point { x: 1, y: 1 };
        let neighbors = p.get_neighbors(&[Direction::N, Direction::E, Direction::S, Direction::W]);
        assert_eq!(
            neighbors,
            vec![
                Point { x: 1, y: 0 },
                Point { x: 2, y: 1 },
                Point { x: 1, y: 2 },
                Point { x: 0, y: 1 },
            ]
        );
    }

    #[test]
    fn test_point_display() {
        let p = Point { x: 1, y: 2 };
        assert_eq!(p.to_string(), "(1, 2)");

        let p2 = Point { x: -3, y: 4 };
        assert_eq!(p2.to_string(), "(-3, 4)");
    }
}
