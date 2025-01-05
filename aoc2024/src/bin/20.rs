use aoc2024::{read_file_input, Direction, Grid, Point};
use std::collections::{HashMap, HashSet, VecDeque};

#[derive(Clone, Debug)]
struct Input {
    grid: Grid<char>,
    start: Point,
    end: Point,
}

fn parse(input: &str) -> Input {
    let mut start = Point { x: 0, y: 0 };
    let mut end = Point { x: 0, y: 0 };

    let grid: Grid<char> = Grid {
        data: input
            .trim()
            .lines()
            .enumerate()
            .map(|(y, line)| {
                line.chars()
                    .enumerate()
                    .map(|(x, c)| {
                        match c {
                            'S' => start = Point::new(x, y),
                            'E' => end = Point::new(x, y),
                            _ => (),
                        }
                        c
                    })
                    .collect()
            })
            .collect(),
        width: input.trim().lines().next().unwrap().len(),
        height: input.trim().lines().count(),
    };

    Input { grid, start, end }
}

fn is_track(c: &char) -> bool {
    *c == '.' || *c == 'S' || *c == 'E'
}

#[derive(Debug)]
struct DistanceMap {
    distances: HashMap<Point, usize>,
}

impl DistanceMap {
    fn new(grid: &Grid<char>, start: Point) -> Self {
        let mut distances = HashMap::new();
        let mut queue = VecDeque::new();
        let mut visited = HashSet::new();

        queue.push_back((start, 0));
        visited.insert(start);
        distances.insert(start, 0);

        while let Some((pos, dist)) = queue.pop_front() {
            for dir in [Direction::N, Direction::E, Direction::S, Direction::W] {
                let next = pos.get_neighbor(&dir);
                if grid.is_in_bound(&next) && !visited.contains(&next) && is_track(grid.get(&next))
                {
                    visited.insert(next);
                    distances.insert(next, dist + 1);
                    queue.push_back((next, dist + 1));
                }
            }
        }

        Self { distances }
    }

    fn get_distance(&self, point: &Point) -> Option<usize> {
        self.distances.get(point).copied()
    }
}

fn find_cheat_paths(grid: &Grid<char>, start: Point, max_steps: usize) -> Vec<(Point, usize)> {
    let mut result = Vec::new();
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();

    queue.push_back((start, 0));
    visited.insert(start);

    while let Some((pos, steps)) = queue.pop_front() {
        if steps > 0 && is_track(grid.get(&pos)) {
            result.push((pos, steps));
        }

        if steps >= max_steps {
            continue;
        }

        for dir in [Direction::N, Direction::E, Direction::S, Direction::W] {
            let next = pos.get_neighbor(&dir);
            if grid.is_in_bound(&next)
                && !visited.contains(&next)
                && (*grid.get(&next) == '#' || is_track(grid.get(&next)))
            {
                visited.insert(next);
                queue.push_back((next, steps + 1));
            }
        }
    }

    result
}

fn calculate_time_saved(
    input: &Input,
    cheat_start: &Point,
    cheat_end: &Point,
    cheat_length: usize,
    start_distances: &DistanceMap,
    end_distances: &DistanceMap,
    normal_path_length: usize,
    min_savings: usize,
) -> Option<usize> {
    if normal_path_length < min_savings {
        return None;
    }

    let path_to_start = start_distances.get_distance(cheat_start)?;

    if path_to_start + cheat_length >= normal_path_length {
        return None;
    }

    let min_remaining = cheat_end.manhattan_distance(&input.end);
    if path_to_start + cheat_length + min_remaining > normal_path_length - min_savings {
        return None;
    }

    let path_from_end = end_distances.get_distance(cheat_end)?;
    let cheat_path = path_to_start + cheat_length + path_from_end;

    if cheat_path <= normal_path_length - min_savings {
        Some(normal_path_length - cheat_path)
    } else {
        None
    }
}

fn find_all_cheats(
    input: &Input,
    min_savings: usize,
    max_steps: usize,
) -> Vec<(Point, Point, usize)> {
    let mut cheats = Vec::new();
    let mut seen_pairs = HashSet::new();

    let start_distances = DistanceMap::new(&input.grid, input.start);
    let end_distances = DistanceMap::new(&input.grid, input.end);

    let normal_path_length = start_distances
        .get_distance(&input.end)
        .unwrap_or(usize::MAX);
    let potential_starts: Vec<Point> = input
        .grid
        .points()
        .filter(|p| {
            is_track(input.grid.get(p))
                && p.get_neighbors(&[Direction::N, Direction::E, Direction::S, Direction::W])
                    .iter()
                    .any(|n| input.grid.is_in_bound(n) && *input.grid.get(n) == '#')
        })
        .collect();

    for start in potential_starts {
        // Find all possible paths through walls from this start point
        let paths = find_cheat_paths(&input.grid, start, max_steps);

        for (end, steps) in paths {
            if !seen_pairs.insert((start, end)) {
                continue;
            }

            if let Some(saved) = calculate_time_saved(
                input,
                &start,
                &end,
                steps,
                &start_distances,
                &end_distances,
                normal_path_length,
                min_savings,
            ) {
                cheats.push((start, end, saved));
            }
        }
    }
    cheats
}

fn part1(input: Input) -> usize {
    let all_cheats = find_all_cheats(&input, 100, 2);
    all_cheats.len()
}

fn part2(input: Input) -> usize {
    let all_cheats = find_all_cheats(&input, 100, 20);
    all_cheats.len()
}

fn main() {
    let input = read_file_input(20);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}
