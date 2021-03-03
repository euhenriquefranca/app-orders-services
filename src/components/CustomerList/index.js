import React, { useContext } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';

import { Container } from './styles';

export default function GetUserItem({ data }) {
  const { deleteClient, new_os } = useContext(AuthContext);
  const navigation = useNavigation();

  const navigationToForm = (data = null) => () =>
    new_os == true
      ? navigation.navigate('NewOS', data)
      : navigation.navigate('ClientForm', data);

  const confirmUserDelete = data => () => {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress: () => deleteClient(data.id ? data.id : data.os_number),
      },
      { text: 'Não' },
    ]);
  };

  return (
    <Container>
      <ListItem
        bottomDivider
        key={data.id ? data.id : data.os_number}
        onPress={navigationToForm}>
        <ListItem.Content style={style.listItemContent}>
          <View>
            <ListItem.Title>
              {data.client_name ? data.client_name : data.reason_called}
            </ListItem.Title>
            <ListItem.Subtitle>
              {data.email ? data.email : data.message}
            </ListItem.Subtitle>
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
              onPress={confirmUserDelete(data)}
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
