import { useState } from "react";
import { GroceryItem, SortCompareFn } from "../../types/DataItem";

export const useGroceryItemState = (initialItems?: GroceryItem[]) => {
    const [data, setData] = useState<GroceryItem[] | undefined>(initialItems);
    const [filter, setFilter] = useState('');
    const [sortedData, setSortedData] = useState<GroceryItem[] | undefined>(
      data?.sort(SortCompareFn)
    );
  
    const updateData = (updatedData: GroceryItem[]) => {
      setData(updatedData);
      const foundData = updatedData
        .filter((d) => d.name?.includes(filter))
        .sort(SortCompareFn);
      setSortedData(foundData);
    };
  
    const handleFilterChange = (newFilter: string) => {
      setFilter(newFilter);
      if (data) {
        const filtered = data
          .filter((d) => d.name?.includes(newFilter))
          .sort(SortCompareFn);
        setSortedData(filtered);
      }
    };
  
    return { data, sortedData, updateData, handleFilterChange };
  };