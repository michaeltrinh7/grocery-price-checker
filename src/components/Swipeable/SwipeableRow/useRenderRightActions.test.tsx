import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Animated, I18nManager } from 'react-native';
import { useRenderRightActions } from './useRenderRightActions';

// Mock necessary native modules
jest.mock('react-native-reanimated', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('react-native-reanimated/mock')
);
// jest.mock('react-native-gesture-handler', () => ({
//   RectButton: jest.fn().mockImplementation(({ children }) => children),
// }));

// Mock the `useRenderRightAction` hook to return simple JSX for testing
jest.mock('./useRenderRightAction', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RNAnimated = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { RectButton } = require('react-native-gesture-handler');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native');
  return {
    useRenderRightAction: jest.fn((text, color, x, progress, onPress) => (
      <RNAnimated.View>
        <RectButton onPress={onPress}>
          <Text>{text}</Text>
        </RectButton>
      </RNAnimated.View>
    )),
  };
});

describe('useRenderRightActions', () => {
  it('renders both Edit and Delete actions', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const progress = new Animated.Value(0); // Create an animated value for testing

    // Render the returned JSX using the hook
    const { getByText } = render(
      useRenderRightActions(progress, mockOnEdit, mockOnDelete)
    );

    // Assert that both actions are rendered with correct text
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('calls onEdit when Edit button is pressed', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const progress = new Animated.Value(0);

    const { getByText } = render(
      useRenderRightActions(progress, mockOnEdit, mockOnDelete)
    );

    // Trigger Edit button press
    fireEvent.press(getByText('Edit'));

    // Assert that the onEdit function is called
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('calls onDelete when Delete button is pressed', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const progress = new Animated.Value(0);

    const { getByText } = render(
      useRenderRightActions(progress, mockOnEdit, mockOnDelete)
    );

    // Trigger Delete button press
    fireEvent.press(getByText('Delete'));

    // Assert that the onDelete function is called
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it('applies correct layout direction based on I18nManager settings', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const progress = new Animated.Value(0);

    // First, test for LTR layout (default)
    const { getByTestId, rerender } = render(
      useRenderRightActions(progress, mockOnEdit, mockOnDelete)
    );

    // Get the container View by testID
    const container = getByTestId('right-actions-container');

    // Check that the flexDirection is 'row' in LTR mode
    expect(container.props.style.flexDirection).toBe('row');

    // Now, mock RTL layout and re-render the component
    I18nManager.isRTL = true;  // Directly modify the isRTL property
    rerender(useRenderRightActions(progress, mockOnEdit, mockOnDelete));

    // Check that the flexDirection is 'row-reverse' in RTL mode
    expect(container.props.style.flexDirection).toBe('row-reverse');

    // Reset the isRTL value after the test
    I18nManager.isRTL = false;
  });
});
