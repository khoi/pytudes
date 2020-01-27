class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.previous = None

    def __str__(self):
        return str(self.data)


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

    def get_node(self, index):
        current = self.head
        count = 0
        while current:
            if count == index:
                return current
            current = current.next
            count += 1
        raise Exception("index out of bounds")
    
    def __getitem__(self, key):
        return self.get_node(key).data

    def insert_node(self, node, index):
        if index == 0:
            node.next = self.head
            node.previous = None
            if self.head:
                self.head.previous = node
            self.head = node
        else:
            previous_node = self.get_node(index - 1)
            next_node = previous_node.next
            node.previous = previous_node
            node.next = next_node
            if next_node:
                next_node.previous = node
            previous_node.next = node

    def append(self, value):
        self.insert_node(Node(value), len(self))

    def prepend(self, value):
        self.insert_node(Node(value), 0)

    def removeNode(self, node):
        previous = node.previous
        next = node.next 
        if previous:
            previous.next = next
        else:
            self.head = next
        if next:
            next.previous = previous
        return node

    def remove(self, index):
        node = self.get_node(index)
        return self.removeNode(node).data


if __name__ == "__main__":
    ll = LinkedList()

    assert ll.is_empty == True
    assert len(ll) == 0
    assert ll.head is None
    assert ll.tail is None
    assert not ll  # test __bool__

    ll.append(0)
    assert ll.is_empty == False
    assert len(ll) == 1
    assert ll.head.data == 0
    assert ll.tail.data == 0
    assert ll  # test __bool__
    assert ll[0] == 0

    for v in [1, 2, 3, 4, 5]:
        ll.append(v)

    assert len(ll) == 6
    assert ll.head.data == 0
    assert ll.tail.data == 5
    for i in range(0, 6):
        assert ll[i] == i

    ll.prepend(-1)
    assert len(ll) == 7
    assert ll.head.data == -1 
    assert ll.tail.data == 5
    print("Doubly test passed")

    assert ll.remove(0) == -1 # remaining: [0, 1, 2, 3, 4, 5]
    assert ll.remove(0) == 0 # remaining: [1, 2, 3, 4, 5]
    assert ll.remove(4) == 5 # remaining: [1, 2, 3, 4]
    for i in range(0, len(ll)):
        assert ll.remove(0) == i + 1
    assert len(ll) == 0
    assert ll.is_empty 
