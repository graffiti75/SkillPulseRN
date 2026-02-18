import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Modal, Alert } from '../../components/common';
import { Icons } from '../../components/common/Icons';
import { useAuth } from '../../contexts/AuthContext';
import { downloadTasksByMonth } from '../../firebase/tasks';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const MonthYearPicker = ({ year, month, onChange, c }) => {
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  return (
    <View style={styles.picker}>
      <TouchableOpacity
        style={[styles.navBtn, { backgroundColor: c.surfaceAlt }]}
        onPress={() => month === 1 ? onChange(year - 1, 12) : onChange(year, month - 1)}
      >
        <Icons.ChevronLeft size={18} color={c.text} />
      </TouchableOpacity>
      <Text style={[styles.pickerLabel, { color: c.text }]}>{MONTHS[month - 1]} {year}</Text>
      <TouchableOpacity
        style={[styles.navBtn, { backgroundColor: c.surfaceAlt }]}
        onPress={() => month === 12 ? onChange(year + 1, 1) : onChange(year, month + 1)}
      >
        <Icons.ChevronRight size={18} color={c.text} />
      </TouchableOpacity>
    </View>
  );
};

const DownloadScreen = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [format, setFormat] = useState('json');
  const [formattedDates, setFormattedDates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const s = makeStyles(c);

  const handleDownload = async () => {
    if (!user?.email) { setAlert({ message: 'User not authenticated', type: 'error' }); return; }
    setIsLoading(true);
    const result = await downloadTasksByMonth(user.email, selectedYear, selectedMonth, format, formattedDates);
    setIsLoading(false);
    if (result.success) setAlert({ message: `Exported ${result.taskCount} tasks`, type: 'success' });
    else setAlert({ message: result.error || 'Failed to download tasks', type: 'error' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Download Tasks">
      <View style={s.container}>
        {/* Month Section */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Icons.Calendar size={16} color={c.primary} />
            <Text style={[s.sectionTitle, { color: c.text }]}>Select Month</Text>
          </View>
          <MonthYearPicker
            year={selectedYear}
            month={selectedMonth}
            onChange={(y, m) => { setSelectedYear(y); setSelectedMonth(m); }}
            c={c}
          />
        </View>

        {/* Format Section */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Icons.Filter size={16} color={c.primary} />
            <Text style={[s.sectionTitle, { color: c.text }]}>Export Format</Text>
          </View>
          <View style={s.formatRow}>
            {['json', 'csv'].map((f) => (
              <TouchableOpacity
                key={f}
                style={[s.formatOption, { borderColor: format === f ? c.primary : c.border, backgroundColor: format === f ? c.primaryLight : c.surfaceAlt }]}
                onPress={() => setFormat(f)}
              >
                <Text style={[s.formatLabel, { color: format === f ? c.primary : c.text }]}>
                  {f === 'json' ? '{ } JSON' : '📊 CSV'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {format === 'csv' && (
            <TouchableOpacity
              style={s.checkboxRow}
              onPress={() => setFormattedDates(!formattedDates)}
            >
              <View style={[s.checkbox, { borderColor: c.primary, backgroundColor: formattedDates ? c.primary : 'transparent' }]}>
                {formattedDates && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={[s.checkLabel, { color: c.text }]}>Use readable date format</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Download Button */}
        <TouchableOpacity
          style={[s.downloadBtn, { backgroundColor: c.primary }, isLoading && { opacity: 0.7 }]}
          onPress={handleDownload}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Icons.Download size={18} color="#fff" />
              <Text style={s.downloadBtnText}>Download</Text>
            </>
          )}
        </TouchableOpacity>

        {alert && (
          <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        )}
        <View style={{ height: 20 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  picker: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  navBtn: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  pickerLabel: { fontSize: 16, fontWeight: '600' },
});

const makeStyles = (c) => StyleSheet.create({
  container: {},
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '600' },
  formatRow: { flexDirection: 'row', gap: 10 },
  formatOption: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    alignItems: 'center', borderWidth: 1.5,
  },
  formatLabel: { fontSize: 14, fontWeight: '600' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { fontSize: 14 },
  downloadBtn: {
    flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center',
    height: 52, borderRadius: 14,
  },
  downloadBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default DownloadScreen;
