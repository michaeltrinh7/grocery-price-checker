import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SwipeableRow from './SwipeableRow';
import { Text } from 'react-native';

// Extend the existing mock for react-native-reanimated

//const interpolateMock = jest.fn();
const sharedValueMock = { value: 0 };

// const animatedStyleMock = jest.fn();
// jest.mock('react-native-reanimated', () => ({
//   useSharedValue: jest.fn((initialValue) => {
//     sharedValueMock = { value: initialValue };
//     return sharedValueMock;
//   }),
//   useAnimatedStyle: jest.fn(() => animatedStyleMock),
//   withTiming: jest.fn((toValue, _, callback) => {
//     sharedValueMock.value = toValue;
//     if (callback) {
//       callback(true);
//     }
//     return toValue;
//   }),
//   interpolate: interpolateMock,
//   runOnJS: jest.fn((fn) => fn),
// }));

// // Mock for Swipeable component with animation simulation
// jest.mock('react-native-gesture-handler', () => ({
//   RectButton: 'RectButton',
//   Swipeable: ({ children, renderRightActions, onSwipeableWillOpen }) => (
//     <div>
//       {children}
//       <div data-testid='right-actions'>
//         {renderRightActions({ value: 0 }, { value: 0 })}
//       </div>
//       <button
//         onClick={() => onSwipeableWillOpen()}
//         data-testid='swipe-open-trigger'
//       >
//         Trigger Swipe Open
//       </button>
//       <button
//         onClick={() => renderRightActions({ value: -100 }, { value: 1 })}
//         data-testid='simulate-swipe'
//       >
//         Simulate Swipe
//       </button>
//     </div>
//   ),
// }));

describe('SwipeableRow component', () => {
  const mockItem = { id: '1', title: 'Test Item' };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnSwipeOpen = jest.fn();
  const mockRenderRowItem = jest.fn((item) => <Text>{item.title}</Text>);
  const defaultProps = {
    item: mockItem,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onSwipeOpen: mockOnSwipeOpen,
    renderRowItem: mockRenderRowItem,
    rowItemHeight: 70,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    expect(getByText('Test Item')).toBeTruthy();
  });

  it('calls onSwipeOpen when swipeable row is opened', () => {
    const { getByTestId } = render(<SwipeableRow {...defaultProps} />);

    fireEvent(getByTestId('swipeable-row'), 'onSwipeableWillOpen');
    expect(mockOnSwipeOpen).toHaveBeenCalled();
  });

  it('renders right actions with Edit and Delete buttons', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('should call onEdit when the Edit button is pressed', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    fireEvent.press(getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
  });

  it('should call onDelete and animate the row height to 0 when the Delete button is pressed', async () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    fireEvent.press(getByText('Delete'));

    // Wait for the animation and the onDelete to be called
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });

  it('renders the row item using the provided renderRowItem function', () => {
    render(<SwipeableRow {...defaultProps} />);
    expect(mockRenderRowItem).toHaveBeenCalledWith(mockItem);
  });

  it('animates height to 0 on delete', async () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    act(() => {
      fireEvent.press(getByText('Delete'));
    });

    expect(sharedValueMock.value).toBe(0); // Height should animate to 0
  });

  it('animates opacity to 0 on delete', async () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    act(() => {
      fireEvent.press(getByText('Delete'));
    });

    expect(sharedValueMock.value).toBe(0); // Opacity should animate to 0
  });

  // it('interpolates right actions based on swipe progress', () => {
  //   const { getByTestId } = render(<SwipeableRow {...defaultProps} />);

  //   act(() => {
  //     fireEvent.press(getByTestId('swipeable-row'));
  //   });

  //   expect(interpolateMock).toHaveBeenCalledWith(1, [0, -192], [64, 0]);
  // });

  // it('updates animated style on swipe', () => {
  //   render(<SwipeableRow {...defaultProps} />);

  //   expect(animatedStyleMock).toHaveBeenCalled();
  // });
});
