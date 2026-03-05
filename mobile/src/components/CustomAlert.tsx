import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Colors } from '../theme/color';
import { Info, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const CustomAlert = ({
    visible,
    title,
    message,
    onClose,
    onConfirm,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar'
}: CustomAlertProps) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <X size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={styles.iconCircle}>
                        <Info size={32} color={Colors.primary} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        {onConfirm && (
                            <TouchableOpacity
                                style={[styles.button, styles.cancelBtn]}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.button, styles.confirmBtn]}
                            onPress={onConfirm || onClose}
                        >
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    alertBox: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFEBE0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 10,
        textAlign: 'center'
    },
    message: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 15
    },
    button: {
        flex: 1,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4
    },
    cancelBtn: {
        backgroundColor: '#F5F5F5'
    },
    confirmText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    cancelText: {
        color: Colors.textSecondary,
        fontSize: 16,
        fontWeight: '600'
    }
});
