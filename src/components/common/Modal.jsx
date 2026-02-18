import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme';
import { Icons } from './Icons';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <RNModal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, { backgroundColor: c.overlay }]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modal, { backgroundColor: c.surface }]}>
              {title && (
                <View style={[styles.header, { borderBottomColor: c.border }]}>
                  <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                    <Icons.ArrowLeft size={20} color={c.text} />
                  </TouchableOpacity>
                  <Text style={[styles.title, { color: c.text }]}>{title}</Text>
                </View>
              )}
              <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                {children}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4, marginRight: 12 },
  title: { fontSize: 17, fontWeight: '600', flex: 1 },
  body: { padding: 16 },
});

export default Modal;
