import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'react-native-elements';

import Home from '../views/Home';
import Profile from '../views/Profile';
import ClientList from '../views/ClientList';
import ClientForm from '../views/ClientForm';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Drawer() {
  return (
    <AppDrawer.Navigator
      drawerStyle={{ backgroundColor: '#171717' }}
      drawerContentOptions={{
        labelStyle: {
          fontWeight: 'bold',
        },
        activeTintColor: '#FFF',
        activeBackgroundColor: '#f0821d',
        inactiveBackgroundColor: '#000',
        inactiveTintColor: '#DDD',
        itemStyle: {
          marginVertical: 5,
        },
      }}>
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Perfil" component={Profile} />
      <AppDrawer.Screen name="Lista de Clientes" component={ClientList} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClientList"
        component={ClientList}
        options={({ navigation }) => ({
          title: 'Lista de Usuários',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ClientForm')}
              type="clear"
              icon={<Icon name="add" size={25} color="white" />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ClientForm"
        component={ClientForm}
        options={{
          title: 'Formulário de Clientes',
          headerStyle: { backgroundColor: '#131313' },
        }}
      />
    </Stack.Navigator>
  );
};
const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
