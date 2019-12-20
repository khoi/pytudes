from collections import defaultdict
from math import sqrt, isclose

from helper import Point, is_between

input_file = open("inputs/day10.txt")
lines = input_file.read().splitlines()

H = len(lines)
W = len(lines[0])

m = [c for l in lines for c in l]

asteroid_locations = set([Point(i % W, i // W) for i, v in enumerate(m) if v == "#"])

asteroid_sights = defaultdict(lambda: 0)


def has_direct_sight(curr, other, middle_locations):
    for mid in middle_locations:
        if is_between(curr, mid, other):
            return False
    return True


for i, current in enumerate(asteroid_locations):
    count = 0
    for other in asteroid_locations - {current}:
        asteroid_sights[current] += 1 if has_direct_sight(current, other, asteroid_locations - {current, other}) else 0

best_loc = max(asteroid_sights, key=asteroid_sights.get)

print(f"{best_loc} : {asteroid_sights[best_loc]}")
