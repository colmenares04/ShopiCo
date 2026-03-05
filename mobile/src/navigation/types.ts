// mobile/src/navigation/types.ts

// Definimos los parámetros que recibe cada una de las 6 pantallas
export type RootStackParamList = {
    Home: undefined; // No recibe parámetros
    ProductDetail: { productId: number }; // Necesita saber qué producto mostrar
    Checkout: { productId: number; price: number; name: string }; // Datos para la orden
    Login: undefined;
    Register: undefined;
    Confirmation: { orderId: number }; // Necesita el ID de la orden generada
    Profile: undefined;
    Orders: undefined;
};
