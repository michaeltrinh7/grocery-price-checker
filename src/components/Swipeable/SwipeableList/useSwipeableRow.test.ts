import { renderHook, act } from '@testing-library/react';
import { Swipeable } from 'react-native-gesture-handler';
import { useSwipeableRow } from './useSwipeableRow';

describe('useSwipeableRow', () => {
  let swipeableRef1: Swipeable;
  let swipeableRef2: Swipeable;

  beforeEach(() => {
    swipeableRef1 = { close: jest.fn() } as unknown as Swipeable;
    swipeableRef2 = { close: jest.fn() } as unknown as Swipeable;
  });

  it('should open a new row and not close any row if none was open before', () => {
    const { result } = renderHook(() => useSwipeableRow());

    act(() => {
      result.current.handleSwipeOpen(swipeableRef1);
    });

    // No previous row, so no close should be called
    expect(swipeableRef1.close).not.toHaveBeenCalled();
  });

  it('should close the previous row when a new row is opened', () => {
    const { result } = renderHook(() => useSwipeableRow());

    act(() => {
      result.current.handleSwipeOpen(swipeableRef1);
    });

    // Open the first row
    expect(swipeableRef1.close).not.toHaveBeenCalled();

    act(() => {
      result.current.handleSwipeOpen(swipeableRef2);
    });

    // The first row should be closed when the second row is opened
    expect(swipeableRef1.close).toHaveBeenCalled();
    expect(swipeableRef2.close).not.toHaveBeenCalled(); // Second row shouldn't close yet
  });

  it('should not close the same row if it is reopened', () => {
    const { result } = renderHook(() => useSwipeableRow());

    act(() => {
      result.current.handleSwipeOpen(swipeableRef1);
    });

    // Open the first row
    expect(swipeableRef1.close).not.toHaveBeenCalled();

    act(() => {
      result.current.handleSwipeOpen(swipeableRef1);
    });

    // The same row shouldn't close when reopened
    expect(swipeableRef1.close).not.toHaveBeenCalled();
  });
});
