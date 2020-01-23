class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def insert(root, val):
    if root is None:
        root = Node(val)
        return root
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root


def traverse_inorder(root, f):
    if root is None:
        return

    traverse_inorder(root.left, f)
    f(root.val)
    traverse_inorder(root.right, f)


def traverse_preorder(root, f):
    if root is None:
        return

    f(root.val)
    traverse_preorder(root.left, f)
    traverse_preorder(root.right, f)


def traverse_postorder(root, f):
    if root is None:
        return

    traverse_postorder(root.left, f)
    traverse_postorder(root.right, f)
    f(root.val)


def search(root, val):
    if root is None or root.val == val:
        return root

    if val < root.val:
        return search(root.left, val)

    return search(root.right, val)


def height(root):
    if root is None:
        return 0
    return 1 + max(height(root.left), height(root.right))


def diagram(node, top="", root="", bottom=""):
    if node is None:
        return f"{root}nil\n"
    if node.left is None and node.right is None:
        return f"{root}{node.val}\n"
    return (
        diagram(node.right, top + " ", top + "┌──", top + "| ")
        + f"{root}{node.val}\n"
        + diagram(node.left, bottom + "│ ", bottom + "└──", bottom + " ")
    )

def smallest(node):
    if node is None:
        return None
    if node.left is None:
        return node.val
    return smallest(node.left)

def remove(node, val):
    if node is None:
        return None
    if node.val == val:
        if node.left is None and node.right is None:
            return None
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left
        node.val = smallest(node.right)
        node.right = remove(node.right, node.val)
    elif val < node.val:
        return remove(node.left, val)
    return remove(node.right, val)

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
    assert height(root) == 4
    assert smallest(root) == 1
    
    remove(root, 6)
    in_order = []
    traverse_inorder(root, in_order.append)
    assert in_order == [1, 3, 4, 7, 8, 10, 13, 14]

    print(smallest(root))
    print("Tests passed.")
