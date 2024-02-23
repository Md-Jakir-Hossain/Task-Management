export const reducer = (state, action) => {
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