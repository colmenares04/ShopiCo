import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/color';
import { ArrowLeft, Home as HomeIcon, Heart, ShoppingCart, User } from 'lucide-react-native';

import { productService } from '../services/product.service';
import { Product } from '../types';

const { width } = Dimensions.get('window');

const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);

export const Confirmation = ({ route, navigation }: any) => {
    const { orderId } = route.params;
    const [recommended, setRecommended] = React.useState<Product[]>([]);

    React.useEffect(() => {
        productService.getAllProducts().then(list => {
            // Pick 2 random or specific products for recommendations
            setRecommended(list.slice(0, 2));
        });
    }, []);

    const renderRecommended = ({ item }: any) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
            <View style={styles.cardFavIcon}>
                <Heart size={18} color={Colors.textSecondary} />
            </View>
            <View style={styles.productImgWrapper}>
                <Image source={{ uri: item.image_url }} style={styles.productImg} />
            </View>
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.popToTop()}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pedido Confirmado</Text>
                <View style={{ width: 50 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard}>
                    <View style={styles.successImgContainer}>
                        <Image source={require('../assets/gracias.png')} style={styles.icon} />
                        {/* Simulating confetti/bubbles with background circles if needed, but a good image is enough */}
                    </View>

                    <Text style={styles.title}>Pedido Confirmado</Text>
                    <Text style={styles.msg}>
                        ¡Gracias! tu pedido ha sido realizado con éxito. Recibirás una confirmación en tu correo electrónico.
                    </Text>
                </View>

                {/* Recomendados */}
                <Text style={styles.sectionTitle}>Recomendado para ti</Text>
                <FlatList
                    data={recommended}
                    numColumns={2}
                    renderItem={renderRecommended}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
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
    iconBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 4 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },

    mainCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 30, marginTop: 20, marginBottom: 40, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    successImgContainer: { width: 220, height: 220, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    icon: { width: '100%', height: '100%', resizeMode: 'contain' },

    title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 15, textAlign: 'center' },
    msg: { textAlign: 'center', color: Colors.textSecondary, fontSize: 16, lineHeight: 26, paddingHorizontal: 10 },

    sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: Colors.textPrimary },

    productCard: { width: (width - 70) / 2, backgroundColor: '#FFF', padding: 15, borderRadius: 20, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 5, elevation: 2, marginBottom: 15 },
    cardFavIcon: { position: 'absolute', top: 12, right: 12, zIndex: 1 },
    productImgWrapper: { backgroundColor: '#F9F9F9', borderRadius: 15, padding: 10, marginBottom: 12 },
    productImg: { width: '100%', height: 110, resizeMode: 'contain' },
    productName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center' },
    productPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginTop: 4 },

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
