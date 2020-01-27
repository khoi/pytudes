from doubly_linked_list import LinkedList, Node


class LRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.queue = LinkedList()

    def insert(self, key, value):
        if key in self.cache:
            node = self.cache[key]
            node.data = (key, value)
            self.queue.removeNode(node)
            self.queue.insert_node(node, 0)
        else:
            new_node = Node((key, value))
            evicted_value = None
            if len(self.cache) >= self.capacity:
                lru_node = self.queue.tail
                lru_key, evicted_value = lru_node.data
                del self.cache[lru_key]
                self.queue.removeNode(lru_node)
            self.cache[key] = new_node
            self.queue.insert_node(new_node, 0)
            return evicted_value

    def get(self, key):
        if key not in self.cache:
            return None
        node = self.cache[key]
        self.queue.removeNode(node)
        self.queue.insert_node(node, 0)
        _, value = node.data
        return value


if __name__ == "__main__":
    lru = LRU(capacity=3)
    lru.insert(0, 0)
    assert lru.get(0) == 0
    assert lru.get(1) is None

    lru.insert(1, 1)
    lru.insert(2, 2)
    assert lru.get(0) == 0
    assert lru.get(1) == 1
    assert lru.get(2) == 2
    assert lru.get(3) is None

    evicted_value = lru.insert(4, 4)
    assert evicted_value == 0
    assert lru.get(4) == 4

    evicted_value = lru.insert(5, 5)
    assert evicted_value == 1
    assert lru.get(5) == 5
    print("LRU Cache Tests Passed")
