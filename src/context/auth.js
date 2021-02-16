import React, { useState, createContext, useEffect } from 'react';
import Api from '../services/Api';
import config from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
