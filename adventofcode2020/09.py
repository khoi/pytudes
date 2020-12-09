from itertools import combinations

def find_invalid(preamble_count, nums):
    for i in range(preamble_count, len(nums) - preamble_count):
        if not is_sum_of_two_numbers(nums[i], nums[i - preamble_count:i]):
            return nums[i]

def is_sum_of_two_numbers(a, numbers):
    return any([x + y == a for x, y in combinations(numbers, 2)])   

def subArraySum(arr, n, sum): 
      
    # Initialize curr_sum as 
    # value of first element 
    # and starting point as 0  
    curr_sum = arr[0] 
    start = 0
  
    # Add elements one by  
    # one to curr_sum and  
    # if the curr_sum exceeds  
    # the sum, then remove  
    # starting element  
    i = 1
    while i <= n: 
          
        # If curr_sum exceeds 
        # the sum, then remove 
        # the starting elements 
        while curr_sum > sum and start < i-1: 
          
            curr_sum = curr_sum - arr[start] 
            start += 1
              
        # If curr_sum becomes 
        # equal to sum, then 
        # return true 
        if curr_sum == sum: 
            print ("Sum found between indexes") 
            print ("% d and % d"%(start, i-1)) 
            return 1
  
        # Add this element  
        # to curr_sum 
        if i < n: 
            curr_sum = curr_sum + arr[i] 
        i += 1
  
    # If we reach here,  
    # then no subarray 
    print ("No subarray found") 
    return 0

if __name__ == "__main__":
    f = open("inputs/09.txt")
    nums = [int(l.strip()) for l in f.read().splitlines()]

    invalid_num = find_invalid(25, nums)

    print(invalid_num)

    print(subArraySum(nums, len(nums), invalid_num))
    subs = nums[507:524]
    print(sum(subs))
    print(min(subs ) + max(subs))
