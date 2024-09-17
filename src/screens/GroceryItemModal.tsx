import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { NavigationProps, ScreenName } from '../ScreenInfo';
import FormTextInput from '../components/FormTextInput';
import TouchableText from '../components/Touchable/TouchableText';

export type FormInputs = {
  groceryName: string;
};
export default function GroceryItemModal({
  route,
  navigation,
}: NavigationProps<ScreenName.GroceryItemModal>) {
  const { itemId, itemName } = route.params;

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: {
      groceryName: itemName,
    },
  });

  const submit = (data: FormInputs) => {
    navigation.navigate({
      name: ScreenName.GroceryItemList,
      params: { itemId, itemName: data.groceryName },
      merge: true,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormTextInput
          control={control}
          name='groceryName'
          clearErrors={() => clearErrors('groceryName')}
          errors={errors}
          label='Grocery item name'
          style={styles.input}
          placeholder='Enter grocery item name'
          rules={{
            required: 'The name is required',
            minLength: {
              value: 3,
              message: 'The name must have at least 3 characters',
            },
            maxLength: {
              value: 50,
              message: 'The name must have maximum 50 characters',
            },
          }}
        />
        <TouchableText
          onPress={handleSubmit(submit)}
          text='Save'
        />
      </View>
    </View>
  );
}

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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  textError: {
    color: 'red',
  },
});
