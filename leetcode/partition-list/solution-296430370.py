# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        lowerHead = lowerTail = None
        higherHead = higherTail = None
        
        curr = head
        
        while curr:
            tmpNext = curr.next
            curr.next = None
            
            if curr.val < x:
                if lowerHead is None: # first lower node
                    lowerHead = lowerTail = curr
                else:
                    lowerTail.next = curr
                    lowerTail = curr
            else:
                if higherHead is None: # first higher node
                    higherHead = higherTail = curr
                else:
                    higherTail.next = curr
                    higherTail = curr
            curr = tmpNext
            
        if lowerHead is None:
            return higherHead
        
        lowerTail.next = higherHead
            
        
        return lowerHead