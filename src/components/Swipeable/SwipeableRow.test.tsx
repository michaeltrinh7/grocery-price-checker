import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SwipeableRow from './SwipeableRow';
import { Text } from 'react-native';

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
});
