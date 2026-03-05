import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../types';
import { Colors } from '../theme/color';
import { productService } from '../services/product.service';
import { Bell, Home as HomeIcon, Heart, ShoppingCart, User, Search, MapPin, SlidersHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Categories = [
    { id: 1, name: 'Muebles', img: require('../assets/mueble.png') },
    { id: 2, name: 'Moda', img: require('../assets/dress.png') },
    { id: 3, name: 'Salud', img: require('../assets/doctor.png') },
];
const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);
export const Home = ({ navigation }: any) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAllProducts().then(setProducts);
    }, []);

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
            <View style={styles.cardFavIcon}>
                <Heart size={20} color={Colors.textSecondary} />
            </View>
            <Image source={{ uri: item.image_url }} style={styles.productImg} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: Colors.background }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.logoIcon}>
                            <ShoppingCart size={24} color="#FFF" />
                        </View>
                        <Text style={styles.logoText}>ShopiCo</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconCircle}><Text style={{ fontSize: 18 }}>📋</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.iconCircle, { marginLeft: 12 }]}><Bell size={24} color={Colors.textPrimary} /></TouchableOpacity>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Search size={22} color={Colors.textSecondary} style={{ marginLeft: 15 }} />
                    <TextInput style={styles.search} placeholder="Enviar un regalo..." placeholderTextColor={Colors.textSecondary} />
                </View>

                <View style={styles.addressRow}>
                    <MapPin size={20} color={Colors.primary} />
                    <Text style={styles.addressText}>Enviar a: No.801A, Calle Wall, USA</Text>
                </View>

                {/* Categories */}
                <View style={styles.catContainer}>
                    {Categories.map(cat => (
                        <View key={cat.id} style={styles.catItem}>
                            <View style={styles.catIconCircle}>
                                <Image source={cat.img} style={styles.catIcon} />
                            </View>
                            <Text style={styles.catText}>{cat.name}</Text>
                        </View>
                    ))}
                    <View style={styles.catItem}>
                        <View style={styles.catIconCircle}>
                            <SlidersHorizontal size={30} color={Colors.textSecondary} />
                        </View>
                        <Text style={styles.catText}>Est...</Text>
                    </View>
                </View>

                {/* Banner */}
                <View style={styles.banner}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.bannerTitle}>Nuevas llegadas</Text>
                        <TouchableOpacity style={styles.bannerBtn}>
                            <Text style={styles.bannerBtnText}>Compra ahora</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/mueble.png')} style={styles.bannerImg} />
                </View>

                {/* Listado */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ofertas Flash</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                </View>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                />
            </ScrollView>
            <View style={styles.tabBar}>
                <TabItem Icon={HomeIcon} label="Inicio" active />
                <TabItem Icon={Heart} label="Favoritos" />
                <TabItem Icon={ShoppingCart} label="Carrito" onPress={() => navigation.navigate('Checkout', { productId: 1, price: 98, name: 'Apple Watch' })} />
                <TabItem Icon={User} label="Perfil" onPress={() => navigation.navigate('Profile')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 25 },
    logoIcon: { backgroundColor: Colors.primary, padding: 8, borderRadius: 10 },
    logoText: { fontSize: 26, fontWeight: 'bold', marginLeft: 10 },
    headerIcons: { flexDirection: 'row' },
    iconCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 15, paddingHorizontal: 10, marginBottom: 20 },
    search: { flex: 1, paddingVertical: 15, paddingHorizontal: 10, fontSize: 17 },
    addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    addressText: { color: Colors.textSecondary, marginLeft: 10, fontSize: 15 },
    catContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 },
    catItem: { alignItems: 'center' },
    catIconCircle: { backgroundColor: Colors.surface, width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
    catIcon: { width: 40, height: 40, resizeMode: 'contain' },
    catText: { marginTop: 10, fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
    banner: { backgroundColor: '#111', borderRadius: 20, padding: 25, flexDirection: 'row', justifyContent: 'space-between', height: 180, marginBottom: 30 },
    bannerTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
    bannerBtn: { backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, marginTop: 15, alignSelf: 'flex-start' },
    bannerBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
    bannerImg: { width: 120, height: 140, resizeMode: 'contain', alignSelf: 'flex-end', marginRight: -10 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold' },
    seeAll: { color: Colors.primary, fontWeight: '600', fontSize: 16 },
    productCard: { width: (width - 50) / 2, backgroundColor: Colors.surface, margin: 5, padding: 15, borderRadius: 20 },
    cardFavIcon: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FFF', padding: 8, borderRadius: 20, zIndex: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    productImg: { width: '100%', height: 130, resizeMode: 'contain', marginBottom: 15 },
    productName: { marginTop: 5, fontWeight: '600', fontSize: 16 },
    productPrice: { color: Colors.primary, fontWeight: 'bold', fontSize: 18, marginTop: 6 },
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