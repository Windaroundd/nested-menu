export interface TreeNode {
  id: number;
  name: string;
  items: TreeNode[];
}

export enum Item {
  ROOT = 1,
}
