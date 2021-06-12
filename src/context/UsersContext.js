import React, { createContext, useReducer, useState, useEffect } from 'react';
// import movie from '../data/users';
// import faker from 'faker/locale/pt_BR';
import axios from 'axios';
import config from '../../config';
import Api from '../services/Api';

const UsersContext = createContext({});

export const UsersProvider = ({ children }) => {
  const [movie, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/clients`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
      })
      .then(res => {
        setClients(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [state, dispatch] = useReducer((state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  });

  return (
    <UsersContext.Provider value={{ state, dispatch, movie }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
