# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getDecimalValue(self, head: ListNode) -> int:
        curr = self.reverse(head)
        i = 0
        res = 0
        
        while curr:
            res |= (curr.val << i)
            i += 1
            curr = curr.next
        
        return res
    
    def reverse(self, head: ListNode) -> ListNode:
        prev = None
        curr = head
 
        while curr: # reverse the list
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        
        
        return prev
        