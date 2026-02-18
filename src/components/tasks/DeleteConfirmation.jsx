import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from '../common';
import { Icons } from '../common/Icons';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, taskDescription }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];
  const s = makeStyles(c);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <View style={s.container}>
        <View style={s.iconWrap}>
          <Icons.AlertCircle size={36} color={c.danger} />
        </View>
        <Text style={s.title}>Delete Task?</Text>
        <Text style={s.text}>
          Are you sure you want to delete "{taskDescription}"? This action cannot be undone.
        </Text>
        <View style={s.buttons}>
          <TouchableOpacity style={[s.btn, s.cancelBtn, { borderColor: c.border }]} onPress={onClose}>
            <Text style={[s.btnText, { color: c.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, s.deleteBtn, { backgroundColor: c.danger }]} onPress={onConfirm}>
            <Text style={[s.btnText, { color: '#fff' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const makeStyles = (c) => StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 8 },
  iconWrap: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: c.dangerLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '700', color: c.text, marginBottom: 10 },
  text: { fontSize: 14, color: c.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  buttons: { flexDirection: 'row', gap: 10, width: '100%' },
  btn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { borderWidth: 1, backgroundColor: 'transparent' },
  deleteBtn: {},
  btnText: { fontSize: 15, fontWeight: '600' },
});

export default DeleteConfirmation;
