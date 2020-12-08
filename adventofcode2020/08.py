def compute(instructions):
    acc = 0
    seen = set()
    ptr = 0
    while True:
        if ptr in seen:
            return acc, False
        if ptr == len(instructions):
            return acc, True
        seen.add(ptr)
        op, value = instructions[ptr].split(" ")
        if op == "nop":
            ptr += 1
        elif op == "acc":
            acc += int(value)
            ptr += 1
        elif op == "jmp":
            ptr += int(value)


def find_broken_instructions(instructions):
    swap_indices = [
        i for i, x in enumerate(instructions) if x[:3] == "nop" or x[:3] == "jmp"
    ]

    for idx in swap_indices:
        new_instructions = instructions.copy()
        swapping_opcode = new_instructions[idx][:3]
        if swapping_opcode == "nop":
            new_instructions[idx] = new_instructions[idx].replace("nop", "jmp")
        elif swapping_opcode == "jmp":
            new_instructions[idx] = new_instructions[idx].replace("jmp", "nop")

        res = compute(new_instructions)
        if res[1] == True:
            return res


if __name__ == "__main__":
    f = open("inputs/08.txt")
    lines = [l.strip() for l in f.read().splitlines()]

    print(compute(lines))
    print(find_broken_instructions(lines))
