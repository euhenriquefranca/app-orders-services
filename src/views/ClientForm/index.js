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
// import UsersContext, { TYPES } from '../context/UsersContext';
import { AuthContext } from '../../context/auth';
import { Container, Background, Nome, Form } from './styles';

export default function ClientForm({ route, navigation }) {
  // const { dispatch } = useContext(UsersContext);
  const { clients, updateClient, update, createClient } = useContext(
    AuthContext
  );

  const [user, setUser] = useState(route.params ? route.params : {});

  const onSubmitForm = async () => {
    if (user.id) {
      let obj = {
        customer: {
          customer_name: user.customer_name,
          document: user.document,
          email: user.email,
          phone: user.phone,
        },
      };
      await updateClient(user.id, obj);
      setUser({ ...update });
      navigation.goBack();
    } else {
      let objCustomer = {
        customer: {
          customer_name: user.customer_name,
          document: user.document,
          customer_type: 1,
          email: user.email,
          phone: user.phone,
        },
      };
      await createClient(objCustomer);
      navigation.goBack();
    }
  };

  const onChangeText = key => value => setUser({ ...user, [key]: value });

  return (
    <Background>
      {/* // <Container><Nome>Cadastro de Clientes</Nome></Container> */}
      <Form>
        <ScrollView>
          <KeyboardAvoidingView style={style.container} behavior="padding">
            <View style={style.form}>
              <Text>Name</Text>
              <TextInput
                style={style.input}
                onChangeText={onChangeText('customer_name')}
                placeholder="Informe o nome"
                value={user.customer_name}
              />
              <Text>CNPJ</Text>
              <TextInput
                style={style.input}
                onChangeText={onChangeText('document')}
                placeholder="Informe o CNPJ"
                value={user.document}
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
});
