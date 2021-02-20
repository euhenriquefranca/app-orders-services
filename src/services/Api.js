//
import axios from 'axios';
import config from '../../config';

export default {
  createUser: () => {
    var data = JSON.stringify({
      username,
      email,
      password,
    });
    axios
      .post(`${config.API_URL}/register`, {
        data: data,
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  },

  createClient: () => {
    axios.post(`${config.API_URL}/clients`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_TOKEN}`,
      },
      body: JSON.stringify({
        client_name,
        cnpj,
        type_client,
        email,
        phone,
      }),
    });
  },
};
