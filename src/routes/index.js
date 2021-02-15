import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

import AuthRoutes from './auth.routes';
import ApphRoutes from './app.routes';
import { ActivityIndicator, View } from 'react-native';

function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }
  return signed ? <ApphRoutes /> : <AuthRoutes />;
}

export default Routes;
