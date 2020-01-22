from collections import Counter
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        cnt = Counter(nums)
        for num in nums:
            if cnt[num] > 1:
                return True
        return False