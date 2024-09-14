// errorMiddleware.js
import { toast } from "react-toastify";
import { clearErrors as ClearErrorsFromBoard } from "../../features/BoardSlice.js";
import { clearErrors as ClearErrorsFromColumn} from "../../features/ColumnSlice.js";
import { clearErrors as ClearErrorsFromTask } from "../../features/TaskSlice.js";
import { clearErrors as ClearErrorsFromSubTask} from "../../features/SubTaskSlice.js";
import { clearErrors as ClearErrorsFromTaskDisuccsion} from "../../features/TaskDiscussionSlice.js";
import { clearErrors as ClearErrorsFromWorkspaceMember} from "../../features/WorkspaceMembersSlice";
import { clearErrors as ClearErrorsFromWorkspace} from "../../features/workspaceSlice";
import { clearErrors as ClearErrorsFromColumnsTasks} from "../../features/ColumnsTasksSlice.js";

const errorMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  // Define slices where you want to monitor errors
  const slicesToMonitor = [
    {"sliceName":"boards","clearAction":ClearErrorsFromBoard },
    {"sliceName":"columns","clearAction":ClearErrorsFromColumn},
    {"sliceName":"subTasks","clearAction":ClearErrorsFromSubTask},
    {"sliceName":"taskDiscussions","clearAction":ClearErrorsFromTaskDisuccsion},
    {"sliceName":"tasks","clearAction":ClearErrorsFromTask},
    {"sliceName":"workspaceMembers","clearAction":ClearErrorsFromWorkspaceMember},
    {"sliceName":"workspace","clearAction":ClearErrorsFromWorkspace},
    {"sliceName":"columnsTasks","clearAction":ClearErrorsFromColumnsTasks},
  ]; // Add more slice names as needed

  slicesToMonitor.forEach(({sliceName,clearAction}) => {
    const errors = state[sliceName]?.errors;

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });

      // Optionally clear errors after showing them
      // You could dispatch an action here to clear the errors from the state
      store.dispatch(clearAction());
    }
  });

  return result;
};

export default errorMiddleware;
