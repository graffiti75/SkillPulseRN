import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { colors } from "../../../theme";
import { Icons } from "../../common/Icons";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import { useDateTimePicker } from "./useDateTimePicker";

const DateTimePicker = ({ isOpen, onClose, onSelect, title }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const {
    selectedDate,
    currentMonth,
    hours,
    minutes,
    step,
    setSelectedDate,
    setHours,
    setMinutes,
    setStep,
    changeMonth,
    handleConfirm,
  } = useDateTimePicker();
  const s = makeStyles(c);

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[s.overlay, { backgroundColor: c.overlay }]}>
          <TouchableWithoutFeedback>
            <View style={[s.sheet, { backgroundColor: c.surface }]}>
              {/* Header */}
              <View style={[s.header, { borderBottomColor: c.border }]}>
                <TouchableOpacity
                  onPress={() =>
                    step === "time" ? setStep("date") : onClose()
                  }
                  style={s.backBtn}
                >
                  <Icons.ArrowLeft size={20} color={c.text} />
                </TouchableOpacity>
                <Text style={[s.title, { color: c.text }]}>
                  {title || "Select Date & Time"}
                </Text>
              </View>

              {/* Tabs */}
              <View style={[s.tabs, { borderBottomColor: c.border }]}>
                <TouchableOpacity
                  style={[
                    s.tab,
                    step === "date" && [
                      s.tabActive,
                      { borderBottomColor: c.primary },
                    ],
                  ]}
                  onPress={() => setStep("date")}
                >
                  <Text
                    style={[
                      s.tabText,
                      { color: step === "date" ? c.primary : c.textMuted },
                    ]}
                  >
                    📅 Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    s.tab,
                    step === "time" && [
                      s.tabActive,
                      { borderBottomColor: c.primary },
                    ],
                  ]}
                  onPress={() =>
                    step === "date" && selectedDate && setStep("time")
                  }
                >
                  <Text
                    style={[
                      s.tabText,
                      { color: step === "time" ? c.primary : c.textMuted },
                    ]}
                  >
                    🕐 Time
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Body */}
              <View style={s.body}>
                {step === "date" && (
                  <Calendar
                    selectedDate={selectedDate}
                    currentMonth={currentMonth}
                    onDateSelect={setSelectedDate}
                    onMonthChange={changeMonth}
                  />
                )}
                {step === "time" && (
                  <TimePicker
                    hours={hours}
                    minutes={minutes}
                    onHoursChange={setHours}
                    onMinutesChange={setMinutes}
                  />
                )}
              </View>

              <TouchableOpacity
                style={[s.confirmBtn, { backgroundColor: c.primary }]}
                onPress={() => handleConfirm(onSelect, onClose)}
              >
                <Text style={s.confirmText}>
                  {step === "date" ? "Next →" : "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    overlay: { flex: 1, justifyContent: "flex-end" },
    sheet: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
    },
    backBtn: { padding: 4, marginRight: 12 },
    title: { fontSize: 17, fontWeight: "600" },
    tabs: { flexDirection: "row", borderBottomWidth: 1 },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    tabActive: {},
    tabText: { fontSize: 14, fontWeight: "600" },
    body: { padding: 16 },
    confirmBtn: {
      margin: 16,
      height: 50,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    confirmText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  });

export default DateTimePicker;
export { DAYS_OF_WEEK, MONTH_NAMES } from "./dateTimeConstants";
export { createDateTime, getDaysInMonth } from "./dateTimeUtils";
export { useDateTimePicker } from "./useDateTimePicker";
export { Calendar, TimePicker };
