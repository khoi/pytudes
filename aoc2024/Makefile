CURRENT_MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_MAKEFILE_DIR := $(patsubst %/,%,$(dir $(CURRENT_MAKEFILE_PATH)))

# If no target is specified, display help
.DEFAULT_GOAL := help

help:  # Display this help.
	@-+echo "Run make with one of the following targets:"
	@-+echo
	@-+grep -Eh "^[a-z-]+:.*#" $(CURRENT_MAKEFILE_PATH) | sed -E 's/^(.*:)(.*#+)(.*)/  \1 @@@ \3 /' | column -t -s "@@@"

run: # Run all days
	cargo run --bin aoc2024

clean: # Clean
	cargo clean

make install: # Install aoc-cli
	cargo install aoc-cli

fetch-day: # ie: make fetch-day day=1
	@if [ -z "$(day)" ]; then \
		echo "Usage: make fetch-day day=N (where N is 1-30)"; \
		exit 1; \
	fi
	@if ! [ "$(day)" -ge 1 ] || ! [ "$(day)" -le 30 ]; then \
		echo "Error: day must be between 1 and 30"; \
		exit 1; \
	fi
	@mkdir -p src/inputs
	@padded_day=$$(printf "%02d" $(day)); \
	aoc download -o -d $$padded_day -i src/inputs/$$padded_day.txt -p src/inputs/$$padded_day.md; \
	echo "Fetched day $$padded_day puzzle and input"

run-day: # ie: make run-day day=1
	@if [ -z "$(day)" ]; then \
		echo "Usage: make run-day N (where N is 1-30)"; \
		exit 1; \
	fi
	@if ! [ "$(day)" -ge 1 ] || ! [ "$(day)" -le 30 ]; then \
		echo "Error: day must be between 1 and 30"; \
		exit 1; \
	fi
	@padded_day=$$(printf "%02d" $(day)); \
	cargo run --bin $$padded_day

test-day: # ie: make test-day day=1
	@if [ -z "$(day)" ]; then \
		echo "Usage: make test-day N (where N is 1-30)"; \
		exit 1; \
	fi
	@if ! [ "$(day)" -ge 1 ] || ! [ "$(day)" -le 30 ]; then \
		echo "Error: day must be between 1 and 30"; \
		exit 1; \
	fi
	@padded_day=$$(printf "%02d" $(day)); \
	cargo test --bin $$padded_day

%:
	@:

.PHONY: run clean fetch-day run-day test-day help
