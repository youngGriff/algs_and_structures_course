class BinaryTree {
    constructor() {
        this.root = null
    }

    add(value) {
        if (!this.root) {
            this.root = new TreeNode(value)
        } else {
            let node = this.root
            let newNode = new TreeNode(value)
            while (node) {
                if (value > node.value) {
                    if (!node.right) {
                        break
                    }
                    node = node.right
                } else {
                    if (!node.left) {
                        break
                    }
                    node = node.left
                }
            }
            if (value > node.value) {
                node.right = newNode
            } else {
                node.left = newNode
            }
        }
    }

    remove(value){
        this.root = this.removeNode(this.root, value)
    }
    // a recursive function to insert a new value in binary search tree

    removeNode(current, value) {

        // base case, if the tree is empty

        if(current === null) return current

        // when value is the same as current's value, this is the node to be deleted

        if (value === current.value) {

            // for case 1 and 2, node without child or with one child

            if (current.left === null && current.right === null){

                return null

            }else if(current.left === null){

                return current.right

            }else if(current.right === null){

                return current.left
            }else{
                /// node with two children, get the inorder successor,
                //smallest in the right subtree

                let tempNode = this.kthSmallestNode(current.right)
                current.value = tempNode.value

                /// delete the inorder successor

                current.right = this.removeNode(current.right, tempNode.value)
                return current
            }

            // recur down the tree

        }else if(value < current.value) {

            current.left = this.removeNode(current.left, value)
            return current
        }else{

            current.right = this.removeNode(current.right, value)
            return current
        }
    }

    /// helper function to find the smallest node

    kthSmallestNode(node) {
        while(!node.left === null)
            node = node.left

        return node
    }

    print(root = this.root) {
        if (!root) {
            return true;
        }
        console.log(root.value);
        this.print(root.left)
        this.print(root.right)
    }
}

class TreeNode {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

const tree = new BinaryTree()
tree.add(5)
tree.add(2)
tree.add(6)
tree.add(2)
tree.add(1)
tree.print();
tree.remove(5);
tree.add(4);
tree.print();
