import { GroceryItemListProps } from "./GroceryItemList";
import { useFetchGroceryItems } from "./useFetchGroceryItems";
import { useGroceryItemState } from "./useGroceryItemState";
import { useHandleItemActions } from "./useHandleItemActions";
import { useHandleRouteParams } from "./useHandleRouteParams";

export const useGroceryItemList = ({ navigation, route, items }: GroceryItemListProps) => {
    const { data, sortedData, updateData, handleFilterChange } =
      useGroceryItemState(items);
    const { handleEdit, handleDelete } = useHandleItemActions(
      data,
      updateData,
      navigation
    );
  
    // Fetch grocery items on mount
    useFetchGroceryItems(updateData);
  
    // Handle updates based on route parameters
    useHandleRouteParams(route, data, updateData, navigation);
  
    return {
      sortedData,
      handleEdit,
      handleDelete,
      handleFilterChange,
    };
  };
  