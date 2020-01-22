# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

import collections 

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        currL1 = l1
        currL2 = l2
        rootNode = ListNode((currL1.val + currL2.val) % 10)
        currNode = rootNode
        carrying = (currL1.val + currL2.val) > 9
        while currL1.next != None and currL2.next != None:
            currL1 = currL1.next
            currL2 = currL2.next
            total = currL1.val + currL2.val
            total += 1 if carrying else 0
            carrying = total > 9
            currNode.next = ListNode(total % 10)
            currNode = currNode.next
        while currL1.next != None:
            currL1 = currL1.next
            total = currL1.val
            total += 1 if carrying else 0
            carrying = total > 9
            currNode.next = ListNode(total % 10)
            currNode = currNode.next
        while currL2.next != None:
            currL2 = currL2.next
            total = currL2.val
            total += 1 if carrying else 0
            carrying = total > 9
            currNode.next = ListNode(total % 10)
            currNode = currNode.next
        if carrying:
            currNode.next = ListNode(1)
        return rootNode