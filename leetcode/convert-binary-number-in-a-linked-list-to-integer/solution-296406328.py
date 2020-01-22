# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getDecimalValue(self, head: ListNode) -> int:        
        curr = head 
        res = 0
        
        while curr:
            res = (res << 1) | curr.val
            curr = curr.next
            
        return res
