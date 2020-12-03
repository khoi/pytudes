from math import prod


def count_tree(grid, width, delta_x, delta_y):
    tree = 0
    height = len(grid) // width
    x, y = 0, 0
    while y < height:
        if grid[x + width * y] == "#":
            tree += 1
        x = (x + delta_x) % width
        y = y + delta_y
    return tree


if __name__ == "__main__":
    with open("inputs/03.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]
        height, width = len(lines), len(lines[0])
        grid = "".join(lines)

    print(count_tree(grid, width, 3, 1))

    moves = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
    print(prod([count_tree(grid, width, x, y) for x, y in moves]))
