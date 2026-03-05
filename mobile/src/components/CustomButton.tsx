import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Typography } from '../theme/typography';
import { Colors } from '../theme/color';

interface Props {
    title: string;
    onPress: () => void;
    outline?: boolean;
}

export const CustomButton = ({ title, onPress, outline }: Props) => (
    <TouchableOpacity
        style={[styles.btn, outline ? styles.outline : styles.primary]}
        onPress={onPress}
    >
        <Text style={[styles.text, outline ? { color: Colors.primary } : { color: '#FFF' }]}>
            {title}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btn: { padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 8 },
    primary: { backgroundColor: Colors.primary },
    outline: { borderWidth: 1, borderColor: Colors.primary },
    text: { ...Typography.body, fontWeight: 'bold' }
});