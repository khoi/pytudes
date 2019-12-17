from helper import *

low = 240298
high = 784956

inputs = [i for i in range(low, high + 1)]


def has_same_adjacents(num):
    n = digits(num)
    for i in range(1, n):
        if get_digit(num, i) == get_digit(num, i - 1):
            return True
    return False


def never_decrease(num):
    n = digits(num)
    for i in range(n - 1, 0, -1):
        if get_digit(num, i) > get_digit(num, i - 1):
            return False
    return True


qualified_password = filter(has_same_adjacents, inputs)
qualified_password = filter(never_decrease, qualified_password)
print(len(list(qualified_password)))
