import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface ListItem {
  id: string;
  title: string;
  [key: string]: any;
}

interface ListContextProps {
  listItems: ListItem[];
  addToList: (item: ListItem) => void;
  removeFromList: (id: string) => void;
  showList: boolean;
  toggleList: () => void;
  closeList: () => void;
  isLeftPanelVisible: boolean;
  toggleLeftPanel: () => void;
}

export const ListContext = createContext<ListContextProps | undefined>(undefined);

interface ListProviderProps {
  children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);

  const addToList = (item: ListItem) => {
    setListItems((prevItems) => [...prevItems, item]);
  };

  const removeFromList = (id: string) => {
    setListItems((prevItems) => prevItems.filter(item => item.id !== id));
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
    <ListContext.Provider value={{ listItems, addToList, removeFromList, showList, toggleList, closeList, isLeftPanelVisible, toggleLeftPanel }}>
      {children}
    </ListContext.Provider>
  );
};
