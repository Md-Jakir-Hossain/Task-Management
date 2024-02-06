import React, { useEffect, useReducer, useState } from "react";
import Todo from "../todo/Todo";
import { getData } from "../../Utils/Utils";
import './todos.css'

const initialState = getData();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: payload, completed: false }];
    case "DELETE_TASK":
      return state.filter((todo) => todo.id !== payload);
    case "EDIT_TASK":
      return state.map((todo) =>
        todo.id === payload.id ? { ...todo, text: payload.update } : todo
      );
  }
};

const Todos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      dispatch({ type: "ADD_TASK", payload: input });
      setInput("");
    } else {
      alert("please write something");
    }
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container">
      
      <fieldset>
        <legend>Task Management</legend>
        <form onSubmit={handleSubmit}>
          <div className="taskField">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Input here"
        />
            <button className="addBtn">Add Task</button>
            </div>
        </form>
        </fieldset>
      <div>
        {state.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteItem={deleteItem}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
