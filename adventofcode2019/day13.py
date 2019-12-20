from intcode import IntCode

input_file = open("inputs/day13.txt")
lines = input_file.read().splitlines()
program = [int(i) for i in lines[0].split(",")]

print("part 1")
c = IntCode(program)

output = c.run([])
idx = 0
block_count = 0

while idx < len(output) - 3:
    x, y, tile = output[idx: idx + 3]
    idx += 3
    if tile == 2:
        block_count += 1

print(block_count)

print("part 2")
coined_program = program
coined_program[0] = 2

c = IntCode(program)
