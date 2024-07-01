// src/contexts/ListContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface ListItem {
  id: string;
  title: string; 

  [key: string]: any;
}

interface ListContextProps {
  listItems: ListItem[];
  addToList: (item: ListItem) => void;
  removeFromList: (id: string) => void;
}

export const ListContext = createContext<ListContextProps | undefined>(undefined);

interface ListProviderProps {
  children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  const addToList = (item: ListItem) => {
    setListItems((prevItems) => [...prevItems, item]);
  };

  const removeFromList = (id: string) => {
    setListItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <ListContext.Provider value={{ listItems, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
};
