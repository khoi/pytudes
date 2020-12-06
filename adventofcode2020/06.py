from collections import Counter

def count1(groups):
    total = 0
    for group in groups:
        unique_chars = set([c for c in group if c != " "])
        total += len(unique_chars)
    return total 

def count2(groups):
    total = 0
    for group in groups:
        group_count = len(group.split(" "))
        unique_chars = ([c for c in group if c != " "])
        counter = Counter(unique_chars)
        total += len([c for c in counter if counter[c] == group_count])
    return total

if __name__ == "__main__":
    with open("inputs/06.txt") as f:
        groups = [l.strip().replace("\n", " ") for l in f.read().split("\n\n")]

    print(count1(groups))
    print(count2(groups))
