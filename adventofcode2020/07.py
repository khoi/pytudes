import re


def parse_rule(rule):
    result = {}
    tokens = [t.strip() for t in re.split("bags?|contain|,", rule)]
    color = tokens[0]
    for token in tokens[1:-1]:
        if not token:
            continue
        match = re.match(r"(\d+)\s([\w\s]+)", token)
        if not match:
            continue

        groups = match.groups()
        result[groups[1]] = int(groups[0])

    return (color, result)


def can_contain(color, bags, rules):
    if bags == {}:
        return False
    if color in bags:
        return True
    for b, _ in bags.items():
        if b not in rules:
            continue
        if can_contain(color, rules[b], rules):
            return True
    return False


def count1(color, rules):
    count = 0
    for r, _ in rules.items():
        if color in rules[r]:
            count += 1
        elif can_contain(color, rules[r], rules):
            count += 1
    return count


def count2(color, rules):
    if color not in rules or rules[color] == {}:
        return 0
    count = 0
    for c, n in rules[color].items():
        count += n + n * count2(c, rules)
    return count


if __name__ == "__main__":
    with open("inputs/07.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    rules = {}
    for l in lines:
        parsed = parse_rule(l)
        rules[parsed[0]] = parsed[1]

    print(count1("shiny gold", rules))
    print(count2("shiny gold", rules))
