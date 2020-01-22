import math

class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        digits = lambda n: math.floor(math.log10(n)) + 1
        return len([v for v in nums if digits(v) % 2 == 0])