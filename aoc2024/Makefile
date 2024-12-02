.PHONY: run clean fetch-day

run:
	cargo run --bin aoc2024

clean:
	cargo clean

fetch-day:
	@if [ -z "$(day)" ]; then \
		echo "Usage: make fetch-day day=XX (where XX is 01-31)"; \
		exit 1; \
	fi
	@mkdir -p src/inputs
	@aoc -d $(day) --puzzle-only > src/inputs/$(day).md
	@aoc -d $(day) --input-only > src/inputs/$(day).txt
	@echo "Fetched day $(day) puzzle and input"

