dirs = ["N", "E", "S", "W"]
delta_dirs = [(0, -1), (1, 0), (0, 1), (-1, 0)]


def process(original_dir, original_pos, instruction):
    instruction_code = instruction[0]
    instruction_value = int(instruction[1:])

    if instruction_code == "L":
        return rotate(curr_dir, -instruction_value), original_pos
    if instruction_code == "R":
        return rotate(curr_dir, instruction_value), original_pos
    if instruction_code == "F":
        return original_dir, move(original_dir, original_pos, instruction_value)
    if instruction_code in dirs:
        return original_dir, move(instruction_code, original_pos, instruction_value)
    raise "Y NO U VALID!"


def move(direction, curr_pos, value):
    d = delta_dirs[dirs.index(direction)]
    return (curr_pos[0] + d[0] * value, curr_pos[1] + d[1] * value)


def rotate(curr_dir, degree):
    assert degree % 90 == 0
    return dirs[(dirs.index(curr_dir) + (degree // 90)) % len(dirs)]


if __name__ == "__main__":
    with open("inputs/12.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    print("_____________")

    curr_dir, curr_pos = "E", (0, 0)

    for instruction in lines:
        curr_dir, curr_pos = process(curr_dir, curr_pos, instruction)

    print(curr_pos[0] + curr_pos[1])

    way_point_pos = (10, -1)
