import React from 'react';
import Header from '../../components/Header';
import { Nome, Background, Container, List } from './styles';

export default function MyOS() {
  return (
    <Background>
      <Header />
      <Container>
        <Nome>Minhas OS</Nome>
      </Container>
      <List />
    </Background>
  );
}
