import React, { render } from '@testing-library/react-native';
import GroceryItemRow, { GroceryDataRow } from './GroceryItemRow';

describe('GroceryItemRow component', () => {
  test('renders correctly texts', () => {
    const item: GroceryDataRow = {
      id: 1,
      name: "D'Artagnan",
      when: '3:11 PM',
      message: 'Unus pro omnibus',
    };
    const { getByText } = render(<GroceryItemRow item={item} />);
    expect(getByText(/D'Artagnan/i)).toBeTruthy();
    expect(getByText(/3:11 PM/i)).toBeTruthy();
    expect(getByText(/Unus pro omnibus/i)).toBeTruthy();
  });
});
