#![allow(warnings)]

use aoc2024::read_file_input;
use std::collections::{HashMap, HashSet};

type Graph = HashMap<String, HashSet<String>>;

fn parse(input: &str) -> Graph {
    let mut graph: Graph = HashMap::new();

    for line in input.trim().lines() {
        let (a, b) = line.split_once('-').unwrap();
        graph
            .entry(a.to_string())
            .or_default()
            .insert(b.to_string());
        graph
            .entry(b.to_string())
            .or_default()
            .insert(a.to_string());
    }

    graph
}

fn find_triangles(graph: &Graph) -> Vec<[String; 3]> {
    let mut triangles = Vec::new();
    let nodes: Vec<_> = graph.keys().cloned().collect();

    for (i, a) in nodes.iter().enumerate() {
        if let Some(a_neighbors) = graph.get(a) {
            for b in a_neighbors {
                if b <= a {
                    continue;
                }
                if let Some(b_neighbors) = graph.get(b) {
                    for c in b_neighbors {
                        if c <= b {
                            continue;
                        }
                        if a_neighbors.contains(c) {
                            triangles.push([a.clone(), b.clone(), c.clone()]);
                        }
                    }
                }
            }
        }
    }

    triangles
}

fn part1(graph: Graph) -> usize {
    let triangles = find_triangles(&graph);
    triangles
        .iter()
        .filter(|[a, b, c]| a.starts_with('t') || b.starts_with('t') || c.starts_with('t'))
        .count()
}

fn part2(graph: Graph) -> usize {
    0 // Not implemented yet
}

fn main() {
    let input = read_file_input(23);
    let parsed = parse(&input);

    println!("{}", part1(parsed.clone()));
    println!("{}", part2(parsed.clone()));
}

#[cfg(test)]
mod tests {
    use super::*;

    static INPUT: &str = "\
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn";

    #[test]
    fn test_1() {
        let result = part1(parse(INPUT));
        assert_eq!(result, 7);
    }

    // #[test]
    // fn test_2() {
    //     let result = part2(parse(INPUT));
    //     assert_eq!(result, 0);
    // }
}
