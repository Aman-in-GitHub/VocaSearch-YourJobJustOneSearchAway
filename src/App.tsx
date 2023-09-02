import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './screens/HomePage';
import JobDetails from './screens/JobDetails';
import Starter from './screens/Starter';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Starter">
        <Stack.Screen
          name="Starter"
          component={Starter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'VocaSearch',
            headerStyle: {
              backgroundColor: '#0f1012',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetails}
          options={({route}) => ({
            title: route.params.product.job_title,
            headerStyle: {
              backgroundColor: '#0f1012',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
