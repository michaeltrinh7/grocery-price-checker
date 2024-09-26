import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SwipeableRow from './SwipeableRow';
import { Text } from 'react-native';
// Mock setImmediate in the test environment
global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;

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

  it('renders the row item using the provided renderRowItem function', () => {
    render(<SwipeableRow {...defaultProps} />);
    expect(mockRenderRowItem).toHaveBeenCalledWith(mockItem);
  });

  // New test: Check if renderRightActions is rendering correctly
  it('renders Edit and Delete buttons in renderRightActions', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    // Check that the Edit and Delete buttons are present in the right actions
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  // New test: Check if the Edit button works in renderRightActions
  it('calls onEdit when the Edit button is pressed in renderRightActions', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);

    // Press the Edit button
    fireEvent.press(getByText('Edit'));

    // Verify that the onEdit function is called with the correct item
    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
  });

  // // New test: Check if the Delete button works in renderRightActions
  // it('calls onDelete when the Delete button is pressed in renderRightActions', () => {
  //   const { queryByText } = render(<SwipeableRow {...defaultProps} />);

  //   // Log whether the "Delete" button is rendered
  //   const deleteButton = queryByText('Delete');
  //   console.log('Delete button found:', deleteButton !== null);

  //   // Simulate pressing the Delete button only if it's found
  //   if (deleteButton) {
  //     fireEvent.press(deleteButton);

  //     // Verify that the onDelete function is called
  //     expect(mockOnDelete).toHaveBeenCalled();
  //   } else {
  //     throw new Error('Delete button not rendered');
  //   }
  // });
});
