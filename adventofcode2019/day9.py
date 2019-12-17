from intcode import IntCode

input_file = open("inputs/day9.txt")
lines = input_file.read().splitlines()

boost_program = [int(i) for i in lines[0].split(",")]

comp = IntCode(boost_program)
print(comp.run([1]))
