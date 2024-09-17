import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import TouchableIcon from './TouchableIcon'; // Adjust the import path as needed

describe('TouchableIcon', () => {
  // Helper function to create a mock icon
  const createMockIcon = (testID: string) => {
    function MockIcon() {
      return (
        <View testID={testID}>
          <Text>Icon</Text>
        </View>
      );
    }
    return MockIcon;
  };

  it('renders the icon correctly', () => {
    const { getByTestId } = render(
      <TouchableIcon renderIcon={createMockIcon('test-icon')} />
    );
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <TouchableIcon
        renderIcon={createMockIcon('test-icon')}
        onPress={onPressMock}
      />
    );
    const touchableElement = getByTestId('test-icon').parent;

    fireEvent.press(touchableElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not throw error when pressed without onPress prop', () => {
    const { getByTestId } = render(
      <TouchableIcon renderIcon={createMockIcon('test-icon')} />
    );
    const touchableElement = getByTestId('test-icon').parent;

    expect(() => fireEvent.press(touchableElement)).not.toThrow();
  });

  it('renders custom icon correctly', () => {
    const CustomIcon = () => (
      <View testID='custom-icon'>
        <Text>Custom</Text>
      </View>
    );
    const { getByTestId, getByText } = render(
      <TouchableIcon renderIcon={() => <CustomIcon />} />
    );

    expect(getByTestId('custom-icon')).toBeTruthy();
    expect(getByText('Custom')).toBeTruthy();
  });
});
