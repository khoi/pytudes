class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.previous = None

class LinkedList:
    def __init__(self):
        self.head = None

    @property
    def is_empty(self):
        return not self.head

    def __len__(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = self.head.next
        return count

if __name__ == "__main__":
    ll = LinkedList()

    assert ll.is_empty == True
    assert len(ll) == 0
    print("Doubly test passed")
