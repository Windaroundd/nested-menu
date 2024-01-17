import { TreeNode } from "@/types";

const useNode = (): {
  insertNode: (tree: TreeNode, categoryId: number, item: string) => TreeNode;
  editNode: (tree: TreeNode, categoryId: number, value: string) => TreeNode;
  deleteNode: (tree: TreeNode, id: number) => TreeNode;
} => {
  const insertNode = function (
    tree: TreeNode,
    categoryId: number,
    item: string
  ): TreeNode {
    if (tree.id === categoryId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });

      return tree;
    }

    let latestNode: TreeNode[] = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, categoryId, item);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (
    tree: TreeNode,
    categoryId: number,
    value: string
  ): TreeNode => {
    if (tree.id === categoryId) {
      tree.name = value;
      return tree;
    }

    tree.items.map((ob) => {
      return editNode(ob, categoryId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree: TreeNode, id: number): TreeNode => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
