import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, View, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import UsersContext, { TYPES } from '../context/UsersContext';

export default ({ navigation }) => {
  const { state, movie, dispatch } = useContext(UsersContext);

  const navigationToForm = (item = null) => () =>
    navigation.navigate('UserForm', item);

  const confirmUserDelete = item => () => {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress: () => dispatch({ type: TYPES.DELETE_USER, payload: item }),
      },
      { text: 'Não' },
    ]);
  };

  const getUserItem = ({ item }) => (
    <ListItem bottomDivider key={item.id} onPress={navigationToForm}>
      {/* <Avatar source={{ uri: item.backdrop_path }} /> */}
      <ListItem.Content style={style.listItemContent}>
        <View>
          <ListItem.Title>{item.client_name}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </View>

        <View style={style.listItemButtons}>
          <Button
            type="clear"
            icon={<Icon name="edit" color="orange" />}
            onPress={navigationToForm(item)}
          />
          <Button
            type="clear"
            icon={<Icon name="delete" color="red" />}
            onPress={confirmUserDelete(item)}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={movie}
        renderItem={getUserItem}
      />
    </View>
  );
};

const style = StyleSheet.create({
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemButtons: {
    flexDirection: 'row',
  },
});
