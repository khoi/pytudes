# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        # find mid point and reverse the first half
        slow = fast = head
        prev = None
        
        while fast and fast.next:
            fast = fast.next.next
            tmp = slow.next
            slow.next = prev
            prev = slow
            slow = tmp
        
        if fast: # odd sized linkedlist
            slow = slow.next
                
        while slow:
            if prev.val != slow.val:
                return False
            
            prev = prev.next
            slow = slow.next
            
        return True
    