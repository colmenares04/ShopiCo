import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '../context/authStore';
import { authService } from '../services/auth.service';
import { Colors } from '../theme/color';
import { ArrowLeft, Home as HomeIcon, Heart, ShoppingCart, User } from 'lucide-react-native';

const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);

export const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = async () => {
        // Validaciones mínimas requeridas 
        if (!email.includes('@')) return Alert.alert('Error', 'Correo inválido');
        if (password.length < 6) return Alert.alert('Error', 'Mínimo 6 caracteres');

        try {
            const data = await authService.login(email, password);
            setAuth(data.access_token, data.user);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Iniciar sesión</Text>
                <View style={{ width: 50 }} />
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.primary }]}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>¿Olvidaste tu contraseña? <Text style={{ color: Colors.primary }}>Recuperar contraseña </Text></Text>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ alignItems: 'center' }}>
                    <Text style={{ color: Colors.primary, marginTop: 10, fontWeight: 'bold' }}>Registrarme</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabBar}>
                <TabItem Icon={HomeIcon} label="Inicio" onPress={() => navigation.navigate('Home')} />
                <TabItem Icon={Heart} label="Favoritos" />
                <TabItem Icon={ShoppingCart} label="Carrito" onPress={() => navigation.navigate('Checkout', { productId: 1, price: 98, name: 'Apple Watch' })} />
                <TabItem Icon={User} label="Perfil" active onPress={() => navigation.navigate('Profile')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 10, paddingBottom: 15, backgroundColor: '#FAFAFA' },
    iconBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    container: { flex: 1, paddingHorizontal: 30, paddingTop: 40, backgroundColor: '#FAFAFA' },
    input: { backgroundColor: '#FFF', padding: 22, borderRadius: 16, marginBottom: 25, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1, fontSize: 17, color: Colors.textPrimary },
    button: { padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 15, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
    buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    footerText: { textAlign: 'center', marginTop: 30, color: Colors.textSecondary, fontSize: 15 },
    tabBar: {
        flexDirection: 'row',
        height: 90,
        backgroundColor: '#FFF',
        paddingBottom: 25,
        paddingTop: 15,
        borderTopWidth: 1,
        borderColor: '#EAEAEA'
    },
    tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});