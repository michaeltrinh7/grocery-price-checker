import {
  StyleProp,
  TextInput,
  TextStyle,
  StyleSheet,
  Text,
} from 'react-native';
import {
  useController,
  FieldValues,
  RegisterOptions,
  FieldErrors,
  get,
  Control,
} from 'react-hook-form';
import React from 'react';

interface FormTextInputProps<TFieldErrors> {
  name: string;
  label: string;
  placeholder?: string | undefined;
  value?: string;
  clearErrors: (name: string) => void;
  errors: TFieldErrors;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  //[key: string]: any;
  style: StyleProp<TextStyle> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const FormTextInput = <TFieldErrors extends FieldErrors>(
  props: FormTextInputProps<TFieldErrors>
) => {
  const {
    field,
    //fieldState: { invalid, isTouched, isDirty },
    //formState: { touchedFields, dirtyFields },
  } = useController({
    name: props.name,
    control: props.control as unknown as Control<FieldValues>,
    rules: props.rules,
  });

  const error = get(props.errors, props.name);

  return (
    <>
      <Text style={[styles.label, error ? styles.textError : {}]}>
        {props.label}
      </Text>
      <TextInput
        {...props}
        style={[props.style, error ? styles.inputError : {}]}
        ref={field.ref}
        value={field.value}
        onChangeText={(text) => {
          if (error) props.clearErrors(props.name);

          field.onChange(text);
        }}
        onBlur={field.onBlur}
      />
      {error && <Text style={styles.textError}>{error.message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  labelError: {
    color: 'red',
  },
  textError: {
    color: 'red',
  },
  inputError: {
    borderColor: 'red',
  },
});

export default FormTextInput;
