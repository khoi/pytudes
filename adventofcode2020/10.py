def count_diff(sorted_joltages):
    all_sorted_joltages = [0] + sorted_joltages + [sorted_joltages[-1] + 3]
    count = [0, 0, 0]
    for i in range(len(all_sorted_joltages) - 1):
        count[all_sorted_joltages[i + 1] - all_sorted_joltages[i] - 1] += 1
    return count


def distinct(sorted_joltages):
    all_sorted_joltages = [0] + sorted_joltages
    dp = [0] * len(all_sorted_joltages)
    dp[0] = 1
    for i in range(1, len(all_sorted_joltages)):
        for j in range(i - 1, -1, -1):
            if all_sorted_joltages[j] + 3 < all_sorted_joltages[i]:
                break
            dp[i] += dp[j]

    return dp[-1]


if __name__ == "__main__":
    with open("inputs/10.txt") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    joltages = [int(l) for l in lines]
    sorted_joltages = sorted(joltages)

    diffs = count_diff(sorted_joltages)

    print(diffs[0] * diffs[2])
    print(distinct(sorted_joltages))
