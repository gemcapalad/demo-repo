import DetailsScreen, { DetailsScreenProps } from '../screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen'; // Ensure you have this import

type RootStackParamList = {
  Home: undefined;
  Details: DetailsScreenProps;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={(DetailsScreen as unknown) as React.ComponentType<StackScreenProps<RootStackParamList, "Details">>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}