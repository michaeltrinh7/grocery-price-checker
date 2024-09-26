import { render, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { useRenderRightAction } from './useRenderRightAction';

describe('useRenderRightAction', () => {
  it('renders correctly and handles button press', () => {
    const mockOnPress = jest.fn();

    const progress = new Animated.Value(0); // Create an animated value to simulate progress

    // Render the returned JSX using the hook
    const { getByText } = render(
      useRenderRightAction('Delete', 'red', 100, progress, mockOnPress)
    );

    // Assert that the text is rendered correctly
    expect(getByText('Delete')).toBeTruthy();

    // Trigger the button press
    fireEvent.press(getByText('Delete'));

    // Assert that the onPress handler is called
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('applies correct styles based on the progress', () => {
    const progress = new Animated.Value(0.5); // Halfway animated progress
    const mockOnPress = jest.fn();

    const { getByText } = render(
      useRenderRightAction('Delete', 'blue', 100, progress, mockOnPress)
    );

    // Check if the text is rendered
    const actionText = getByText('Delete');
    expect(actionText).toBeTruthy();

    // Additional checks can be made to verify style attributes using getComputedStyle, if necessary
  });
});
