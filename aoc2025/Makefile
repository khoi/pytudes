# Derived values (don't change these).
CURRENT_MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_MAKEFILE_DIR := $(patsubst %/,%,$(dir $(CURRENT_MAKEFILE_PATH)))
MMD_DIR := $(CURRENT_MAKEFILE_DIR)

.DEFAULT_GOAL := help

help: # Display this help.
	@-+echo "Run make with one of the following targets:"
	@-+echo
	@-+grep -Eh "^[a-z-]+:.*#" $(CURRENT_MAKEFILE_PATH) | sed -E 's/^(.*:)(.*#+)(.*)/ \1 @@@ \3 /' | column -t -s "@@@"

.PHONY: install-aoc-cli
install-aoc-cli: # Install aoc-cli via Homebrew.
	brew install scarvalhojr/tap/aoc-cli

.PHONY: fetch-day
fetch-day: # Scaffold and fetch puzzle for a day (usage: make fetch-day d=1).
	@if [ -z "$(d)" ]; then echo "Usage: make fetch-day d=<day>"; exit 1; fi
	bun scaffold $(d)
	aoc d -d $(d) -o -P -p src/day$(shell printf '%02d' $(d))/puzzle.txt
	aoc d -d $(d) -o -I -i src/day$(shell printf '%02d' $(d))/input.txt

.PHONY: submit-day
submit-day: # Submit answer for a day (usage: make submit-day d=1 p=1 n=12345).
	@if [ -z "$(d)" ] || [ -z "$(p)" ] || [ -z "$(n)" ]; then echo "Usage: make submit-day d=<day> p=<part> n=<answer>"; exit 1; fi
	aoc submit -d $(d) $(p) $(n)
