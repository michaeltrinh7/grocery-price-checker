import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ButtonIcon from './src/components/Touchable/TouchableIcon';
import { createStackNavigator } from '@react-navigation/stack';
import GroceryItemModal from './src/screens/GroceryItemModal';
import { NavigationProps, ScreenName, ScreenParamList } from './src/ScreenInfo';
import GroceryItemList from './src/screens/GroceryItemList/GroceryItemList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={ScreenName.GroceryItemList}
        options={({ navigation }) => ({
          headerRight: () => (
            <ButtonIcon
              onPress={() => {
                navigation.navigate(ScreenName.GroceryItemModal, {
                  itemId: 0,
                  itemName: '',
                  screenTitle: `Add new grocery item`,
                });
              }}
              renderIcon={() => (
                <Ionicons
                  name={'add'}
                  size={32}
                />
              )}
            ></ButtonIcon>
          ),
        })}
      >
        {(props) => (
          <GroceryItemList
            {...(props as unknown as NavigationProps<ScreenName.GroceryItemList>)}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Main'
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name={ScreenName.GroceryItemModal}
            options={({ route }) => ({
              title: (
                route.params as unknown as ScreenParamList[ScreenName.GroceryItemModal]
              )?.screenTitle,
              headerShown: true,
            })}
          >
            {(props) => (
              <GroceryItemModal
                {...(props as unknown as NavigationProps<ScreenName.GroceryItemModal>)}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
