import os

f = open("day2.txt")
inputs = [int(code) for code in f.read().split(",")]


def day2(codes):
    codes = codes.copy()
    idx = 0
    while idx < len(codes):
        opcode = codes[idx]
        aIdx = codes[idx + 1]
        bIdx = codes[idx + 2]
        resultIdx = codes[idx + 3]
        if opcode == 99:
            return codes[0]
        elif opcode == 1:
            codes[resultIdx] = codes[aIdx] + codes[bIdx]
        elif opcode == 2:
            codes[resultIdx] = codes[aIdx] * codes[bIdx]
        else:
            raise Exception("WTF!")
        idx += 4
    return codes[0]


part1Inputs = inputs.copy()
part1Inputs[1] = 12
part1Inputs[2] = 2
print(day2(inputs))

nouns = list(range(0, 100))
verbs = list(range(0, 100))
expected_output = 19690720
part2Inputs = inputs.copy()

for n in nouns:
    for v in verbs:
        part2Inputs[1] = n
        part2Inputs[2] = v
        if day2(part2Inputs) == expected_output:
            print(100 * n + v)
