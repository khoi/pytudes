from math import ceil, floor
import itertools


def find(code, up, down, lower_bound, upper_bound):
    r = [lower_bound, upper_bound]
    for c in code:
        mid = (r[1] - r[0]) / 2
        if c == up:
            r[1] = r[0] + floor(mid)
        elif c == down:
            r[0] = r[0] + ceil(mid)
        if r[0] == r[1]:
            return r[0]
    return None


def find_seat(code):
    row_code, col_code = code[:-3], code[-3:]

    row = find(row_code, "F", "B", 0, 127)
    col = find(col_code, "L", "R", 0, 7)
    unique_id = row * 8 + col

    return (row, col, unique_id)


if __name__ == "__main__":
    f = open("inputs/05.txt")
    lines = [l.strip() for l in f.read().splitlines()]

    assert find_seat("BFFFBBFRRR") == (70, 7, 567)
    assert find_seat("FFFBBBFRRR") == (14, 7, 119)
    assert find_seat("BBFFBBFRLL") == (102, 4, 820)

    all_seats = [find_seat(l) for l in lines]
    all_ids = set([seat[2] for seat in all_seats])
    print(max(all_ids))

    all_possible_ids = set([row * 8 + col for row in range(0, 128) for col in range(0, 8)])
    missing_ids = all_possible_ids - all_ids

    for i in missing_ids:
        if i - 1 in all_ids and i + 1 in all_ids:
            print(i)
