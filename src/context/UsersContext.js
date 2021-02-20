import React, { createContext, useReducer, useState, useEffect } from 'react';
// import movie from '../data/users';
// import faker from 'faker/locale/pt_BR';
import axios from 'axios';
import config from '../../config';
import Api from '../services/Api';

const UsersContext = createContext({});
// const INITIAL_STATE = { movie };

// export const TYPES = {
//   DELETE_USER: 'DELETE_USER',
//   CREATE_USER: 'CREATE_USER',
//   CREATE_CLIENT: 'CREATE_CLIENT',
//   UPDATE_USER: 'UPDATE_USER',
// };

// const actions = {
//   [TYPES.DELETE_USER](state, action) {
//     const { id } = action.payload;

//     axios
//       .get(`${API_KEY}`)
//       .then(function (res) {
//         console.log(res);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     return {
//       ...state,
//       users: state.users.filter(user => user.id !== id),
//     };
//   },
//   // [TYPES.CREATE_USER](state, action) {
//   //   const user = action.payload;
//   //   user.id = faker.random.number();

//   //   return {
//   //     ...state,
//   //     users: [...state.users, user],
//   //   };
//   // },

//   [TYPES.UPDATE_USER](state, action) {
//     const updated = action.payload;

//     return {
//       ...state,
//       users: state.users.map(u => (u.id === updated.id ? updated : u)),
//     };
//   },
// };
// const [client_name, setName] = useState('')
// const [cnpj, setCnpj ] = useState('')
// const [type_client, setType] = useState('')
// const [email, setEmail ] = useState('')
// const [phone, setPhone] = useState('')

// export default () => {
//   const create_client = async () => {
//     let res = Api.createClient(client_name, cnpj, type_client, email, phone)
//     return {
//       ...state,
//       users: [...state.users, res]
//     }
//   },
// }

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
