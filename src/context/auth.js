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
  const [detailOs, setDetailOs] = useState([]);
  const [access, setAccess] = useState('');

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');
      JSON.parse(storageUser);
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
      .post(`${config.API_URL}/auth/login`, {
        email,
        password,
      })
      .then(res => {
        setUser(res.data);
        storageUser(res.data);
        console.log('[******]', res.data);
      })
      .catch(error => console.log(error));
  }

  async function signUp(data) {
    await axios.post(`${config.API_URL}/users/new`, data).then(res => {
      setUser(res.data);
      storageUser(res.data);
      console.log(res.data);
    });
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
      .get(`${config.API_URL}/company/customers/list`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      })
      .then(res => {
        setClients(res.data);
        setNew(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function createClient(customers) {
    const url = `${config.API_URL}/company/customers/new`;
    await axios
      .post(url, customers, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      })
      .then(res => {
        console.log('criado com sucesso', res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function updateClient(id, data) {
    const url = `${config.API_URL}/company/customers/${id}/update`;
    await axios
      .put(url, data)
      .then(res => {
        console.log('atulizado com sucesso', data);
        setUpdate(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    return update;
  }

  async function deleteClient(id) {
    const url = `${config.API_URL}/company/customers/${id}/delete`;
    await axios
      .delete(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
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
      });
  }

  async function detailOrder(id) {
    const url = `${config.API_URL}/order_of_services/${id}`;
    await axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(response => {
        setDetailOs(response.data);
        console.log(response.data, 'Estou vendo os detalhes');
        setNew(true);
      });
  }
  async function createOrder(os, id) {
    const url = `${config.API_URL}/customers/orders/new`;
    await axios
      .post(url, os, id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(response => {
        console.log(response.data, 'creating...');
        setNew(true);
      })
      .catch(error => {
        console.log(error);
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
        detailOs,
        setLoading,
        signUp,
        signIn,
        signOut,
        clientList,
        updateClient,
        createClient,
        deleteClient,
        listOrder,
        detailOrder,
        createOrder,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
