
def prod_of_two_pairs_that_sum_to_a_target(s, target):
    for v in s:
        d = target - v
        if d in s:
            return v * d
    return None

def prod_of_3_pairs_that_sum_to_a_target(s, target):
    for v in s:
        d = target - v
        prod_of_two_pairs = prod_of_two_pairs_that_sum_to_a_target(s, d)
        if prod_of_two_pairs:
            return v * prod_of_two_pairs
    return None
        

f = open("inputs/01.txt")
numbers = set([int(v) for v in f.read().splitlines()])

# print(prod_of_two_pairs_that_sum_to_a_target(numbers, 2020))
print(prod_of_3_pairs_that_sum_to_a_target(numbers, 2020))