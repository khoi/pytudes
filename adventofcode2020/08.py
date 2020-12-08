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
    nop_indices = [i for i, x in enumerate(instructions) if x[:3] == "nop"]
    jmp_indices = [i for i, x in enumerate(instructions) if x[:3] == "jmp"]

    for noop_idx in nop_indices:
        new_instructions = instructions.copy()
        new_instructions[noop_idx] = new_instructions[noop_idx].replace("nop", "jmp")
        res = compute(new_instructions)
        if res[1] == True:
            return res

    for jmp_idx in jmp_indices:
        new_instructions = instructions.copy()
        new_instructions[jmp_idx] = new_instructions[jmp_idx].replace("jmp", "nop")
        res = compute(new_instructions)
        if res[1] == True:
            return res


if __name__ == "__main__":
    f = open("inputs/08.txt")
    lines = [l.strip() for l in f.read().splitlines()]

    print(compute(lines))
    print(find_broken_instructions(lines))
