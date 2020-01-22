class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            digits[i] += 1
            if digits[i] <= 9:
                return digits
            digits[i] = digits[i] % 10
        return [1] + digits
