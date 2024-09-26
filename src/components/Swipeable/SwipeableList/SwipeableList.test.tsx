import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SwipeableList from './SwipeableList';
import { Text } from 'react-native';

// Mock SwipeableRow to avoid real rendering
jest.mock('../SwipeableRow/SwipeableRow', () => jest.fn(() => null));

// Mock SwipeableListHeader
jest.mock('../SwipeableListHeader', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native'); // Import View inside the mock factory
  // eslint-disable-next-line react/display-name
  return () => <View testID='FlatList.ListHeaderComponent' />;
});

// Mock the SwipeableRow component to simplify the test
jest.mock('../SwipeableRow/SwipeableRow', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ item, renderRowItem, onEdit, onDelete }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity>
        {/* Render the row item */}
        {renderRowItem(item)}
        <TouchableOpacity onPress={onEdit}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
}));

// Mock the SwipeableListHeader component to simplify the test
jest.mock('../SwipeableListHeader', () => ({
  __esModule: true,
  default: ({ onChangeFilter }: never) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { TouchableOpacity, Text, TextInput } = require('react-native');
    return (
      <TouchableOpacity>
        <Text>Header</Text>
        <TextInput
          testID='filter-input'
          placeholder='Filter'
          onChangeText={onChangeFilter}
        />
      </TouchableOpacity>
    );
  },
}));

describe('SwipeableList', () => {
  const handleItemEdit = jest.fn();
  const handleItemDelete = jest.fn();
  const handleFilterChange = jest.fn();
  const renderRowItem = jest.fn((item) => <Text>{item.name}</Text>);
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  const rowItemHeight = 50;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders each item using renderRowItem', () => {
    render(
      <SwipeableList
        handleItemEdit={handleItemEdit}
        handleItemDelete={handleItemDelete}
        handleFilterChange={handleFilterChange}
        items={mockItems}
        renderRowItem={renderRowItem}
        rowItemHeight={rowItemHeight}
      />
    );

    // Verify renderRowItem was called for each item
    mockItems.forEach((item) => {
      expect(renderRowItem).toHaveBeenCalledWith(item);
    });
  });

  it('renders the correct number of items', () => {
    const { getAllByText } = render(
      <SwipeableList
        handleItemEdit={handleItemEdit}
        handleItemDelete={handleItemDelete}
        handleFilterChange={handleFilterChange}
        items={mockItems}
        renderRowItem={renderRowItem}
        rowItemHeight={rowItemHeight}
      />
    );

    // Verify the correct number of list items were rendered
    expect(getAllByText(/Item/)).toHaveLength(mockItems.length);
  });

  it('renders the ListHeaderComponent and calls handleFilterChange when input changes', () => {
    const { getByTestId } = render(
      <SwipeableList
        handleItemEdit={handleItemEdit}
        handleItemDelete={handleItemDelete}
        handleFilterChange={handleFilterChange}
        items={mockItems}
        renderRowItem={renderRowItem}
        rowItemHeight={rowItemHeight}
      />
    );

    // Find the filter input using testID and simulate text change
    const filterInput = getByTestId('filter-input');
    fireEvent.changeText(filterInput, 'test filter');

    // Verify handleFilterChange was called with the correct input
    expect(handleFilterChange).toHaveBeenCalledWith('test filter');
  });

  it('calls handleItemEdit when the Edit button is pressed', () => {
    const { getAllByText } = render(
      <SwipeableList
        handleItemEdit={handleItemEdit}
        handleItemDelete={handleItemDelete}
        handleFilterChange={handleFilterChange}
        items={mockItems}
        renderRowItem={renderRowItem}
        rowItemHeight={rowItemHeight}
      />
    );

    // Press the Edit button for the first item
    fireEvent.press(getAllByText('Edit')[0]);

    // Verify handleItemEdit was called with the correct item
    expect(handleItemEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls handleItemDelete when the Delete button is pressed', () => {
    const { getAllByText } = render(
      <SwipeableList
        handleItemEdit={handleItemEdit}
        handleItemDelete={handleItemDelete}
        handleFilterChange={handleFilterChange}
        items={mockItems}
        renderRowItem={renderRowItem}
        rowItemHeight={rowItemHeight}
      />
    );

    // Press the Delete button for the first item
    fireEvent.press(getAllByText('Delete')[0]);

    // Verify handleItemDelete was called with the correct item ID
    expect(handleItemDelete).toHaveBeenCalledWith(mockItems[0].id);
  });
});
