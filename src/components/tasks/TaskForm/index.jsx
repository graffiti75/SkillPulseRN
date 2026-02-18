import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { Modal } from '../../common';
import DateTimePicker from '../DateTimePicker/index';
import { useTaskFormState } from './useTaskFormState';
import { formatDateTime } from '../../../utils/dateUtils';
import { extractSuggestions } from '../../../firebase/tasks/taskSuggestions';
import { Icons } from '../../common/Icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { colors } from '../../../theme';

const TaskForm = ({ isOpen, onClose, onSave, editTask, allTasks = [] }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];
  const state = useTaskFormState(editTask, isOpen);
  const s = makeStyles(c);

  const handleSave = async () => {
    if (!state.description || !state.startTime || !state.endTime) return;
    state.setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSave({ description: state.description, startTime: state.startTime, endTime: state.endTime });
    state.setIsLoading(false);
    onClose();
  };

  const filteredSuggestions = extractSuggestions(allTasks, state.description, 5).filter(
    (s) => s.toLowerCase() !== state.description.toLowerCase()
  );

  const isFormValid = state.description && state.startTime && state.endTime;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={editTask ? 'Edit Task' : 'Add Task'}>
        {/* Task ID (edit mode) */}
        {editTask && (
          <View style={s.formGroup}>
            <Text style={s.label}>Task ID</Text>
            <TextInput style={[s.input, s.inputDisabled]} value={editTask.id} editable={false} />
          </View>
        )}

        {/* Description */}
        <View style={s.formGroup}>
          <Text style={s.label}>Description</Text>
          <TextInput
            style={[s.input, s.textarea]}
            placeholder="Enter task description"
            placeholderTextColor={c.textMuted}
            value={state.description}
            onChangeText={(v) => {
              state.setDescription(v);
              state.setShowSuggestions(v.length > 0);
            }}
            onFocus={() => state.setShowSuggestions(state.description.length > 0)}
            onBlur={() => setTimeout(() => state.setShowSuggestions(false), 200)}
            multiline
            numberOfLines={3}
          />
          {state.showSuggestions && filteredSuggestions.length > 0 && (
            <View style={[s.suggestions, { backgroundColor: c.surface, borderColor: c.border }]}>
              {filteredSuggestions.map((suggestion, i) => (
                <TouchableOpacity
                  key={i}
                  style={[s.suggestionItem, { borderBottomColor: c.border }]}
                  onPress={() => {
                    state.setDescription(suggestion);
                    state.setShowSuggestions(false);
                  }}
                >
                  <Text style={[s.suggestionText, { color: c.text }]}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Start Time */}
        <View style={s.formGroup}>
          <Text style={s.label}>Start Time</Text>
          <TouchableOpacity
            style={s.inputWrapper}
            onPress={() => state.setShowStartPicker(true)}
          >
            <Text style={[s.inputText, !state.startTime && { color: c.textMuted }]}>
              {state.startTime ? formatDateTime(state.startTime) : 'Select start date and time'}
            </Text>
            <Icons.Calendar size={18} color={c.textMuted} />
          </TouchableOpacity>
        </View>

        {/* End Time */}
        <View style={s.formGroup}>
          <Text style={s.label}>End Time</Text>
          <TouchableOpacity
            style={s.inputWrapper}
            onPress={() => state.setShowEndPicker(true)}
          >
            <Text style={[s.inputText, !state.endTime && { color: c.textMuted }]}>
              {state.endTime ? formatDateTime(state.endTime) : 'Select end date and time'}
            </Text>
            <Icons.Calendar size={18} color={c.textMuted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[s.saveBtn, { backgroundColor: c.primary }, (!isFormValid || state.isLoading) && s.btnDisabled]}
          onPress={handleSave}
          disabled={state.isLoading || !isFormValid}
        >
          {state.isLoading
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={s.saveBtnText}>{editTask ? 'Save Changes' : 'Add Task'}</Text>
          }
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </Modal>

      <DateTimePicker
        isOpen={state.showStartPicker}
        onClose={() => state.setShowStartPicker(false)}
        onSelect={state.setStartTime}
        title="Select Start Time"
      />
      <DateTimePicker
        isOpen={state.showEndPicker}
        onClose={() => state.setShowEndPicker(false)}
        onSelect={state.setEndTime}
        title="Select End Time"
      />
    </>
  );
};

const makeStyles = (c) => StyleSheet.create({
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: c.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: c.surfaceAlt,
    borderWidth: 1, borderColor: c.border,
    borderRadius: 12, padding: 12,
    color: c.text, fontSize: 15,
  },
  textarea: { height: 90, textAlignVertical: 'top' },
  inputDisabled: { opacity: 0.6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: c.surfaceAlt,
    borderWidth: 1, borderColor: c.border,
    borderRadius: 12, padding: 12,
  },
  inputText: { fontSize: 15, color: c.text, flex: 1 },
  suggestions: {
    borderWidth: 1, borderRadius: 10, marginTop: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
    maxHeight: 180,
  },
  suggestionItem: { padding: 12, borderBottomWidth: 1 },
  suggestionText: { fontSize: 14 },
  saveBtn: {
    height: 50, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnDisabled: { opacity: 0.5 },
});

export default TaskForm;
