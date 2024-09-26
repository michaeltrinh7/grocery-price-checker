import { db } from "../../db";
import { addGroceryItem } from "../../db/GroceryItem";
import { GroceryItem } from "../../types/DataItem";

export const useAddGroceryItem = (
    updateData: (items: GroceryItem[]) => void
  ) => {
    const addItem = (item: GroceryItem, existingData: GroceryItem[]) => {
      // Check if item is valid before calling external functions
      if (item && item.name) {
        addGroceryItem(db, item);
        const updatedData = [...existingData, item];
        updateData(updatedData);
      }
    };
  
    return addItem;
  };
  