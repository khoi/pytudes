class Solution:
    def decompressRLElist(self, nums: List[int]) -> List[int]:
        arr = []
        for i in range(0, len(nums) // 2):
            arr.extend([nums[i * 2 + 1]] * nums[i * 2])
        return arr