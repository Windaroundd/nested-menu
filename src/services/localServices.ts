import { TreeNode } from "@/types";

const CATEGORY_DATA = "CATEGORY-DATA";

export const localCategoryService = {
  get: () => {
    if (typeof localStorage !== "undefined") {
      let rawData = localStorage.getItem(CATEGORY_DATA);
      if (!rawData) {
        return {
          id: 1,
          items: [],
          name: "root",
        };
      } else {
        return JSON.parse(rawData);
      }
    }
  },
  set: (categoryData: TreeNode) => {
    if (typeof localStorage !== "undefined") {
      let data = JSON.stringify(categoryData);
      localStorage.setItem(CATEGORY_DATA, data);
    }
  },
};
