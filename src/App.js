import 'react-native-gesture-handler';
// import React from 'react';
// import { StatusBar, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthProvider from './context/auth';

// import Routes from './routes';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import UserList from './views/UserList';
// // import UserForm from './views/UserForm';
// // import OrderOfService from './views/OrderOfService';
// // import OrderForm from './views/OrderForm';
// // import { Button, Icon } from 'react-native-elements';
// // import { UsersProvider } from './context/UsersContext';

// // const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthProvider>
//         <StatusBar backgroundColor="#131313" barStyle="light-content" />
//         <Routes />
//       </AuthProvider>
//     </NavigationContainer>

//     // <UsersProvider>
//     //   <NavigationContainer>
//     //     <Stack.Navigator
//     //       initialRouteName="UserList"
//     //       screenOptions={screenOptions}>
//     //       <Stack.Screen
//     //         name="UserList"
//     //         component={UserList}
//     //         options={({ navigation }) => ({
//     //           title: 'Lista de Clientes',
//     //           headerRight: () => (
//     //             <Button
//     //               onPress={() => navigation.navigate('UserForm')}
//     //               type="clear"
//     //               icon={<Icon name="add" size={25} color="white" />}
//     //             />
//     //           ),
//     //         })}
//     //       />
//     //       <Stack.Screen
//     //         name="UserForm"
//     //         component={UserForm}
//     //         options={{ title: 'Formulário de Usuários' }}
//     //       />
//     //       <Stack.Screen
//     //         name="OrderOfService"
//     //         component={OrderOfService}
//     //         options={({ navigation }) => ({
//     //           title: 'Serviços',
//     //           headerRight: () => (
//     //             <Button
//     //               onPress={() => navigation.navigate('OrderForm')}
//     //               type="clear"
//     //               icon={<Icon name="add" size={25} color="white" />}
//     //             />
//     //           ),
//     //         })}
//     //       />
//     //       <Stack.Screen
//     //         name="OrderForm"
//     //         component={OrderForm}
//     //         options={{ title: 'Novo Serviço' }}
//     //       />
//     //     </Stack.Navigator>
//     //   </NavigationContainer>
//     // </UsersProvider>
//   );
// }

// const screenOptions = {
//   headerStyle: {
//     backgroundColor: '#f4511e',
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// };

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import AuthProvider from './context/auth';

import Routes from './routes/index';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
