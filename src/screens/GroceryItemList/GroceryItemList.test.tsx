import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GroceryItemList from './GroceryItemList';
import { NavigationProps, ScreenName } from '../../ScreenInfo';
import { GroceryDataRow } from '../GroceryItemRow';

jest.mock('../../db/GroceryItem', () => ({
  getAllGroceryItems: jest.fn(),
}));

jest.mock('../../db', () => {
  const finalizeSyncMock = jest.fn(); // Mock the finalizeSync function

  return {
    db: {
      prepareSync: jest.fn().mockReturnValue({
        finalizeSync: finalizeSyncMock, // Return the mock function as part of the prepared statement
        executeSync: jest.fn(),
      }),
    },
    updateGroceryItem: jest.fn(),
  };
});

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
});
