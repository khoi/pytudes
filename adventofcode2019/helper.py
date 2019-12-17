# helper
import math


def rangei(low, high, step=1):
    return range(low, high + 1, step)


def get_digit(number, n):
    return number // 10 ** n % 10


def digits(n):
    return int(math.log10(n)) + 1
