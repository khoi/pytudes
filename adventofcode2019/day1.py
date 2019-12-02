def fuel(mass):
    return (mass // 3) - 2

f = open('day1.txt')
sum([fuel(int(v)) for v in f.readlines()])
