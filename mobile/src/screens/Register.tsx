import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/color';
import { authService } from '../services/auth.service';
import { CustomButton } from '../components/CustomButton';
import { ArrowLeft, Home as HomeIcon, Heart, ShoppingCart, User } from 'lucide-react-native';

const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);

export const Register = ({ navigation }: any) => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleRegister = async () => {
        const { fullName, email, password, confirmPassword } = form;

        // Validaciones requeridas
        if (!fullName || !email || !password) return Alert.alert('Error', 'Todos los campos son obligatorios');
        if (!emailRegex.test(email)) return Alert.alert('Error', 'Formato de correo inválido');
        if (password.length < 6) return Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        if (password !== confirmPassword) return Alert.alert('Error', 'Las contraseñas no coinciden');

        setLoading(true);
        try {
            await authService.register(fullName, email, password);
            Alert.alert('Éxito', 'Cuenta creada. Ahora puedes iniciar sesión.');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crear cuenta</Text>
                <View style={{ width: 50 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.input} placeholder="Nombre completo"
                    onChangeText={(t) => setForm({ ...form, fullName: t })}
                    accessibilityLabel="Campo de nombre completo"
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.input} placeholder="Correo electrónico" autoCapitalize="none"
                    onChangeText={(t) => setForm({ ...form, email: t })}
                    keyboardType="email-address"
                    accessibilityLabel="Campo de correo electrónico"
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.input} placeholder="Contraseña" secureTextEntry
                    onChangeText={(t) => setForm({ ...form, password: t })}
                    accessibilityLabel="Campo de contraseña"
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.input} placeholder="Confirmar contraseña" secureTextEntry
                    onChangeText={(t) => setForm({ ...form, confirmPassword: t })}
                    accessibilityLabel="Campo de confirmar contraseña"
                    returnKeyType="done"
                />

                <CustomButton title="Registrarme" onPress={handleRegister} loading={loading} disabled={loading} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>¿Ya tienes una cuenta? <Text style={{ color: Colors.primary }}>Iniciar sesión</Text></Text>
                </TouchableOpacity>
            </ScrollView>

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
    container: { flexGrow: 1, paddingHorizontal: 30, paddingTop: 40, backgroundColor: '#FAFAFA', paddingBottom: 40 },
    input: { backgroundColor: '#FFF', padding: 22, borderRadius: 16, marginBottom: 25, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1, fontSize: 17 },
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