import React, { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('<HomeScreen />', () => {
  test('renders correctly texts', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Welcome!');
  });
});
