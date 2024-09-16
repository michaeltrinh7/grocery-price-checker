import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { NavigationProps, ScreenName } from '../ScreenInfo';
import GroceryItemModal from './GroceryItemModal';

describe('GroceryItemModal', () => {
  const mockNavigate = jest.fn();
  const route = {
    params: {
      itemId: 1,
      itemName: 'Test Item',
    },
  } as unknown as NavigationProps<ScreenName.GroceryItemModal>['route'];

  const routeWithEmptyName = {
    params: {
      itemId: 0,
      itemName: '',
    },
  } as unknown as NavigationProps<ScreenName.GroceryItemModal>['route'];

  const navigation = {
    navigate: mockNavigate,
  } as unknown as NavigationProps<ScreenName.GroceryItemModal>['navigation'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default values', () => {
    render(
      <GroceryItemModal
        route={route}
        navigation={navigation}
      />
    );

    // Check if the input and button are rendered
    expect(screen.getByPlaceholderText('Enter grocery item name')).toBeTruthy();
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('should navigate with updated item name on form submission', async () => {
    render(
      <GroceryItemModal
        route={route}
        navigation={navigation}
      />
    );

    // Simulate user input
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter grocery item name'),
      'Updated Item Name'
    );

    // Simulate form submission
    fireEvent.press(screen.getByText('Save'));

    // Wait for the navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({
        name: ScreenName.GroceryItemList,
        params: { itemId: 1, itemName: 'Updated Item Name' },
        merge: true,
      });
    });
  });

  it('should show validation errors for empty input', async () => {
    render(
      <GroceryItemModal
        route={routeWithEmptyName}
        navigation={navigation}
      />
    );

    // Simulate form submission
    fireEvent.press(screen.getByText('Save'));

    // Check if validation error messages are displayed
    await waitFor(() => {
      expect(screen.getByText('The name is required')).toBeTruthy();
    });
  });

  it('should show validation errors for input less than 3 characters', async () => {
    render(
      <GroceryItemModal
        route={route}
        navigation={navigation}
      />
    );

    // Simulate user input
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter grocery item name'),
      'ab'
    );

    // Simulate form submission
    fireEvent.press(screen.getByText('Save'));

    // Check if validation error messages are displayed
    await waitFor(() => {
      expect(
        screen.getByText('The name must have at least 3 characters')
      ).toBeTruthy();
    });
  });

  it('should show validation errors for input more than 50 characters', async () => {
    render(
      <GroceryItemModal
        route={route}
        navigation={navigation}
      />
    );

    // Simulate user input
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter grocery item name'),
      'a'.repeat(51)
    );

    // Simulate form submission
    fireEvent.press(screen.getByText('Save'));

    // Check if validation error messages are displayed
    await waitFor(() => {
      expect(
        screen.getByText('The name must have maximum 50 characters')
      ).toBeTruthy();
    });
  });
});
