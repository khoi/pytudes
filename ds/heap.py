class MinHeap:
    def __init__(self):
        self.values = []

    def __len__(self):
        return len(self.values)

    def __str__(self):
        return str(self.values)

    def insert(self, val):
        self.values.append(val)
        current = len(self.values) - 1
        self.__sift_up(len(self.values) - 1)

    def remove(self):
        if not self.values:
            return None
        self.values[-1], self.values[0] = self.values[0], self.values[-1]
        result = self.values.pop()
        self.__sift_down(0)
        return result

    def __sift_up(self, index):
        child = index
        parent = (index-1) // 2
        while child > 0 and self.values[child] < self.values[parent]:
            self.values[child], self.values[parent] = (
                self.values[parent],
                self.values[child],
            )
            child = parent
            parent = (child-1) // 2

    def __sift_down(self, index):
        left = 2 * index + 1
        right = 2 * index + 2
        smallest = index
        
        if left < len(self.values) and self.values[left] < self.values[index]:
            smallest = left
        if right < len(self.values) and self.values[right] < self.values[smallest]:
            smallest = right

        if (smallest != index):
            self.values[index], self.values[smallest] = (
                self.values[smallest],
                self.values[index],
            )
            self.__sift_down(smallest)


if __name__ == "__main__":
    heap = MinHeap()

    assert len(heap) == 0

    heap.insert(7)
    heap.insert(5)
    heap.insert(2)
    heap.insert(3)
    heap.insert(1)
    assert len(heap) == 5
    assert heap.remove() == 1
    assert heap.remove() == 2
    assert heap.remove() == 3
    assert heap.remove() == 5
    assert heap.remove() == 7

    print("Heap tests passed")
