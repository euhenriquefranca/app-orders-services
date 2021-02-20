import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import Header from '../../components/Header';
// import UsersContext, { TYPES } from '../context/UsersContext';
import { AuthContext } from '../../context/auth';
import { Container, Background, Nome, Form } from './styles';

export default function ClientForm({ route, navigation }) {
  // const { dispatch } = useContext(UsersContext);
  const { clients } = useContext(AuthContext);

  const [user, setUser] = useState(route.params ? route.params : {});

  const onSubmitForm = () => {
    dispatch({
      type: user.id ? TYPES.UPDATE_USER : TYPES.CREATE_USER,
      payload: user,
    });
    navigation.goBack();
  };

  const onChangeText = key => value => setUser({ ...user, [key]: value });

  return (
    <Background>
      <Container>{/* <Nome>Cadastro de Clientes</Nome> */}</Container>
      <Form>
        <View style={style.form}>
          <Text>Name</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeText('client_name')}
            placeholder="Informe o nome"
            value={user.client_name}
          />
          <Text>CNPJ</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeText('cnpj')}
            placeholder="Informe o CNPJ"
            value={user.cnpj}
          />

          <Text>Email</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeText('email')}
            placeholder="Informe o email"
            value={user.email}
          />
          <Text>Phone</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeText('phone')}
            placeholder="Informe o Phone"
            value={user.phone}
          />
          <Text>Type</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeText('type_client')}
            placeholder="Informe o Type"
            value={user.type_client}
          />

          <Button title="Salvar" onPress={onSubmitForm} />
        </View>
      </Form>
    </Background>
  );
}

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});
