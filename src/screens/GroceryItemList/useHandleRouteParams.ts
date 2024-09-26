import { useEffect } from "react";
import { GroceryItemListNavigation, GroceryItemListRoute } from "./GroceryItemList";
import { GroceryItem } from "../../types/DataItem";
import { useUpdateGroceryItem } from "./useUpdateGroceryItem";
import { useAddGroceryItem } from "./useAddGroceryItem";

export const useHandleRouteParams = (
    route: GroceryItemListRoute,
    data: GroceryItem[] | undefined,
    updateData: (items: GroceryItem[]) => void,
    navigation: GroceryItemListNavigation
  ) => {
    const updateItem = useUpdateGroceryItem(data, updateData);
    const addItem = useAddGroceryItem(updateData);
  
    useEffect(() => {
      if (!data || !route.params?.itemName) return;
  
      const { itemId, itemName } = route.params;
  
      if (itemId > 0) {
        // Update existing item
        updateItem(itemId, itemName);
      } else {
        // Add new item
        addItem({ id: 0, name: itemName }, data);
      }
  
      // Reset route params
      navigation.setParams({ itemId: 0, itemName: '' });
    }, [route.params?.itemName]);
  };