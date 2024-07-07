import React, { createContext, useState, ReactNode, useCallback } from 'react';
import moment from 'moment';

interface ListItem {
  id: string;
  title: string;
  [key: string]: any;
}

interface ListContextProps {
  listItems: ListItem[];
  addToList: (item: ListItem) => void;
  removeFromList: (id: string) => void;
  clearList: () => void; // 新增 clearList 方法
  showList: boolean;
  toggleList: () => void;
  closeList: () => void;
  isLeftPanelVisible: boolean;
  toggleLeftPanel: () => void;
  selectedDates: [moment.Moment | null, moment.Moment | null] | null;
  setSelectedDates: (dates: [moment.Moment | null, moment.Moment | null] | null) => void;
  addItemWithDateCheck: (item: ListItem, onMissingDates: () => void) => void;
  planData: any;
  setPlanData: (data: any) => void;
  isItemInList: (id: string) => boolean;
}

export const ListContext = createContext<ListContextProps | undefined>(undefined);

interface ListProviderProps {
  children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
  const [selectedDates, setSelectedDates] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);
  const [planData, setPlanData] = useState<any>(null);

  const addToList = (item: ListItem) => {
    setListItems((prevItems) => [...prevItems, item]);
  };

  const removeFromList = (id: string) => {
    setListItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearList = () => {
    setListItems([]);
  };

  const addItemWithDateCheck = (item: ListItem, onMissingDates: () => void) => {
    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      onMissingDates();
    } else {
      if (listItems.some(listItem => listItem.id === item.id)) {
        removeFromList(item.id);
      } else {
        addToList(item);
      }
    }
  };

  const isItemInList = (id: string) => {
    return listItems.some(item => item.id === id);
  };

  const toggleList = useCallback(() => {
    setShowList((prev) => !prev);
  }, []);

  const closeList = useCallback(() => {
    setShowList(false);
  }, []);

  const toggleLeftPanel = useCallback(() => {
    setIsLeftPanelVisible((prev) => !prev);
  }, []);

  return (
    <ListContext.Provider value={{
      listItems,
      addToList,
      removeFromList,
      clearList, 
      showList,
      toggleList,
      closeList,
      isLeftPanelVisible,
      toggleLeftPanel,
      selectedDates,
      setSelectedDates,
      addItemWithDateCheck,
      planData,
      setPlanData,
      isItemInList,
    }}>
      {children}
    </ListContext.Provider>
  );
};
