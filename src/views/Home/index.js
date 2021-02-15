import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';

import { AuthContext } from '../../context/auth';

export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  console.log(user, 'user');
  let user_storage = AsyncStorage.getItem('user');

  return (
    <View>
      <Text>Home</Text>
      <Text>{user && <Text>{user_storage.username}</Text>}</Text>
      <Button title="Sair da Conta" onPress={() => signOut()} />
    </View>
  );
}
