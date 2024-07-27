import React, {
  createContext,
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";

interface ListItem {
  id: string;
  title: string;
  [key: string]: any;
}

interface ListContextProps {
  listItems: ListItem[];
  addToList: (item: ListItem) => void;
  removeFromList: (title: string) => void;
  clearList: () => void;
  showList: boolean;
  toggleList: () => void;
  closeList: () => void;
  isLeftPanelVisible: boolean;
  toggleLeftPanel: () => void;
  selectedDates: [moment.Moment | null, moment.Moment | null] | null;
  setSelectedDates: (
    dates: [moment.Moment | null, moment.Moment | null] | null
  ) => void;
  addItemWithDateCheck: (
    item: ListItem,
    onMissingDates: () => void,
    componentName: string
  ) => void;
  planData: any;
  setPlanData: (data: any) => void;
  isItemInList: (title: string) => boolean;
}

export const ListContext = createContext<ListContextProps | undefined>(
  undefined
);

interface ListProviderProps {
  children: ReactNode;
}

type Action =
  | { type: "ADD_TO_LIST"; item: ListItem }
  | { type: "REMOVE_FROM_LIST"; title: string }
  | { type: "CLEAR_LIST" }
  | {
      type: "SET_SELECTED_DATES";
      dates: [moment.Moment | null, moment.Moment | null] | null;
    }
  | { type: "SET_PLAN_DATA"; data: any }
  | { type: "TOGGLE_LIST" }
  | { type: "CLOSE_LIST" }
  | { type: "TOGGLE_LEFT_PANEL" }
  | { type: "SET_LIST"; listItems: ListItem[] }
  | { type: "CLEAR_PLAN_DATA" };

const initialState = {
  listItems: [] as ListItem[],
  showList: false,
  isLeftPanelVisible: true,
  selectedDates: null as [moment.Moment | null, moment.Moment | null] | null,
  planData: null,
};

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "ADD_TO_LIST": {
      const newListItems = [...state.listItems, action.item];
      console.log("New list after ADD_TO_LIST:", newListItems);
      return {
        ...state,
        listItems: newListItems,
        showList: state.listItems.length === 0 ? true : state.showList, // for the first item added, show the list
      };
    }
    case "REMOVE_FROM_LIST": {
      const newListItems = state.listItems.filter(
        (item) => item.title !== action.title
      );
      console.log("New list after REMOVE_FROM_LIST:", newListItems);
      return { ...state, listItems: newListItems };
    }
    case "CLEAR_LIST": {
      console.log("New list after CLEAR_LIST:", []);
      return { ...state, listItems: [] };
    }
    case "SET_SELECTED_DATES":
      return { ...state, selectedDates: action.dates };
    case "SET_PLAN_DATA":
      return { ...state, planData: action.data };
    case "TOGGLE_LIST":
      return { ...state, showList: !state.showList };
    case "CLOSE_LIST":
      return { ...state, showList: false };
    case "TOGGLE_LEFT_PANEL":
      return { ...state, isLeftPanelVisible: !state.isLeftPanelVisible };
    case "SET_LIST":
      return { ...state, listItems: action.listItems };
    case "CLEAR_PLAN_DATA":
      return { ...state, planData: null };
    default:
      throw new Error("Unknown action type");
  }
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  // Load cookies on initial render
  useEffect(() => {
    const savedDates = Cookies.get("selectedDates");
    const savedList = Cookies.get("listItems");
    const savedPlanData = Cookies.get("planData");

    if (savedDates) {
      const parsedDates = JSON.parse(savedDates).map((date: string | null) =>
        date ? moment(date) : null
      ) as [moment.Moment | null, moment.Moment | null];
      dispatch({ type: "SET_SELECTED_DATES", dates: parsedDates });
    }

    if (savedList) {
      dispatch({ type: "SET_LIST", listItems: JSON.parse(savedList) });
    }

    if (savedPlanData) {
      dispatch({ type: "SET_PLAN_DATA", data: JSON.parse(savedPlanData) });
    }
  }, []);

  useEffect(() => {
    if (
      state.selectedDates &&
      state.selectedDates[0] &&
      state.selectedDates[1]
    ) {
      Cookies.set("listItems", JSON.stringify(state.listItems), { expires: 1 });
    } else {
      Cookies.remove("listItems");
    }
  }, [state.listItems, state.selectedDates]);

  useEffect(() => {
    if (
      state.selectedDates &&
      state.selectedDates[0] &&
      state.selectedDates[1]
    ) {
      const datesToSave = state.selectedDates.map((date) =>
        date ? date.toISOString() : null
      );
      Cookies.set("selectedDates", JSON.stringify(datesToSave), { expires: 1 });
    } else {
      Cookies.remove("selectedDates");
    }
  }, [state.selectedDates]);

  useEffect(() => {
    if (state.planData) {
      Cookies.set("planData", JSON.stringify(state.planData), { expires: 1 });
    } else {
      Cookies.remove("planData");
    }
  }, [state.planData]);

  const addToList = (item: ListItem) => {
    dispatch({ type: "ADD_TO_LIST", item });
  };

  const removeFromList = (title: string) => {
    dispatch({ type: "REMOVE_FROM_LIST", title });
  };

  const clearList = () => {
    dispatch({ type: "CLEAR_LIST" });
  };

  // New function to clear plan data in context
  const clearPlanData = () => {
    dispatch({ type: "CLEAR_PLAN_DATA" });
    navigate("/spots");
  };

  const addItemWithDateCheck = (
    item: ListItem,
    onMissingDates: () => void,
    componentName: string
  ) => {
    if (
      !state.selectedDates ||
      !state.selectedDates[0] ||
      !state.selectedDates[1]
    ) {
      onMissingDates();
    } else {
      if (state.listItems.some((listItem) => listItem.title === item.title)) {
        console.log(`Remove from ${componentName}:`, item);
        removeFromList(item.title);
      } else {
        console.log(`Add from ${componentName}:`, item);
        addToList(item);
      }
    }
  };

  const isItemInList = (title: string) => {
    return state.listItems.some((item) => item.title === title);
  };

  const toggleList = useCallback(() => {
    dispatch({ type: "TOGGLE_LIST" });
  }, []);

  const closeList = useCallback(() => {
    dispatch({ type: "CLOSE_LIST" });
  }, []);

  const toggleLeftPanel = useCallback(() => {
    dispatch({ type: "TOGGLE_LEFT_PANEL" });
  }, []);

  return (
    <ListContext.Provider
      value={{
        listItems: state.listItems,
        addToList,
        removeFromList,
        clearList,
        showList: state.showList,
        toggleList,
        closeList,
        isLeftPanelVisible: state.isLeftPanelVisible,
        toggleLeftPanel,
        selectedDates: state.selectedDates,
        setSelectedDates: (dates) =>
          dispatch({ type: "SET_SELECTED_DATES", dates }),
        addItemWithDateCheck,
        planData: state.planData,
        setPlanData: (data) => dispatch({ type: "SET_PLAN_DATA", data }),
        isItemInList,
        clearPlanData,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
