import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SwipeableListHeader from './SwipeableListHeader';

describe('SwipeableListHeader component', () => {
  const mockOnChangeFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByPlaceholderText } = render(
      <SwipeableListHeader onChangeFilter={mockOnChangeFilter} />
    );

    // Check if the placeholder text is present
    expect(getByPlaceholderText('Filter grocery items')).toBeTruthy();
  });

  it('should call onChangeFilter with correct value when input changes', () => {
    const { getByPlaceholderText } = render(
      <SwipeableListHeader onChangeFilter={mockOnChangeFilter} />
    );

    // Find the TextInput element
    const input = getByPlaceholderText('Filter grocery items');

    // Simulate input change
    fireEvent.changeText(input, 'New filter text');

    // Verify that onChangeFilter is called with the correct value
    expect(mockOnChangeFilter).toHaveBeenCalledWith('New filter text');
  });

  it('should update the filter state when input changes', () => {
    const { getByPlaceholderText } = render(
      <SwipeableListHeader onChangeFilter={mockOnChangeFilter} />
    );

    // Find the TextInput element
    const input = getByPlaceholderText('Filter grocery items');

    // Simulate input change
    fireEvent.changeText(input, 'Updated filter text');

    // Verify the input value has changed
    expect(input.props.value).toBe('Updated filter text');
  });
});
