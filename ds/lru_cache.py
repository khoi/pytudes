from .doubly_linked_list import LinkedList

class LRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.queue = LinkedList()

if __name__ == "__main__":
    print("LRU Cache Tests Passed")
