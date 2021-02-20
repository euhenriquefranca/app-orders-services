import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

export default function GetUserItem({ data }) {
  const navigation = useNavigation();

  const navigationToForm = (data = null) => () =>
    navigation.navigate('ClientForm', data);
  console.log(data, 'dataaa');

  const confirmUserDelete = data => () => {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress: () => dispatch({ type: TYPES.DELETE_USER, payload: data }),
      },
      { text: 'Não' },
    ]);
  };

  return (
    <Container>
      <ListItem bottomDivider key={data.id} onPress={navigationToForm}>
        <ListItem.Content style={style.listItemContent}>
          <View>
            <ListItem.Title>{data.client_name}</ListItem.Title>
            <ListItem.Subtitle>{data.email}</ListItem.Subtitle>
          </View>

          <View style={style.listItemButtons}>
            <Button
              type="clear"
              icon={<Icon name="edit" color="orange" />}
              onPress={navigationToForm(data)}
            />
            <Button
              type="clear"
              icon={<Icon name="delete" color="red" />}
              // onPress={confirmUserDelete(item)}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    </Container>
  );
}

const style = StyleSheet.create({
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemButtons: {
    flexDirection: 'row',
  },
});