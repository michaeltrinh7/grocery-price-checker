import { renderHook } from '@testing-library/react';
import { useFetchGroceryItems } from './useFetchGroceryItems';
import { getAllGroceryItems } from '../../db/GroceryItem';
import { db } from '../../db';

// Mock the getAllGroceryItems function and db
jest.mock('../../db/GroceryItem', () => ({
    getAllGroceryItems: jest.fn(), // Mock the deleteGroceryItem function
  }));
jest.mock( '../../db', () => ({
    db: jest.fn(), // Mock the db itself
  }));

describe('useFetchGroceryItems', () => {
  const mockUpdateData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('should fetch grocery items and update data', () => {
    const mockItems = [
      { id: 1, name: 'Milk' },
      { id: 2, name: 'Bread' },
    ];

    // Mock implementation of getAllGroceryItems
    (getAllGroceryItems as jest.Mock).mockReturnValue(mockItems);

    // Render the hook
    renderHook(() => useFetchGroceryItems(mockUpdateData));

    // Assert that getAllGroceryItems was called with db
    expect(getAllGroceryItems).toHaveBeenCalledWith(db);
    
    // Assert that updateData was called with the fetched items
    expect(mockUpdateData).toHaveBeenCalledWith(mockItems);
  });

  test('should not update data if no items are fetched', () => {
    // Mock implementation of getAllGroceryItems to return null
    (getAllGroceryItems as jest.Mock).mockReturnValue(null);

    // Render the hook
    renderHook(() => useFetchGroceryItems(mockUpdateData));

    // Assert that getAllGroceryItems was called with db
    expect(getAllGroceryItems).toHaveBeenCalledWith(db);

    // Assert that updateData was not called
    expect(mockUpdateData).not.toHaveBeenCalled();
  });
});
