import { renderHook } from '@testing-library/react';
import { useHandleRouteParams } from './useHandleRouteParams';
import { useUpdateGroceryItem } from './useUpdateGroceryItem';
import { useAddGroceryItem } from './useAddGroceryItem';
import { GroceryItemListNavigation, GroceryItemListRoute } from './GroceryItemList';

// Mock the dependencies
jest.mock('./useUpdateGroceryItem');
jest.mock('./useAddGroceryItem');
jest.mock( '../../db', () => ({
    db: jest.fn(), // Mock the db itself
  }));

describe('useHandleRouteParams', () => {
  const mockUpdateItem = jest.fn();
  const mockAddItem = jest.fn();
  const mockSetParams = jest.fn();

  const mockNavigation  = {
    setParams: mockSetParams,
  } as unknown as GroceryItemListNavigation;

  const mockRouteWithUpdate = {
    params: { itemId: 1, itemName: 'Milk' }, // existing item
  } as unknown as GroceryItemListRoute;

  const mockRouteWithAdd = {
    params: { itemId: 0, itemName: 'New Item' }, // new item
  } as unknown as GroceryItemListRoute;

  const mockData = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
  ];

  const mockUpdateData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateGroceryItem as jest.Mock).mockReturnValue(mockUpdateItem);
    (useAddGroceryItem as jest.Mock).mockReturnValue(mockAddItem);
  });

  test('should update existing item', () => {
    renderHook(() =>
      useHandleRouteParams(mockRouteWithUpdate, mockData, mockUpdateData, mockNavigation)
    );

    // Check that updateItem is called
    expect(mockUpdateItem).toHaveBeenCalledWith(1, 'Milk');

    // Ensure setParams is called to reset route params
    expect(mockSetParams).toHaveBeenCalledWith({ itemId: 0, itemName: '' });
  });

  test('should add new item', () => {
    renderHook(() =>
        useHandleRouteParams(mockRouteWithAdd, mockData, mockUpdateData, mockNavigation)
    );

    // Check that addItem is called
    expect(mockAddItem).toHaveBeenCalledWith({ id: 0, name: 'New Item' }, mockData);

    // Ensure setParams is called to reset route params
    expect(mockSetParams).toHaveBeenCalledWith({ itemId: 0, itemName: '' });
  });

  test('should not call any actions if no data or no itemName in route params', () => {
    const mockRouteWithoutParams = {
      params: {},
    } as unknown as GroceryItemListRoute;

    renderHook(() =>
        useHandleRouteParams(mockRouteWithoutParams, mockData, mockUpdateData, mockNavigation)
    );

    // No itemName, so updateItem and addItem should not be called
    expect(mockUpdateItem).not.toHaveBeenCalled();
    expect(mockAddItem).not.toHaveBeenCalled();

    // setParams should not be called
    expect(mockSetParams).not.toHaveBeenCalled();
  });
});
