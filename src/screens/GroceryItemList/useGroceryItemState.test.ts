import { renderHook, act } from '@testing-library/react';
import { GroceryItem } from '../../types/DataItem';
import { useGroceryItemState } from './useGroceryItemState';


describe('useGroceryItemState', () => {
  const mockData: GroceryItem[] = [
    { id: 1, name: 'Apples' },
    { id: 2, name: 'Bananas' },
  ];

  test('should initialize with sorted data', () => {
    const { result } = renderHook(() => useGroceryItemState(mockData));
    expect(result.current.sortedData).toEqual(mockData.sort());
  });

  test('should filter data correctly', () => {
    const { result } = renderHook(() => useGroceryItemState(mockData));

    act(() => {
      result.current.handleFilterChange('Ban');
    });

    expect(result.current.sortedData).toEqual([{ id: 2, name: 'Bananas' }]);
  });

  test('should update data correctly', () => {
    const { result } = renderHook(() => useGroceryItemState(mockData));

    act(() => {
      result.current.updateData([{ id: 3, name: 'Oranges' }]);
    });

    expect(result.current.data).toEqual([{ id: 3, name: 'Oranges' }]);
  });
});
