function undoable(reducer) {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case "UNDO": {
        const previous = present.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      case "REDO": {
        const next = present.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      default: {
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
}

export default undoable;
