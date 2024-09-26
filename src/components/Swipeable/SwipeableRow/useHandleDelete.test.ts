import { renderHook } from '@testing-library/react';
import { runOnJS, SharedValue, withTiming } from 'react-native-reanimated';
import { useHandleDelete } from './useHandleDelete';

jest.mock('react-native-reanimated', () => ({
  runOnJS: jest.fn((fn) => fn), // Return the passed function to simulate JS execution
  withTiming: jest.fn((value, config, callback) => {
    if (callback) {
      callback(true); // Simulate animation finished
    }
    return value;
  }),
}));

describe('useHandleDelete', () => {
  const itemHeight = { value:0};
  const opacity = { value:0};
  const onDelete = jest.fn();

  beforeEach(() => {
    itemHeight.value = 100 ; // initial value
    opacity.value = 1 ; // initial value
    jest.clearAllMocks();
  });

  it('should animate itemHeight and opacity values', () => {
    const { result } = renderHook(() => useHandleDelete(itemHeight as SharedValue<number>, opacity as SharedValue<number>, onDelete));

    // Trigger handleDelete
    result.current();

    expect(withTiming).toHaveBeenCalledWith(0, undefined, expect.any(Function));
    expect(itemHeight.value).toBe(0);
    expect(opacity.value).toBe(0);
  });

  it('should call onDelete after the animation completes', () => {
    const { result } = renderHook(() => useHandleDelete(itemHeight as SharedValue<number>, opacity as SharedValue<number>, onDelete));

    // Trigger handleDelete
    result.current();

    expect(runOnJS).toHaveBeenCalledWith(onDelete);
    expect(onDelete).toHaveBeenCalled();
  });
});
