import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Typography } from '../theme/typography';
import { Colors } from '../theme/color';

interface Props {
    title: string;
    onPress: () => void;
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

export const CustomButton = ({ title, onPress, outline, disabled, loading }: Props) => (
    <TouchableOpacity
        style={[styles.btn, outline ? styles.outline : styles.primary, disabled && styles.disabled]}
        onPress={disabled || loading ? undefined : onPress}
        accessibilityLabel={title}
        accessibilityRole="button"
    >
        {loading ? (
            <ActivityIndicator color={outline ? Colors.primary : '#FFF'} />
        ) : (
            <Text style={[styles.text, outline ? { color: Colors.primary } : { color: '#FFF' }]}>
                {title}
            </Text>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btn: { padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 8 },
    primary: { backgroundColor: Colors.primary },
    outline: { borderWidth: 1, borderColor: Colors.primary },
    disabled: { opacity: 0.5 },
    text: { ...Typography.body, fontWeight: 'bold' }
});