import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { set } from 'react-native-reanimated';
import Header from '../../components/Header';
import { AuthContext } from '../../context/auth';
import { Container, Background, Nome, Form } from './styles';

export default function NewOS({ route, navigation }) {
  const { createOrder } = useContext(AuthContext);

  const [user, setUser] = useState(route.params ? route.params : {});

  const onSubmitForm = async () => {
    // if (user.id) {
    //   await updateClient(user.id, user);
    //   setUser({ ...update });
    //   console.log(clients, 'clients');
    //   navigation.goBack();
    // } else {
    await createOrder(
      user,
      user.id,
    );
    navigation.goBack();
    // }
    console.log(user, 'user');
  };

  const onChangeText = key => value => setUser({ ...user, [key]: value });

  return (
    <Background>
      {/* // <Container><Nome>Cadastro de Clientes</Nome></Container> */}
      <Form>
        <ScrollView>
          <KeyboardAvoidingView style={style.container} behavior="padding">
            <View style={style.form}>
              <Text>Número da OS</Text>
              <TextInput
                style={style.input}
                onChangeText={onChangeText('os_number')}
                placeholder="Informe a OS"
                value={user.os_number}
              />
              <Text>Motivo do chamado</Text>
              <TextInput
                style={style.input}
                onChangeText={onChangeText('reason_called')}
                placeholder="Informe o motivo"
                value={user.reason_called}
              />
              <Text>Mensagem</Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={style.input_menssage}
                onChangeText={onChangeText('message')}
                placeholder="Digite aqui"
                value={user.message}
              />

              <Text>Local de atuação</Text>
              <TextInput
                style={style.input}
                onChangeText={onChangeText('place_of_performance')}
                placeholder="Digite aqui"
                value={user.place_of_performance}
              />

              <Button title="Salvar" onPress={onSubmitForm} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Form>
    </Background>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  input_menssage: {
    height: 90,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});
