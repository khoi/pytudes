class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


def insert(root, key):
    if root is None:
        root = Node(key)
        return root
    if key < root.key:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root


def traverse_inorder(root, f):
    if root is None:
        return

    traverse_inorder(root.left, f)
    f(root.key)
    traverse_inorder(root.right, f)


def traverse_preorder(root, f):
    if root is None:
        return

    f(root.key)
    traverse_preorder(root.left, f)
    traverse_preorder(root.right, f)


def traverse_postorder(root, f):
    if root is None:
        return

    traverse_postorder(root.left, f)
    traverse_postorder(root.right, f)
    f(root.key)


def search(root, key):
    if root is None or root.key == key:
        return root

    if key < root.key:
        return search(root.left, key)

    return search(root.right, key)


def height(root):
    if root is None:
        return -1
    return 1 + max(height(root.left), height(root.right))


def diagram(node, top="", root="", bottom=""):
    if node is None:
        return f"{root}nil\n"
    if node.left is None and node.right is None:
        return f"{root}{node.key}\n"
    return (
            diagram(node.right, top + " ", top + "┌──", top + "| ")
            + f"{root}{node.key}\n"
            + diagram(node.left, bottom + "│ ", bottom + "└──", bottom + " ")
    )


def smallest(node):
    if node is None:
        return None
    if node.left is None:
        return node.key
    return smallest(node.left)


def remove(node, key):
    if node is None:
        return None
    if node.key == key:
        if node.left is None and node.right is None:
            return None
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left
        node.key = smallest(node.right)
        node.right = remove(node.right, node.key)
    elif key < node.key:
        return remove(node.left, key)
    return remove(node.right, key)


if __name__ == "__main__":
    #                   8
    #           3               10
    #     1           6               14
    #               4   7           13

    values = [3, 1, 6, 4, 7, 10, 14, 13]
    root = Node(8)
    for v in values:
        insert(root, v)
    print(diagram(root))

    in_order = []
    traverse_inorder(root, in_order.append)
    assert in_order == [1, 3, 4, 6, 7, 8, 10, 13, 14]

    pre_order = [8, 3, 1, 6, 4, 7, 10, 14, 13]
    traverse_preorder(root, pre_order.append)

    post_order = [1, 4, 7, 6, 3, 13, 14, 10, 8]
    traverse_postorder(root, post_order.append)

    assert search(root, 8) is not None
    for v in values:
        assert (search(root, v)) is not None

    assert search(root, 9) is None
    assert height(root) == 3
    assert smallest(root) == 1

    remove(root, 6)
    in_order = []
    traverse_inorder(root, in_order.append)
    assert in_order == [1, 3, 4, 7, 8, 10, 13, 14]

    print("Tests passed.")
