import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { Container, ButtonMenu } from './style';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Icon name="menu" color="#FFF" size={30} />
      </ButtonMenu>
    </Container>
  );
}
