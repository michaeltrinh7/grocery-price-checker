import { db } from "../../db";
import { updateGroceryItem } from "../../db/GroceryItem";
import { GroceryItem } from "../../types/DataItem";

export const useUpdateGroceryItem = (
    data: GroceryItem[] | undefined,
    updateData: (items: GroceryItem[]) => void
  ) => {
    const updateItem = (itemId: number, itemName: string) => {
      if (!data) return;
  
      const item = { id: itemId, name: itemName };
      updateGroceryItem(db, item);
  
      const updatedData = data.map((d) =>
        d.id === itemId ? { ...d, name: itemName } : d
      );
      updateData(updatedData);
    };
  
    return updateItem;
  };