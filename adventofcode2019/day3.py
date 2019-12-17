f = open("day3.txt")
inputs = f.read().splitlines()
first = inputs[0].split(",")
second = inputs[1].split(",")


def build_visited(instructions):
    visited = {(0, 0)}  # started at the first node
    curr = (0, 0)
    for p in instructions:
        direction = p[0]
        step = int(p[1:])
        if direction == "U":
            visited.update([(curr[0], curr[1] + i + 1) for i in range(0, step)])
            curr = (curr[0], curr[1] + step)
        if direction == "R":
            visited.update([(curr[0] + i + 1, curr[1]) for i in range(0, step)])
            curr = (curr[0] + step, curr[1])
        if direction == "D":
            visited.update([(curr[0], curr[1] - i - 1) for i in range(0, step)])
            curr = (curr[0], curr[1] - step)
        if direction == "L":
            visited.update([(curr[0] - i - 1, curr[1]) for i in range(0, step)])
            curr = (curr[0] - step, curr[1])
    return visited


def manhattan_distance(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)


intersections = build_visited(first) & build_visited(second)
intersections.remove((0, 0))  # 0,0 doesn't count
print(min([manhattan_distance(0, 0, i[0], i[1]) for i in intersections]))


def shortest_distance(instructions, intersection):
    curr = (0, 0)
    step_taken = 0
    for p in instructions:
        direction = p[0]
        step = int(p[1:])
        if direction == "U":
            if intersection[0] == curr[0] and (curr[1] + step) > intersection[1]:
                return step_taken + abs(curr[1] - intersection[1])
            curr = (curr[0], curr[1] + step)
        if direction == "R":
            if intersection[1] == curr[1] and (curr[0] + step) > intersection[0]:
                return step_taken + abs(curr[0] - intersection[0])
            curr = (curr[0] + step, curr[1])
        if direction == "D":
            if intersection[0] == curr[0] and (curr[1] - step) < intersection[1]:
                return step_taken + abs(curr[1] - intersection[1])
            curr = (curr[0], curr[1] - step)
        if direction == "L":
            if intersection[1] == curr[1] and (curr[0] - step) < intersection[0]:
                return step_taken + abs(curr[0] - intersection[0])
            curr = (curr[0] - step, curr[1])
        step_taken += step
    return 99999


intersections = build_visited(first) & build_visited(second)
intersections.remove((0, 0))
print(
    min(
        [
            shortest_distance(first, i) + shortest_distance(second, i)
            for i in intersections
        ]
    )
)
