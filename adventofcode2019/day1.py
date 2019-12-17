def fuel(mass):
    return (mass // 3) - 2


def fuel2(mass):
    res = (mass // 3) - 2
    if res <= 0:
        return 0
    return res + fuel2(res)


f = open("inputs/day1.txt")
masses = [int(v) for v in f.read().splitlines()]

print(sum([fuel(x) for x in masses]))
print(sum([fuel2(x) for x in masses]))
