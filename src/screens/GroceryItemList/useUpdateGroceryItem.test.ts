import { renderHook, act } from '@testing-library/react';
import { useUpdateGroceryItem } from './useUpdateGroceryItem';
import { updateGroceryItem } from '../../db/GroceryItem';
import { db } from '../../db';

// Mock the external dependencies
jest.mock('../../db/GroceryItem', () => ({
    updateGroceryItem: jest.fn(), // Mock the deleteGroceryItem function
  }));
jest.mock( '../../db', () => ({
    db: jest.fn(), // Mock the db itself
  }));

describe('useUpdateGroceryItem', () => {
  const mockData = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
  ];

  const mockUpdateData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Ensure mocks are cleared before each test
  });

  test('should update an existing grocery item and call updateData with the updated data', () => {
    // Arrange
    const { result } = renderHook(() =>
      useUpdateGroceryItem(mockData, mockUpdateData)
    );

    // Act
    act(() => {
      result.current(1, 'Almond Milk'); // Call updateItem with id 1 and new name
    });

    // Assert
    expect(updateGroceryItem).toHaveBeenCalledWith(db, { id: 1, name: 'Almond Milk' });
    expect(mockUpdateData).toHaveBeenCalledWith([
      { id: 1, name: 'Almond Milk' }, // Ensure the item is updated
      { id: 2, name: 'Bread' },
    ]);
  });

  test('should do nothing if no data is provided', () => {
    const { result } = renderHook(() => useUpdateGroceryItem(undefined, mockUpdateData));

    // Act
    act(() => {
      result.current(1, 'Almond Milk'); // Attempt to update item with no data
    });

    // Assert
    expect(updateGroceryItem).not.toHaveBeenCalled(); // Ensure the db function was not called
    expect(mockUpdateData).not.toHaveBeenCalled(); // Ensure updateData is not called
  });
});
