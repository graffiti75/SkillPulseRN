import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { colors } from '../../../theme';

const TimePicker = ({ hours, minutes, onHoursChange, onMinutesChange }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];
  const s = makeStyles(c);

  return (
    <View style={s.container}>
      <Text style={s.label}>Select Time</Text>
      <View style={s.row}>
        <TextInput
          style={s.input}
          value={hours}
          onChangeText={(val) => {
            const v = val.replace(/\D/g, '').slice(0, 2);
            if (parseInt(v, 10) <= 23 || v === '') onHoursChange(v);
          }}
          placeholder="HH"
          placeholderTextColor={c.textMuted}
          keyboardType="number-pad"
          maxLength={2}
          textAlign="center"
        />
        <Text style={s.separator}>:</Text>
        <TextInput
          style={s.input}
          value={minutes}
          onChangeText={(val) => {
            const v = val.replace(/\D/g, '').slice(0, 2);
            if (parseInt(v, 10) <= 59 || v === '') onMinutesChange(v);
          }}
          placeholder="MM"
          placeholderTextColor={c.textMuted}
          keyboardType="number-pad"
          maxLength={2}
          textAlign="center"
        />
      </View>
    </View>
  );
};

const makeStyles = (c) => StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 20 },
  label: { fontSize: 14, color: c.textSecondary, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  input: {
    width: 80, height: 70, borderRadius: 14,
    backgroundColor: c.surfaceAlt,
    borderWidth: 2, borderColor: c.primary,
    fontSize: 32, fontWeight: '700', color: c.text,
  },
  separator: { fontSize: 32, fontWeight: '700', color: c.text },
});

export default TimePicker;
