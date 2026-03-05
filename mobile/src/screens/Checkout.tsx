import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../context/authStore';
import { Colors } from '../theme/color';
import { MapPin, ArrowLeft, Share2, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { orderService } from '../services/order.service';
import { CustomAlert } from '../components/CustomAlert';

export const Checkout = ({ route, navigation }: any) => {
    const { productId, price, name } = route.params;
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const token = useAuthStore(state => state.token);

    const shipping = 10.00;

    const applyCoupon = () => {
        if (coupon === 'DESCUENTO5') {
            setDiscount(5);
            Alert.alert('Éxito', 'Descuento aplicado');
        }
    };

    const handleConfirm = async () => {
        if (!token) {
            setAlertVisible(true);
            return;
        }

        try {
            const orderData = {
                total: price + shipping - discount,
                shipping_fee: shipping,
                discount: discount,
                items: [
                    {
                        product_id: productId || 1,
                        qty: 1,
                        unit_price: price
                    }
                ]
            };
            const response = await orderService.createOrder(orderData);
            navigation.navigate('Confirmation', { orderId: response.id });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo procesar el pedido. Asegúrate de estar logueado.');
        }
    };

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CustomAlert
                visible={alertVisible}
                title="Inicia sesión"
                message="Debes estar identificado para completar tu pedido. ¿Quieres iniciar sesión?"
                onClose={() => setAlertVisible(false)}
                onConfirm={() => {
                    setAlertVisible(false);
                    navigation.navigate('Login');
                }}
                confirmText="Iniciar Sesión"
                cancelText="Ahora no"
            />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Comprar sección</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Share2 size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Entrega address <Text style={styles.badge}>Home</Text></Text>

                <View style={styles.addressCard}>
                    <View style={styles.addressIconWrap}>
                        <MapPin size={20} color={Colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.addressName}>No.801A, Calle Wall, USA</Text>
                        <Text style={styles.addressPhone}>Call (+1) 202 555 0118</Text>
                    </View>
                    <ChevronRight size={20} color={Colors.textSecondary} />
                </View>

                {/* Item Card */}
                <View style={styles.itemCard}>
                    <View style={styles.itemImgWrapper}>
                        <Image source={{ uri: 'https://picsum.photos/400/400?1' }} style={styles.itemImg} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemColor}>Space grey color</Text>
                        <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
                    </View>
                    <Text style={styles.itemQty}>QTY:1</Text>
                </View>

                {/* Shipping */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Select Shipping</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                </View>
                <View style={styles.shippingCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.shippingName}>Fedex</Text>
                        <Text style={styles.shippingTime}>Estimated rgu- 3ep- More</Text>
                    </View>
                    <Text style={styles.shippingPrice}>$10.00</Text>
                    <CheckCircle2 size={24} color={Colors.primary} style={{ marginLeft: 15 }} />
                </View>

                {/* Promo */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Promo Code</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                </View>
                <View style={styles.promoCard}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Descuento5"
                            style={styles.promoInput}
                            onChangeText={setCoupon}
                            onEndEditing={applyCoupon}
                        />
                        <Text style={styles.promoAppliedText}>Applied</Text>
                    </View>
                    <Text style={styles.promoAmount}>-${discount.toFixed(2)}</Text>
                    <CheckCircle2 size={24} color={Colors.primary} style={{ marginLeft: 15 }} />
                </View>

                {/* Total */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${(price + shipping - discount).toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                    <Text style={styles.confirmBtnText}>Confirmar Pedido</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 25 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 10, paddingBottom: 15 },
    iconBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 25, marginBottom: 20 },
    badge: { color: Colors.primary, backgroundColor: '#FFEBE0', fontSize: 13, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
    seeAll: { color: Colors.primary, fontSize: 15, fontWeight: '600' },

    addressCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: Colors.primary, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    addressIconWrap: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFEBE0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    addressName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
    addressPhone: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },

    itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginTop: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    itemImgWrapper: { backgroundColor: '#F5F5F5', padding: 8, borderRadius: 16, marginRight: 15 },
    itemImg: { width: 80, height: 80, resizeMode: 'contain' },
    itemName: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
    itemColor: { fontSize: 14, color: Colors.textSecondary, marginVertical: 6 },
    itemPrice: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary },
    itemQty: { fontSize: 16, fontWeight: '500' },

    shippingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    shippingName: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
    shippingTime: { fontSize: 14, color: Colors.textSecondary, marginTop: 6 },
    shippingPrice: { fontSize: 18, fontWeight: 'bold' },

    promoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    promoInput: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, padding: 0 },
    promoAppliedText: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
    promoAmount: { fontSize: 18, fontWeight: 'bold' },

    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 35 },
    totalLabel: { fontSize: 22, color: Colors.textPrimary, fontWeight: 'bold' },
    totalValue: { fontSize: 32, fontWeight: 'bold', color: Colors.textPrimary },

    confirmBtn: { backgroundColor: Colors.primary, paddingVertical: 22, borderRadius: 16, alignItems: 'center', marginBottom: 50, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
    confirmBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});