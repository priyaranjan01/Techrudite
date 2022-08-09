import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
            title: 'Login',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#485199',
            },
          }}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            title: 'Home',
            // headerTintColor: '#fff',
            // headerStyle: {
            //   backgroundColor: '#485199',
            // },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
