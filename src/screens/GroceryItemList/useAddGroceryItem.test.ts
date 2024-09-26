import { renderHook, act } from '@testing-library/react';
import { useAddGroceryItem } from './useAddGroceryItem';
import { addGroceryItem } from '../../db/GroceryItem';
import { db } from '../../db';
import { GroceryItem } from '../../types/DataItem';

// Mock the external dependencies
jest.mock('../../db/GroceryItem', () => ({
    addGroceryItem: jest.fn(), // Mock the deleteGroceryItem function
  }));
jest.mock( '../../db', () => ({
    db: jest.fn(), // Mock the db itself
  }));

describe('useAddGroceryItem', () => {
  const mockUpdateData = jest.fn();

  const mockExistingData: GroceryItem[] = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Ensure all mocks are reset before each test
  });

  test('should add a new grocery item and call updateData with updated data', () => {
    const newItem: GroceryItem = { id: 3, name: 'Eggs' };

    // Render the hook
    const { result } = renderHook(() => useAddGroceryItem(mockUpdateData));

    // Act - add the new item
    act(() => {
      result.current(newItem, mockExistingData);
    });

    // Assert
    expect(addGroceryItem).toHaveBeenCalledWith(db, newItem);
    expect(mockUpdateData).toHaveBeenCalledWith([
      ...mockExistingData,
      newItem,
    ]);
  });

  test('should not call updateData if no item is provided', () => {
    // Render the hook
    const { result } = renderHook(() => useAddGroceryItem(mockUpdateData));

    // Act - don't add any item
    act(() => {
      result.current({} as GroceryItem, mockExistingData);
    });

    // Assert
    expect(addGroceryItem).not.toHaveBeenCalled(); // No call to addGroceryItem since item is invalid
    expect(mockUpdateData).not.toHaveBeenCalled(); // No call to updateData
  });
});
