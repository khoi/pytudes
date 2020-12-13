import copy


def evolve(m, width, height, counter, max_occupied_before_death = 4):
    new_m = copy.deepcopy(m)
    for i in range(width):
        for j in range(height):
            count = counter(m, width, height, i, j) 
            if m[i][j] == "L" and count == 0:
                new_m[i][j] = "#"
            elif m[i][j] == "#" and count >= max_occupied_before_death:
                new_m[i][j] = "L"

    return new_m

def line_of_sight_counter(m, width, height, i, j):
    dirs = [
            (-1, -1),
            (0, -1),
            (1, -1),
            (-1 ,0),
            (1, 0),
            (-1, 1),
            (0, 1),
            (1, 1)
            ]
    cnt = 0
    for d in dirs:
        new_i, new_j = i + d[0], j + d[1]
        while 0 <= new_i < width and 0 <= new_j < height:
            if m[new_i][new_j] == "L":
                break
            if m[new_i][new_j] == "#":
                cnt += 1
                break
            new_i, new_j = new_i + d[0], new_j + d[1]
    return cnt


def adjacent_counter(m, width, height, i, j):
    adjs = [
        (i - 1, j - 1),
        (i, j - 1),
        (i + 1, j - 1),
        (i - 1, j),
        (i + 1, j),
        (i - 1, j + 1),
        (i, j + 1),
        (i + 1, j + 1),
    ]

    return len(
            [
                1
                for x, y in adjs
                if 0 <= x < width and 0 <= y < height and m[x][y] == "#"
                ]
            )

def print_m(m, width, height, counter):
    for i in range(width):
        for j in range(height):
            print(f"{m[i][j]}({counter(m, width, height, i, j)}) ", end = "")
        print()

if __name__ == "__main__":
    with open("inputs/11.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    m = [list(l) for l in lines]
    width, height = len(m), len(m[0])
    iteration = 0

    while True:
        new_m = evolve(m, width, height, adjacent_counter, 4)
        if new_m == m:
            break
        iteration += 1
        m = new_m

    total_occupied = len(
        [1 in (i, j) for i in range(width) for j in range(height) if m[i][j] == "#"]
    )
    print(f"#1 stable after {iteration} occupied {total_occupied}",)

    # part 2
    m = [list(l) for l in lines]
    iteration = 0

    while True:
        new_m = evolve(m, width, height, line_of_sight_counter, 5)
        if new_m == m:
            break
        iteration += 1
        m = new_m

    total_occupied = len(
        [1 in (i, j) for i in range(width) for j in range(height) if m[i][j] == "#"]
    )
    print(f"#2 stable after {iteration} occupied {total_occupied}",)
