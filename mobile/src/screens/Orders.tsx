import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { ChevronLeft, ShoppingBag, Calendar, Package, ChevronRight, Heart, ShoppingCart, User, Home as HomeIcon } from 'lucide-react-native';
import { Colors } from '../theme/color';
import { orderService } from '../services/order.service';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const TabItem = ({ Icon, label, active, onPress }: any) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <Icon size={28} color={active ? Colors.primary : Colors.textSecondary} />
        <Text style={{ fontSize: 12, color: active ? Colors.primary : Colors.textSecondary, marginTop: 4, fontWeight: '500' }}>{label}</Text>
    </TouchableOpacity>
);

export const Orders = ({ navigation }: any) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderOrderItem = ({ item }: { item: any }) => (

        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View style={styles.orderBadge}>
                    <ShoppingBag size={20} color={Colors.primary} />
                </View>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>Pedido #{item.id}</Text>
                    <Text style={styles.orderDate}>
                        {new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'CONFIRMED' ? '#F0FFF4' : '#FFF9F0' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'CONFIRMED' ? '#22C55E' : '#F59E0B' }]}>
                        {item.status === 'CONFIRMED' ? 'Entregado' : 'Pendiente'}
                    </Text>
                </View>
            </View>

            <View style={styles.productsList}>
                {item.items?.map((subItem: any, index: number) => (
                    <View key={index} style={styles.productRow}>
                        <Image
                            source={{ uri: subItem.product?.image_url || 'https://via.placeholder.com/150' }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName} numberOfLines={1}>{subItem.product?.name || 'Producto'}</Text>
                            <Text style={styles.productQty}>Cantidad: {subItem.qty} • ${subItem.unit_price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.orderFooter}>
                <View style={styles.priceSummary}>
                    {parseFloat(item.shipping_fee) > 0 && (
                        <Text style={styles.feeText}>Envío: ${item.shipping_fee}</Text>
                    )}
                    {parseFloat(item.discount) > 0 && (
                        <Text style={styles.discountText}>Descuento: -${item.discount}</Text>
                    )}
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.orderTotal}>${item.total}</Text>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mis Pedidos</Text>
                <View style={{ width: 44 }} />
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <ShoppingBag size={50} color="#DDD" />
                        </View>
                        <Text style={styles.emptyTitle}>Sin pedidos aún</Text>
                        <Text style={styles.emptySubtitle}>Cuando realices una compra, aparecerá aquí.</Text>
                        <TouchableOpacity
                            style={styles.shopBtn}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.shopBtnText}>Ir a la tienda</Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            <View style={styles.tabBar}>
                <TabItem Icon={HomeIcon} label="Inicio" onPress={() => navigation.navigate('Home')} />
                <TabItem Icon={Heart} label="Favoritos" />
                <TabItem Icon={ShoppingCart} label="Carrito" onPress={() => navigation.navigate('Checkout', { productId: 1, price: 98, name: 'Apple Watch' })} />
                <TabItem Icon={User} label="Perfil" onPress={() => navigation.navigate('Profile')} active />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#FFF'
    },
    headerTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 22, backgroundColor: '#F8F8F8' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
    listContainer: { padding: 20, paddingBottom: 100 },
    orderCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 2,
    },
    orderHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    orderBadge: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#FFF5F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14
    },
    orderInfo: { flex: 1 },
    orderId: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
    orderDate: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    statusText: { fontSize: 12, fontWeight: '700' },

    productsList: { marginBottom: 20 },
    productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    productImage: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#F8F8F8', marginRight: 12 },
    productDetails: { flex: 1 },
    productName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
    productQty: { fontSize: 13, color: '#64748B' },

    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F8F8F8'
    },
    priceSummary: { flex: 1 },
    feeText: { fontSize: 12, color: '#94A3B8', marginBottom: 2 },
    discountText: { fontSize: 12, color: '#EF4444', fontWeight: '600' },
    totalContainer: { alignItems: 'flex-end' },
    totalLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
    orderTotal: { fontSize: 22, fontWeight: '800', color: Colors.primary },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
    emptyIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
    emptySubtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
    shopBtn: { backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    shopBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

    tabBar: {
        flexDirection: 'row',
        height: 90,
        backgroundColor: '#FFF',
        paddingBottom: 25,
        paddingTop: 15,
        borderTopWidth: 1,
        borderColor: '#F2F2F2',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
