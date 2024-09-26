import { renderHook } from '@testing-library/react';

import { GroceryItemListNavigation } from './GroceryItemList';
import { useHandleItemActions } from './useHandleItemActions';
import { ScreenName } from '../../ScreenInfo';
import { db } from '../../db';
import { deleteGroceryItem } from '../../db/GroceryItem';

// jest.mock('../db', () => ({
//   db: {
//     // Mock any properties or methods used on db
//     transaction: jest.fn(),
//     prepareSync: jest.fn().mockImplementation(() => ({
//       executeSync: jest.fn().mockReturnValue([
//         { id: 1, name: 'Item 1' },
//         { id: 2, name: 'Item 2' },
//       ]), // Mock executeSync to return a list of items
//       finalizeSync: jest.fn(), // Mock finalizeSync
//     })),
//   },
//   addGroceryItem: jest.fn(),
//   deleteGroceryItem: jest.fn(),
//   getAllGroceryItems: jest.fn(),
//   updateGroceryItem: jest.fn(),
// }));

jest.mock('../../db/GroceryItem', () => ({
  deleteGroceryItem: jest.fn(), // Mock the deleteGroceryItem function
}));

jest.mock( '../../db', () => ({
  db: jest.fn(), // Mock the db itself
}));


describe('useHandleItemActions', () => {
  
  const mockNavigation= {
    navigate: jest.fn(),
    setParams: jest.fn(),
  } as unknown as GroceryItemListNavigation;
  const mockUpdateData = jest.fn();

  test('should handle item edit', () => {
    const mockData = [{ id: 1, name: 'Milk' }];
    const { result } = renderHook(() =>
      useHandleItemActions(
        mockData,
        mockUpdateData,
        mockNavigation as GroceryItemListNavigation
      )
    );

    result.current.handleEdit(mockData[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      ScreenName.GroceryItemModal,
      expect.objectContaining({
        itemId: 1,
        itemName: 'Milk',
        screenTitle: "Edit grocery item 'Milk'",
      })
    );
  });

  test('should handle item delete', () => {
    const mockData = [
        { id: 1, name: 'Milk' },  // Item to delete
        { id: 2, name: 'Bread' }, // Item to remain
      ];
      const { result } = renderHook(() =>
        useHandleItemActions(mockData, mockUpdateData, mockNavigation)
      );
    
      // Call the handleDelete function
      result.current.handleDelete(mockData[0].id); // Delete the first item (Milk)
    
      // Check if deleteGroceryItem was called with the correct arguments
      expect(deleteGroceryItem).toHaveBeenCalledWith(db, mockData[0].id);
    
      // Check if updateData was called to remove the deleted item
      expect(mockUpdateData).toHaveBeenCalledWith([{ id: 2, name: 'Bread' }]); // Only Bread should remain
  });
});
