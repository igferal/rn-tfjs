import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../screens/Landing';

import Tensor from '../screens/Tensor';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tensor"
          options={{headerShown: false}}
          component={Tensor}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
