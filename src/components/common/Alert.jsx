import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme';

const Alert = ({ message, type = 'success', onClose }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? c.successLight : c.dangerLight;
  const textColor = type === 'success' ? c.success : c.danger;

  return (
    <View style={[styles.alert, { backgroundColor: bgColor, borderColor: textColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Alert;
