import { renderHook } from '@testing-library/react';
import { useGroceryItemList } from './useGroceryItemList';
import { useFetchGroceryItems } from './useFetchGroceryItems';
import { useGroceryItemState } from './useGroceryItemState';
import { useHandleItemActions } from './useHandleItemActions';
import { GroceryItemListNavigation, GroceryItemListRoute } from './GroceryItemList';
import { useHandleRouteParams } from './useHandleRouteParams';

// Mock the dependencies
jest.mock('./useFetchGroceryItems');
jest.mock('./useGroceryItemState');
jest.mock('./useHandleItemActions');
jest.mock('./useHandleRouteParams');
jest.mock( '../../db', () => ({
    db: jest.fn(), // Mock the db itself
  }));
  
describe('useGroceryItemList', () => {
  const mockNavigation : Partial<GroceryItemListNavigation> = { navigate: jest.fn() };
  const mockRoute = { params: { itemId: 1, itemName: 'Milk' } };
  const mockItems = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
  ];

  const mockUpdateData = jest.fn();
  const mockHandleFilterChange = jest.fn();
  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockSortedData = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the return values of the hooks
    (useGroceryItemState as jest.Mock).mockReturnValue({
      data: mockItems,
      sortedData: mockSortedData,
      updateData: mockUpdateData,
      handleFilterChange: mockHandleFilterChange,
    });

    (useHandleItemActions as jest.Mock).mockReturnValue({
      handleEdit: mockHandleEdit,
      handleDelete: mockHandleDelete,
    });

    (useFetchGroceryItems as jest.Mock).mockImplementation((updateData) => {
      updateData(mockItems);
    });

    // (useHandleRouteParams as jest.Mock).mockImplementation(
    //   (route, data, updateData, navigation) => {}
    // );
  });

  test('should call useGroceryItemState with correct parameters', () => {
    renderHook(() =>
      useGroceryItemList({ navigation: mockNavigation as GroceryItemListNavigation, route: mockRoute as GroceryItemListRoute, items: mockItems })
    );

    expect(useGroceryItemState).toHaveBeenCalledWith(mockItems);
  });

  test('should call useHandleItemActions with correct parameters', () => {
    renderHook(() =>
        useGroceryItemList({ navigation: mockNavigation as GroceryItemListNavigation, route: mockRoute as GroceryItemListRoute, items: mockItems })
    );

    expect(useHandleItemActions).toHaveBeenCalledWith(mockItems, mockUpdateData, mockNavigation);
  });

  test('should call useFetchGroceryItems on mount', () => {
    renderHook(() => useGroceryItemList({ navigation: mockNavigation as GroceryItemListNavigation, route: mockRoute as GroceryItemListRoute, items: mockItems })
    );

    expect(useFetchGroceryItems).toHaveBeenCalledWith(mockUpdateData);
  });

  test('should call useHandleRouteParams with correct parameters', () => {
    renderHook(() => useGroceryItemList({ navigation: mockNavigation as GroceryItemListNavigation, route: mockRoute as GroceryItemListRoute, items: mockItems }));

    expect(useHandleRouteParams).toHaveBeenCalledWith(
      mockRoute,
      mockItems,
      mockUpdateData,
      mockNavigation
    );
  });

  test('should return correct values from the hook', () => {
    const { result } = renderHook(() => useGroceryItemList({ navigation: mockNavigation as GroceryItemListNavigation, route: mockRoute as GroceryItemListRoute, items: mockItems }));

    expect(result.current.sortedData).toEqual(mockSortedData);
    expect(result.current.handleEdit).toEqual(mockHandleEdit);
    expect(result.current.handleDelete).toEqual(mockHandleDelete);
    expect(result.current.handleFilterChange).toEqual(mockHandleFilterChange);
  });
});
