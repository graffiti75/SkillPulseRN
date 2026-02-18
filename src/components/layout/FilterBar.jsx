import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMenu } from "../../contexts/MenuContext";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import { formatDateForFilter } from "../../utils/dateUtils";
import { Icons } from "../common/Icons";
import Calendar from "../tasks/DateTimePicker/Calendar";

const FilterBar = ({ filterDate, onFilterChange, onClear, onToggleFilter }) => {
  const { setIsMenuOpen } = useMenu();
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    filterDate ? new Date(filterDate) : null,
  );
  const s = makeStyles(c);

  const handleClose = () => {
    setIsMenuOpen(false);
    onToggleFilter();
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onFilterChange(formatDateForFilter(date));
    setShowCalendar(false);
  };

  return (
    <View
      style={[
        s.bar,
        { backgroundColor: c.surfaceAlt, borderTopColor: c.border },
      ]}
    >
      <TouchableOpacity
        style={[
          s.dateInput,
          { borderColor: c.border, backgroundColor: c.surface },
        ]}
        onPress={() => setShowCalendar(true)}
      >
        <Icons.Calendar size={16} color={c.textMuted} />
        <Text
          style={[s.dateText, { color: filterDate ? c.text : c.textMuted }]}
        >
          {filterDate || "Filter by date"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          s.clearBtn,
          { opacity: filterDate ? 1 : 0.4, borderColor: c.border },
        ]}
        onPress={onClear}
        disabled={!filterDate}
      >
        <Icons.X size={14} color={c.textSecondary} />
        <Text style={[s.clearText, { color: c.textSecondary }]}>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.closeBtn} onPress={handleClose}>
        <Icons.X size={18} color={c.text} />
      </TouchableOpacity>

      {/* Calendar modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={[s.calendarOverlay, { backgroundColor: c.overlay }]}>
            <TouchableWithoutFeedback>
              <View style={[s.calendarSheet, { backgroundColor: c.surface }]}>
                <Calendar
                  selectedDate={selectedDate}
                  currentMonth={calendarMonth}
                  onDateSelect={handleDateSelect}
                  onMonthChange={(offset) =>
                    setCalendarMonth(
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + offset,
                      ),
                    )
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderTopWidth: 1,
    },
    dateInput: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    dateText: { fontSize: 14 },
    clearBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
    },
    clearText: { fontSize: 13 },
    closeBtn: { padding: 8 },
    calendarOverlay: { flex: 1, justifyContent: "center", padding: 20 },
    calendarSheet: {
      borderRadius: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 10,
    },
  });

export default FilterBar;
