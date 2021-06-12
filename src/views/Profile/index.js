import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

import { AuthContext } from '../../context/auth';

import {
  Container,
  Nome,
  NewLink,
  NewText,
  Logout,
  LogoutText,
} from './styles';

export default function Profile() {
  const navigation = useNavigation();

  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <Header />
      <Nome>{user && user.nome}</Nome>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
