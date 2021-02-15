import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../views/Home';
const AuthStack = createStackNavigator();

function AppRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
}

export default AppRoutes;
