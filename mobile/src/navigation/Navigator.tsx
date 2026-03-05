// mobile/src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Importamos las 6 pantallas
import { Home } from '../screens/Home';
import { ProductDetail } from '../screens/ProductDetail';
import { Checkout } from '../screens/Checkout';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Confirmation } from '../screens/Confirmation';
import { Profile } from '../screens/Profile';
import { Orders } from '../screens/Orders';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FFFFFF' }
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Detalle del Producto' }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Comprar sección' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar sesión' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Crear cuenta' }} />
            <Stack.Screen
                name="Confirmation"
                component={Confirmation}
                options={{ title: 'Pedido Confirmado', headerLeft: () => null }}
            />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Mi Perfil' }} />
            <Stack.Screen name="Orders" component={Orders} options={{ title: 'Mis Pedidos' }} />
        </Stack.Navigator>
    );
};
