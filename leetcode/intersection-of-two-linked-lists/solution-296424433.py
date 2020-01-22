# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        tailA, sizeA = self.getTailAndSize(headA)
        tailB, sizeB = self.getTailAndSize(headB)
          
        if tailA != tailB: # if tail node is not the same, there is no intersection
            return None
        
        longer = headB if sizeA < sizeB else headA
        shorter = headA if sizeA < sizeB else headB
        
        for _ in range(0, abs(sizeA - sizeB)): # advance longer by the difference
            longer = longer.next
            
        while longer != shorter:
            longer = longer.next
            shorter = shorter.next
        
        return shorter
    
    def getTailAndSize(self, head: ListNode):
        n = 0
        curr = head
        
        while curr:
            curr = curr.next
            n += 1
            
        return curr, n