from itertools import combinations


def find_invalid(preamble_count, nums):
    for i in range(preamble_count, len(nums) - preamble_count):
        if not is_sum_of_two_numbers(nums[i], nums[i - preamble_count : i]):
            return nums[i]


def is_sum_of_two_numbers(a, numbers):
    return any([x + y == a for x, y in combinations(numbers, 2)])


def contiguous_subarray_with_sum(arr, n, sum):
    curr_sum = arr[0]
    start = 0

    i = 1
    while i <= n:
        while curr_sum > sum and start < i - 1:
            curr_sum = curr_sum - arr[start]
            start += 1

        if curr_sum == sum:
            return start, i

        if i < n:
            curr_sum = curr_sum + arr[i]
        i += 1

    return None


if __name__ == "__main__":
    f = open("inputs/09.txt")
    nums = [int(l.strip()) for l in f.read().splitlines()]

    invalid_num = find_invalid(25, nums)

    print(invalid_num)

    indices = contiguous_subarray_with_sum(nums, len(nums), invalid_num)
    subs = nums[indices[0] : indices[1]]

    print(min(subs) + max(subs))
