# helper
import math


def rangei(low, high, step=1):
    return range(low, high + 1, step)


def get_digit(number, n):
    return number // 10 ** n % 10


def digits(n):
    return int(math.log10(n)) + 1


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

    def __str__(self):
        return f"{self.x} {self.y}"

    def __repr__(self) -> str:
        return f"{self.x} {self.y}"


def distance(a, b):
    return math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)


def is_between(a, c, b):
    return math.isclose(distance(a, c) + distance(c, b), distance(a, b))
