import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import GroceryItemList from './GroceryItemList';
import { NavigationProps, ScreenName } from '../ScreenInfo';
import { GroceryDataRow } from './GroceryItemRow';

// Define mock data
const mockData: GroceryDataRow[] = [
  { id: 1, name: 'Item 1', when: '', message: '' },
  { id: 2, name: 'Item 2', when: '', message: '' },
];

describe('GroceryItemList', () => {
  const mockNavigate = jest.fn();
  const mockSetParams = jest.fn();

  const route = {
    params: {
      itemId: 0,
      itemName: '',
    },
  } as unknown as NavigationProps<ScreenName.GroceryItemList>['route'];

  const navigation = {
    navigate: mockNavigate,
    setParams: mockSetParams,
  } as unknown as NavigationProps<ScreenName.GroceryItemList>['navigation'];

  const defaultProps = {
    route: route,
    navigation: navigation,
    items: mockData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render items correctly', async () => {
    render(<GroceryItemList {...defaultProps} />);

    // Ensure items are rendered
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
  });

  it('should handle route params to update or add an item', async () => {
    const routeWithParams = {
      params: {
        itemId: 1,
        itemName: 'Updated Item',
      },
    } as unknown as NavigationProps<ScreenName.GroceryItemList>['route'];

    const props = {
      route: routeWithParams,
      navigation: navigation,
      items: mockData,
    };

    render(<GroceryItemList {...props} />);

    // Check if the item is updated or added
    await waitFor(() => {
      expect(screen.getByText('Updated Item')).toBeTruthy();
    });

    expect(mockSetParams).toHaveBeenCalledWith({
      itemId: 0,
      itemName: '',
    });
  });

  it('should navigate to GroceryItemModal on edit', async () => {
    render(<GroceryItemList {...defaultProps} />);

    // Simulate pressing the Edit button
    fireEvent.press(screen.getAllByText('Edit')[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ScreenName.GroceryItemModal, {
        itemId: 1,
        itemName: 'Item 1',
        screenTitle: `Edit grocery item 'Item 1'`,
      });
    });
  });

  it('should delete an item', async () => {
    render(<GroceryItemList {...defaultProps} />);

    // Simulate deleting the item
    fireEvent.press(screen.getAllByText('Delete')[0]);

    // Verify item removal
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).toBeNull();
    });
  });

  it('should filter items based on filter text', async () => {
    render(<GroceryItemList {...defaultProps} />);

    // Simulate filtering
    fireEvent.changeText(
      screen.getByPlaceholderText('Filter grocery items'),
      'Item 1'
    );

    // Check if the filtered item is displayed
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.queryByText('Item 2')).toBeNull();
    });
  });
});
