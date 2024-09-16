import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormTextInput from './FormTextInput';
import { FieldErrors } from 'react-hook-form';

// Mock the useController hook and get function
jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: '',
      ref: jest.fn(),
    },
  }),
  get: (obj: any, path: string) => {
    const pathArray = path.split('.');
    return pathArray.reduce(
      (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined),
      obj
    );
  },
}));
describe('FormTextInput', () => {
  const mockControl = {
    register: jest.fn(),
    unregister: jest.fn(),
  };

  const mockClearErrors = jest.fn();

  const defaultProps = {
    name: 'testInput',
    label: 'Test Label',
    control: mockControl,
    clearErrors: mockClearErrors,
    errors: {},
    style: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(<FormTextInput {...defaultProps} />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <FormTextInput
        {...defaultProps}
        placeholder='Enter text'
      />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('displays error message when error is present', () => {
    const { getByText } = render(
      <FormTextInput
        {...defaultProps}
        errors={
          {
            testInput: { type: 'required', message: 'Error message' },
          } as FieldErrors
        }
      />
    );
    expect(getByText('Error message')).toBeTruthy();
  });

  it('applies error styles when error is present', () => {
    const { getByText } = render(
      <FormTextInput
        {...defaultProps}
        errors={
          {
            testInput: { type: 'required', message: 'Error message' },
          } as FieldErrors
        }
      />
    );
    const label = getByText('Test Label');
    expect(label.props.style).toContainEqual(
      expect.objectContaining({ color: 'red' })
    );
  });

  it('calls clearErrors when text is entered and there was an error', () => {
    const { getByPlaceholderText } = render(
      <FormTextInput
        {...defaultProps}
        errors={
          {
            testInput: { type: 'required', message: 'Error message' },
          } as FieldErrors
        }
        placeholder='Enter text'
      />
    );
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New text');
    expect(mockClearErrors).toHaveBeenCalledWith('testInput');
  });
});
