import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.btn}>
      <Text style={styles.icon}>{isDarkMode ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { padding: 8 },
  icon: { fontSize: 22 },
});
