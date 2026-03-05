import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../context/authStore';
import { Colors } from '../theme/color';
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronRight, Bell, CreditCard, Home as HomeIcon, ShoppingCart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);

export const Profile = ({ navigation }: any) => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigation.navigate('Home');
    };

    if (!user) {
        return (
            <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
                <View style={styles.loginRequired}>
                    <User size={80} color={Colors.textSecondary} />
                    <Text style={styles.loginTitle}>Inicia sesión para ver tu perfil</Text>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginBtnText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabBar}>
                    <TabItem Icon={HomeIcon} label="Inicio" onPress={() => navigation.navigate('Home')} />
                    <TabItem Icon={Heart} label="Favoritos" />
                    <TabItem Icon={ShoppingCart} label="Carrito" onPress={() => navigation.navigate('Checkout', { productId: 1, price: 98, name: 'Apple Watch' })} />
                    <TabItem Icon={User} label="Perfil" active />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Settings size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* User Info Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: `https://ui-avatars.com/api/?name=${user.full_name}&background=FF6B35&color=fff&size=128` }}
                            style={styles.avatar}
                        />
                        <View style={styles.editBadge}>
                            <Settings size={14} color="#FFF" />
                        </View>
                    </View>
                    <Text style={styles.userName}>{user.full_name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                {/* Account Settings Section */}
                <Text style={styles.sectionTitle}>Mi Cuenta</Text>

                <View style={styles.menuContainer}>
                    <MenuItem
                        icon={<ShoppingBag size={22} color={Colors.primary} />}
                        label="Mis Pedidos"
                        onPress={() => navigation.navigate('Orders')}
                    />

                    <MenuItem
                        icon={<Heart size={22} color={Colors.primary} />}
                        label="Favoritos"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<CreditCard size={22} color={Colors.primary} />}
                        label="Métodos de Pago"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<Bell size={22} color={Colors.primary} />}
                        label="Notificaciones"
                        onPress={() => { }}
                    />
                </View>

                <Text style={styles.sectionTitle}>Otros</Text>
                <View style={styles.menuContainer}>
                    <MenuItem
                        icon={<Settings size={22} color="#666" />}
                        label="Configuración"
                        onPress={() => { }}
                    />
                    <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
                        <View style={styles.menuIconWrapLogout}>
                            <LogOut size={22} color="#FF3B30" />
                        </View>
                        <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        <ChevronRight size={20} color="#DDD" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.tabBar}>
                <TabItem Icon={HomeIcon} label="Inicio" onPress={() => navigation.navigate('Home')} />
                <TabItem Icon={Heart} label="Favoritos" />
                <TabItem Icon={ShoppingCart} label="Carrito" onPress={() => navigation.navigate('Checkout', { productId: 1, price: 98, name: 'Apple Watch' })} />
                <TabItem Icon={User} label="Perfil" active />
            </View>
        </SafeAreaView>
    );
};

const MenuItem = ({ icon, label, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuIconWrap}>
            {icon}
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
        <ChevronRight size={20} color="#DDD" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#FAFAFA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 10, paddingBottom: 15 },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    iconBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
    container: { paddingHorizontal: 25, paddingBottom: 40 },
    profileCard: { alignItems: 'center', marginTop: 20, marginBottom: 35 },
    avatarContainer: { position: 'relative' },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#FFF' },
    editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: Colors.primary, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
    userName: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 15 },
    userEmail: { fontSize: 16, color: Colors.textSecondary, marginTop: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 15, marginTop: 10 },
    menuContainer: { backgroundColor: '#FFF', borderRadius: 20, padding: 10, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
    menuIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF4F0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    menuLabel: { flex: 1, fontSize: 17, color: Colors.textPrimary, fontWeight: '500' },
    logoutItem: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    menuIconWrapLogout: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF0F0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    logoutText: { flex: 1, fontSize: 17, color: '#FF3B30', fontWeight: '600' },
    loginRequired: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    loginTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 30, color: Colors.textPrimary },
    loginBtn: { backgroundColor: Colors.primary, paddingHorizontal: 35, paddingVertical: 18, borderRadius: 16, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
    loginBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
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
