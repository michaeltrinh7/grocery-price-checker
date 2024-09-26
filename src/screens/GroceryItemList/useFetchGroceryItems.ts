import { useEffect } from "react";
import { GroceryItem } from "../../types/DataItem";
import { getAllGroceryItems } from "../../db/GroceryItem";
import { db } from "../../db";

export const useFetchGroceryItems = (
    updateData: (items: GroceryItem[]) => void
  ) => {
    useEffect(() => {
      const items = getAllGroceryItems(db);
      if (items) {
        updateData(items);
      }
    }, []);
  };