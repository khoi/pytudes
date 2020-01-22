class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero_idx = 0
        for i in range(0, len(nums)):
            if nums[i] != 0:
                nums[zero_idx], nums[i] = nums[i], nums[zero_idx]
                zero_idx += 1