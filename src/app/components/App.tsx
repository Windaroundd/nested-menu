"use client";
import { useEffect, useState } from "react";

import useNode from "@/hooks/useNode";
import { TreeNode } from "@/types";
import { localCategoryService } from "@/services/localServices";

import Category from "./Category";

const App = () => {
  const [categoryData, setCategoryData] = useState<TreeNode>(
    localCategoryService.get()
  );

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId: number, item: string) => {
    const finalStructure = insertNode(categoryData, folderId, item);
    setCategoryData(finalStructure);
  };

  const handleEditNode = (folderId: number, value: string) => {
    const finalStructure = editNode(categoryData, folderId, value);
    setCategoryData(finalStructure);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalStructure = deleteNode(categoryData, folderId);
    const temp = { ...finalStructure };
    setCategoryData(temp);
  };

  useEffect(() => {
    localCategoryService.set(categoryData);
  }, [categoryData]);

  return (
    <div className="App container mx-auto">
      <Category
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        category={categoryData}
      />
    </div>
  );
};

export default App;
