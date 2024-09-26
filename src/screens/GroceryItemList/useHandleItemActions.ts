import { db } from "../../db";
import { deleteGroceryItem } from "../../db/GroceryItem";
import { ScreenName } from "../../ScreenInfo";
import { GroceryItemListNavigation } from "./GroceryItemList";
import { GroceryItem } from "../../types/DataItem";

export const useHandleItemActions = (
    data: GroceryItem[] | undefined,
    updateData: (items: GroceryItem[]) => void,
    navigation: GroceryItemListNavigation
  ) => {
    const handleEdit = (item: GroceryItem) => {
      navigation.navigate(ScreenName.GroceryItemModal, {
        itemId: item.id,
        itemName: item.name,
        screenTitle: `Edit grocery item '${item.name}'`,
      });
    };
  
    const handleDelete = (id: number) => {
      if (!data) return;
  
      deleteGroceryItem(db, id);
      const updatedData = data.filter((d) => d.id !== id);
      updateData(updatedData);
    };
  
    return { handleEdit, handleDelete };
  };
  