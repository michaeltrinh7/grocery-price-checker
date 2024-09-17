import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TouchableText from './TouchableText'; // Adjust the import path as needed

describe('TouchableText', () => {
  it('renders correctly with given text', () => {
    const { getByText } = render(<TouchableText text='Click me' />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('applies default styles', () => {
    const { getByText } = render(<TouchableText text='Styled Text' />);
    const textElement = getByText('Styled Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: '#fff',
          fontSize: 18,
        }),
      ])
    );
  });

  it('applies custom style prop', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(
      <TouchableText
        text='Custom Style'
        style={customStyle}
      />
    );
    const textElement = getByText('Custom Style');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TouchableText
        text='Pressable'
        onPress={onPressMock}
      />
    );
    const touchableElement = getByText('Pressable').parent;

    fireEvent.press(touchableElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not throw error when pressed without onPress prop', () => {
    const { getByText } = render(<TouchableText text='No Handler' />);
    const touchableElement = getByText('No Handler').parent;

    expect(() => fireEvent.press(touchableElement)).not.toThrow();
  });
});
