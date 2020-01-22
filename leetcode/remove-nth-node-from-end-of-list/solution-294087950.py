# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        rabbit = head
        turtle = head
        
        for _ in range(0, n):
            rabbit = rabbit.next
        
        if not rabbit:
            return head.next
        
        while rabbit.next:
            rabbit = rabbit.next
            turtle = turtle.next
            
        turtle.next = turtle.next.next
        return head