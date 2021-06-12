import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Icon } from 'react-native-elements';
import GetUserItem from '../../components/CustomerList';

import Header from '../../components/Header';
import { AuthContext } from '../../context/auth';
import { Nome, Background, Container, List, ButtonAdd } from './styles';

export default function DetailOs({ navigation }) {
  const { detailOs } = useContext(AuthContext);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>Detalhes da OS</Nome>
        <ButtonAdd onPress={() => navigation.navigate('NewOS')}>
          <Icon name="add" size={30} color="white" />
        </ButtonAdd>
      </Container>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={detailOs}
        renderItem={({ item }) => <GetUserItem data={item} />}
      />
    </Background>
  );
}
