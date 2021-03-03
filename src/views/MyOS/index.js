import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import GetUserItem from '../../components/CustomerList';

import Header from '../../components/Header';
import { AuthContext } from '../../context/auth';
import { Nome, Background, Container, List, ButtonAdd } from './styles';

export default function MyOS({ navigation }) {
  const { listOrder, list_order } = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    listOrder();
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);
  return (
    <Background>
      <Header />
      <Container>
        <Nome>Minhas OS</Nome>
        <ButtonAdd onPress={() => navigation.navigate('NewOS')}>
          <Icon name="add" size={30} color="white" />
        </ButtonAdd>
      </Container>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={list_order}
        renderItem={({ item }) => <GetUserItem data={item} />}
      />
    </Background>
  );
}
