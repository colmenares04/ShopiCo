import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { productService } from '../services/product.service';
import { useAuthStore } from '../context/authStore';
import { CustomAlert } from '../components/CustomAlert';
import { Colors } from '../theme/color';
import { ArrowLeft, Share2, Heart } from 'lucide-react-native';

export const ProductDetail = ({ route, navigation }: any) => {
    const { productId } = route.params;
    const [product, setProduct] = useState<any>(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const token = useAuthStore(state => state.token);

    useEffect(() => {
        productService.getAllProducts().then(list => {
            setProduct(list.find(p => p.id === productId));
        });
    }, [productId]);

    if (!product) return null;

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CustomAlert
                visible={alertVisible}
                title="Inicia sesión"
                message="Para continuar con la compra, necesitas estar identificado. ¿Quieres iniciar sesión?"
                onClose={() => setAlertVisible(false)}
                onConfirm={() => {
                    setAlertVisible(false);
                    navigation.navigate('Login');
                }}
                confirmText="Iniciar Sesión"
                cancelText="Ahora no"
            />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header Custom */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Product Detail</Text>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Share2 size={22} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Imagen del Producto */}
                <View style={styles.imgContainer}>
                    <Image source={{ uri: product.image_url }} style={styles.mainImg} />
                    <View style={styles.paginationText}>
                        <Text style={{ fontSize: 13, color: Colors.primary, fontWeight: 'bold' }}>1/5</Text>
                    </View>
                </View>

                {/* Detalles Principales */}
                <View style={styles.detailsContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.name}</Text>
                        <Heart size={26} color={Colors.textSecondary} />
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceStrike}>$120.55</Text>
                        <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
                    </View>

                    <Text style={styles.descTitle}>Descripción</Text>
                    <Text style={styles.desc}>{product.description}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla commodo eget.</Text>

                    <View style={styles.colorRow}>
                        <View style={styles.colorDotWrapper}>
                            <View style={styles.colorDot} />
                        </View>
                        <Text style={styles.colorText}>Espacio Gris</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addCartBtn} onPress={() => { }}>
                    <Text style={styles.addCartText}>Agregar al Carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyNowBtn}
                    onPress={() => {
                        if (!token) {
                            setAlertVisible(true);
                        } else {
                            navigation.navigate('Checkout', {
                                productId: product.id,
                                price: Number(product.price),
                                name: product.name
                            });
                        }
                    }}
                >
                    <Text style={styles.buyNowText}>Comprar ahora</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 10, zIndex: 10 },
    iconBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    imgContainer: { alignItems: 'center', marginTop: 15, paddingHorizontal: 30, paddingBottom: 35 },
    mainImg: { width: '100%', height: 380, resizeMode: 'contain' },
    paginationText: { position: 'absolute', bottom: 15, right: 30, backgroundColor: '#FFEBE0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
    detailsContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 30, paddingTop: 35, paddingBottom: 40, flex: 1 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', color: Colors.textPrimary },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 12, marginBottom: 25 },
    priceStrike: { fontSize: 22, color: '#A0A0A0', textDecorationLine: 'line-through', marginRight: 15 },
    price: { fontSize: 32, color: Colors.textPrimary, fontWeight: 'bold' },
    descTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
    desc: { color: Colors.textSecondary, fontSize: 16, lineHeight: 26 },
    colorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
    colorDotWrapper: { padding: 4, borderWidth: 1.5, borderColor: Colors.primary, borderRadius: 18, marginRight: 12 },
    colorDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#8E8E8E' },
    colorText: { fontSize: 16, color: Colors.textPrimary, fontWeight: '600' },
    footer: { flexDirection: 'row', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 40, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#FAFAFA' },
    addCartBtn: { flex: 1, height: 60, borderWidth: 1.5, borderColor: Colors.primary, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    addCartText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
    buyNowBtn: { flex: 1, height: 60, backgroundColor: Colors.primary, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    buyNowText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});