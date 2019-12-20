from collections import defaultdict

from helper import Point
from intcode import IntCode

input_file = open("inputs/day11.txt")
lines = input_file.read().splitlines()
program = [int(i) for i in lines[0].split(",")]


# Direction
#      0
#  3        1
#      2

# instruction 0 left 1 right
def next_dir(curr_dir, instruction):
    if instruction == 0:
        return (curr_dir - 1) % 4
    if instruction == 1:
        return (curr_dir + 1) % 4
    raise Exception(f"invalid instruction {instruction}")


def next_pos(curr_pos, curr_dir):
    if curr_dir == 0:
        return Point(curr_pos.x, curr_pos.y - 1)
    if curr_dir == 1:
        return Point(curr_pos.x + 1, curr_pos.y)
    if curr_dir == 2:
        return Point(curr_pos.x, curr_pos.y + 1)
    if curr_dir == 3:
        return Point(curr_pos.x - 1, curr_pos.y)


grid = defaultdict(lambda: 0)
c = IntCode(program)
curr_pos = Point(0, 0)
curr_dir = 0

while not c.halt:
    output_paint, output_dir = c.run([grid[curr_pos]])
    grid[curr_pos] = output_paint
    curr_dir = next_dir(curr_dir, output_dir)
    curr_pos = next_pos(curr_pos, curr_dir)

print(len(grid))
