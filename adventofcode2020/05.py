from math import ceil, floor

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

    assert(find_seat('BFFFBBFRRR') == (70, 7, 567))
    assert(find_seat('FFFBBBFRRR') == (14, 7, 119))
    assert(find_seat('BBFFBBFRLL') == (102, 4, 820))

    print(max([find_seat(l)[2] for l in lines]))

