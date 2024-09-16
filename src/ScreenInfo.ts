import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenName{
    Home = 'Home',
    GroceryItemList = 'Grocery Item List',
    GroceryItemModal = 'Item'
}


export type ScreenParamList = {
    [ScreenName.Home]: undefined;
    [ScreenName.GroceryItemList]:{ itemId: number, itemName?: string };
    [ScreenName.GroceryItemModal]:{itemId: number, itemName: string | undefined, screenTitle?: string };
  };
  
  
  export type NavigationProps<T extends keyof ScreenParamList> = NativeStackScreenProps<ScreenParamList, T>;