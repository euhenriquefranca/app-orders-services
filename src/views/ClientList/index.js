import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
// import UsersContext from '../../context/UsersContext';
import { AuthContext } from '../../context/auth';
import GetUserItem from '../../components/CustomerList';
import Header from '../../components/Header';
import { Container, Background, Nome, List, ButtonAdd } from './styles';
// import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function ClientList({ navigation }) {
  const { state, clients, clientList, deleteClient } = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    clientList();
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);
  return (
    <Background>
      <Header />
      <Container>
        <Nome>Lista de Clientes</Nome>
        <ButtonAdd
          onPress={() => navigation.navigate('ClientForm')}
          // type="clear"
        >
          <Icon name="add" size={30} color="white" />
        </ButtonAdd>
      </Container>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={clients}
        renderItem={({ item }) => <GetUserItem data={item} />}
      />
    </Background>
  );
}
