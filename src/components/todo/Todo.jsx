import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { GrCompliance } from "react-icons/gr";
import './todo.css'

const Todo = ({ todo, deleteItem, dispatch }) => {
  const { id, text, completed } = todo;
  const [isEdit, setIsEdit] = useState(false);
  const [update, setUpdate] = useState(text);
  const [isComplete, setIsComplete] = useState(completed);
  const handleEdit = () => {
    setIsEdit(!isEdit);
    dispatch({
      type: "EDIT_TASK",
      payload: { id, update },
    });
  };
  const completedTask = () => {
    setIsComplete(!isComplete);
  };

  return (
    <div className="task">
      <div className="btn">
        <GrCompliance onClick={completedTask} title="complete"/>
      </div>
      {isComplete ? (
        <s>
          <p>
            {isEdit ? (
              <input
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
            ) : (
              text
            )}
          </p>
        </s>
      ) : (
        <p>
          {isEdit ? (
            <input
              type="text"
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
            />
          ) : (
            text
          )}
        </p>
      )}

      <div className="btn">
        <span onClick={handleEdit}>{isEdit ? <GrUpdate title="update"/> : <FiEdit title="edit"/>}</span>
        <span title="delete" onClick={() => deleteItem(id)}>
          <MdDelete color="red"/>
        </span>
      </div>
    </div>
  );
};

export default Todo;
