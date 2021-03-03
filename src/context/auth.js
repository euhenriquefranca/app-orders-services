import React, { useState, createContext, useEffect } from 'react';
import config from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [update, setUpdate] = useState([]);
  const [list_order, setOrder] = useState([]);
  const [new_os, setNew] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signIn(email, password) {
    await axios
      .post(`${config.API_URL}/authenticate`, {
        email,
        password,
      })
      .then(res => {
        setUser(res.data);
        storageUser(res.data);
        console.log(res.data);
      });
  }

  async function signUp(email, password, username) {
    await axios
      .post(`${config.API_URL}/register`, {
        username,
        email,
        password,
      })
      .then(res => {
        setUser(res.data);
        storageUser(res.data);
        console.log(res.data);
      });
    // .catch(error => {
    //   alert(error.code);
    // });
    //   // let uid = value.user.uid;
    //   console.log(value, 'Value');
    //   // await AsyncStorage.setItem('users', uid);
    //   setUser(value);
    // });
    // .then(() => {
    //   let data = {
    //     uid: uid,
    //     username: username,
    //     email: value.user.email,
    //   };
    // });
  }
  async function storageUser(res) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(res));
  }
  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function clientList() {
    await axios
      .get(`${config.API_URL}/clients`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(res => {
        setClients(res.data ? res.data : setLoading(true));
        setNew(false);
        console.log(update, 'list clients');
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function updateClient(id, data) {
    const url = `${config.API_URL}/clients/${id}`;
    await axios
      .put(url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(res => {
        console.log('atulizado com sucesso', data);
        setUpdate(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    return update;
  }

  async function createClient(user) {
    const url = `${config.API_URL}/clients`;
    await axios
      .post(url, user, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(res => {
        console.log('criado com sucesso', res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async function deleteClient(id) {
    const url = `${config.API_URL}/clients/${id}`;
    await axios
      .delete(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(response => {
        console.log(response, 'response');
      });
    clientList();
  }
  async function listOrder() {
    const url = `${config.API_URL}/order_of_services`;
    await axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(response => {
        setOrder(response.data);
        setNew(true);
        console.log(response, 'response');
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        clients,
        update,
        list_order,
        new_os,
        setLoading,
        signUp,
        signIn,
        signOut,
        clientList,
        updateClient,
        createClient,
        deleteClient,
        listOrder,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
