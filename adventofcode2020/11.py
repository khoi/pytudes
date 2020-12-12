import copy


def evolve(m, width, height):
    new_m = copy.deepcopy(m)
    for i in range(width):
        for j in range(height):
            occupied_adjs = len(
                [
                    1
                    for x, y in adjacents(width, height, i, j)
                    if 0 <= x < width and 0 <= y < height and m[x][y] == "#"
                ]
            )
            if m[i][j] == "L" and occupied_adjs == 0:
                new_m[i][j] = "#"
            elif m[i][j] == "#" and occupied_adjs >= 4:
                new_m[i][j] = "L"

    return new_m


def adjacents(width, height, i, j):
    return [
        (i - 1, j - 1),
        (i, j - 1),
        (i + 1, j - 1),
        (i - 1, j),
        (i + 1, j),
        (i - 1, j + 1),
        (i, j + 1),
        (i + 1, j + 1),
    ]


def debug_print(m, width, height):
    for i in range(width):
        for j in range(height):
            seat = m[i][j]
            occupied_adjs = len(
                [
                    1
                    for x, y in adjacents(width, height, i, j)
                    if 0 <= x < width and 0 <= y < height and m[x][y] == "#"
                ]
            )
            print(f"{m[i][j]}({occupied_adjs}) ", end="")
        print()


if __name__ == "__main__":
    with open("inputs/11.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    print("_______________")
    m = [list(l) for l in lines]
    width, height = len(m), len(m[0])
    iteration = 0

    while True:
        new_m = evolve(m, width, height)
        if new_m == m:
            break
        iteration += 1
        m = new_m

    total_occupied = len(
        [1 in (i, j) for i in range(width) for j in range(height) if m[i][j] == "#"]
    )
    print(f"stable after {iteration} occupied {total_occupied}",)
