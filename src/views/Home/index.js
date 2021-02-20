import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Header from '../../components/Header';
import { Background, Container, Nome } from './styles';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>Seja Bem-vindo!</Nome>
      </Container>
    </Background>
  );
}
