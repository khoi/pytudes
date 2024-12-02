use std::process::Command;

fn main() {
    println!("┌──────┬────────────────┬────────────────┐");
    println!("│  Day │     Part 1     │     Part 2     │");
    println!("├──────┼────────────────┼────────────────┤");

    for day in 1..=25 {
        let day = format!("{:02}", day);

        let cmd = Command::new("cargo")
            .args(["run", "--release", "--bin", &day])
            .output()
            .unwrap();

        let output = String::from_utf8(cmd.stdout).unwrap();
        let parts: Vec<&str> = output.trim().split('\n').collect();
        
        let (part1, part2) = if output.is_empty() {
            ("Not solved".to_string(), "Not solved".to_string())
        } else if parts.len() == 1 {
            (parts[0].to_string(), "Not solved".to_string())
        } else {
            (parts[0].to_string(), parts[1].to_string())
        };

        println!(
            "│  {:2}  │ {:<14} │ {:<14} │",
            day,
            &part1[..part1.len().min(14)],
            &part2[..part2.len().min(14)]
        );
    }

    println!("└──────┴────────────────┴────────────────┘");
}
