from intcode import IntCode

input_file = open("inputs/day9.txt")
lines = input_file.read().splitlines()

boost_program = [int(i) for i in lines[0].split(",")]

print(IntCode(boost_program).run([1]))
print(IntCode(boost_program).run([2]))
