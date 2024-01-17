import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Item, TreeNode } from "@/types";
import { DownArrow_SVG, UpArrow_SVG } from "@/components/SVG";

import Action from "./Action";

interface Props {
  handleInsertNode: (folderId: number, item: string) => void;
  handleEditNode: (folderId: number, value: string) => void;
  handleDeleteNode: (folderId: number) => void;
  category: TreeNode;
}

const Category = (props: Props) => {
  const { handleInsertNode, handleEditNode, handleDeleteNode, category } =
    props;
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewCategory = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddCategory = () => {
    if (editMode) {
      if (inputRef?.current?.innerText == "") {
        alert("Please fill content");
      } else {
        handleEditNode(category.id, inputRef?.current?.innerText);
      }
    } else {
      setExpand(true);
      if (input == "") {
        alert("Please fill content");
      } else {
        handleInsertNode(category.id, input);
        setShowInput(false);
        setInput("");
      }
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(category.id);
  };

  //
  useEffect(() => {
    setExpand(true);
  }, []);

  return (
    <div>
      <div
        className={
          category.id === Item.ROOT ? "inputContainer" : "categoryContainer"
        }
      >
        {category.id === Item.ROOT ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type here..."
            />

            <Action
              className="add-category category"
              type="Add Category"
              handleClick={onAddCategory}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              className="break-words"
            >
              {category.name}
            </span>

            <div className="flex mt-2">
              {editMode ? (
                <>
                  <Action
                    className="add-category"
                    type="SAVE"
                    handleClick={onAddCategory}
                  />
                  <Action
                    className="add-category"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = category.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="add-category uppercase"
                    type={
                      <>
                        {expand ? (
                          <Image
                            className="w-[10px] h-[10px] inline-block"
                            src={UpArrow_SVG}
                            alt=""
                          />
                        ) : (
                          <Image
                            className="w-[10px] h-[10px] inline-block"
                            src={DownArrow_SVG}
                            alt=""
                          />
                        )}{" "}
                        Add category
                      </>
                    }
                    handleClick={handleNewCategory}
                  />
                  <Action
                    className="add-category"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="add-category"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none" }} className="pl-7">
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              className="add-category uppercase"
              type="Add"
              handleClick={onAddCategory}
            />
            <Action
              className="add-category"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!category?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {category?.items?.map((category) => {
          return (
            <Category
              key={category.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
