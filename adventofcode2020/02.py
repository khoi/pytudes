from collections import Counter 

def count_valid(lines, validator):
    count = 0
    for l in lines:
        rule, value = l.split(": ")
        if validator(rule, value):
            count += 1
    return count

def is_valid_1(rule, test_str):
    rang, char = rule.split()
    low, high = [int(v) for v in rang.split("-")]
    counter = Counter(test_str)
    return counter[char] >= low and counter[char] <= high

def is_valid_2(rule, test_str):
    rang, char = rule.split()
    low_idx, high_idx = [int(v) - 1 for v in rang.split("-")]
    return (test_str[low_idx] == char and test_str[high_idx] != char) or (test_str[low_idx] != char and test_str[high_idx] == char)

if __name__ == "__main__":
    f = open("inputs/02.txt")
    lines = [l for l in f.read().splitlines()]
    print(count_valid(lines, is_valid_1))
    print(count_valid(lines, is_valid_2))
