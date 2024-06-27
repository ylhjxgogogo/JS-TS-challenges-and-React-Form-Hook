import { useContext } from "react";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
export function TasksProvider({ children }) {
  const [state, dispatch] = useImmerReducer(taskReducer, initialTasks);
  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
function taskReducer(draft, action) {
  switch (action.type) {
    case "add": {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case "edit": {
      const index = draft.findIndex((task) => task.id === action.id);
      draft[index].text = action.text;
      break;
    }
    case "delete": {
      return draft.filter((task) => task.id !== action.id);
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}
export function useTasks() {
  return useContext(TasksContext);
}
export function useDispathTask() {
  return useContext(TasksDispatchContext);
}
