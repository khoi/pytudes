from intcode import IntCode

input_file = open('inputs/day5.txt')
lines = input_file.read().splitlines()
inputs = [[int(n) for n in l.split(",")] for l in lines]

print(IntCode(inputs[0]).run([1])[-1])
print(IntCode(inputs[0]).run([5])[-1])
