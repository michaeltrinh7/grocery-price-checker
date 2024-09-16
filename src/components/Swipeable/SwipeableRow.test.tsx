import { Text } from 'react-native';
import React, { fireEvent, render } from '@testing-library/react-native';
import SwipeableRow from './SwipeableRow';
import { DataItem } from '../../types/DataItem';

describe('SwipeableRow component', () => {
  const mockItem: DataItem = { id: 1, name: 'Test Item' };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnSwipeOpen = jest.fn();
  const renderRowItem = (item: DataItem) => <Text>{item.name}</Text>;

  const defaultProps = {
    item: mockItem,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onSwipeOpen: mockOnSwipeOpen,
    renderRowItem: renderRowItem,
    rowItemHeight: 70,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SwipeableRow {...defaultProps} />);
    expect(getByText('Test Item')).toBeTruthy();
  });

  it('calls onSwipeOpen when swipeable row is opened', () => {
    const { getByTestId } = render(<SwipeableRow {...defaultProps} />);
    const swipeable = getByTestId('swipeable-row');
    fireEvent(swipeable, 'onSwipeableWillOpen');
    expect(mockOnSwipeOpen).toHaveBeenCalledTimes(1);
  });

  // it('renders edit and delete actions on swipe', () => {
  //   const { getByText } = render(<SwipeableRow {...defaultProps} />);
  //   // Simulate onSwipeableWillOpen to show the right actions
  //   //fireEvent(getByText('Test Item'), 'onSwipeableWillOpen');

  //   // Check that the edit and delete buttons are rendered after swipe
  //   expect(getByText('Edit')).toBeTruthy();
  //   expect(getByText('Delete')).toBeTruthy();
  // });

  it('does not render edit and delete actions initially', () => {
    const { queryByText } = render(<SwipeableRow {...defaultProps} />);

    // Initially, the Edit and Delete buttons should not be in the DOM
    expect(queryByText('Edit')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
  });
});
