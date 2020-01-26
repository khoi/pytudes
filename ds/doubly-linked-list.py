class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.previous = None

    def __str__(self):
        return str(self.value)

class LinkedList:
    def __init__(self):
        self.head = None

    def __bool__(self):
        return self.head is not None

    @property
    def is_empty(self):
        return not self.head

    @property
    def tail(self):
        current = self.head
        while current and current.next:
            current = current.next
        return current

    def __len__(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count

    def append(self, value):
        newNode = Node(value)
        tail = self.tail
        if tail:
            newNode.previous = tail
            tail.next = newNode
        else:
            self.head = newNode

    def prepend(self, value):
        newNode = Node(value)
        if self.head:
            self.head.previous = newNode
            newNode.next = self.head
        self.head = newNode

if __name__ == "__main__":
    ll = LinkedList()

    assert ll.is_empty == True
    assert len(ll) == 0
    assert ll.head is None
    assert ll.tail is None
    assert not ll # test __bool__

    ll.append(1)
    assert ll.is_empty == False
    assert len(ll) == 1
    assert ll.head.value == 1
    assert ll.tail.value == 1
    assert ll # test __bool__

    for v in [2,3,4,5]:
        ll.append(v)

    assert len(ll) == 5
    assert ll.head.value == 1
    assert ll.tail.value == 5

    ll.prepend(0)
    assert len(ll) == 6
    assert ll.head.value == 0
    assert ll.tail.value == 5
    print("Doubly test passed")
