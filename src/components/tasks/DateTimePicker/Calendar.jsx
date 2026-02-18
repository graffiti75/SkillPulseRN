import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { colors } from "../../../theme";
import { Icons } from "../../common/Icons";
import { DAYS_OF_WEEK, MONTH_NAMES } from "./dateTimeConstants";
import { getDaysInMonth } from "./dateTimeUtils";

const Calendar = ({
  selectedDate,
  currentMonth,
  onDateSelect,
  onMonthChange,
}) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const days = getDaysInMonth(currentMonth);
  const s = makeStyles(c);

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.monthLabel}>
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <View style={s.nav}>
          <TouchableOpacity onPress={() => onMonthChange(-1)} style={s.navBtn}>
            <Icons.ChevronLeft size={18} color={c.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onMonthChange(1)} style={s.navBtn}>
            <Icons.ChevronRight size={18} color={c.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Days header */}
      <View style={s.grid}>
        {DAYS_OF_WEEK.map((d) => (
          <View key={d} style={s.dayHeader}>
            <Text style={[s.dayHeaderText, { color: c.textMuted }]}>{d}</Text>
          </View>
        ))}
        {days.map((item, i) => {
          const isSelected =
            selectedDate?.toDateString() === item.date?.toDateString();
          return (
            <TouchableOpacity
              key={i}
              style={[
                s.day,
                item.empty && s.dayEmpty,
                item.isToday && [s.dayToday, { borderColor: c.primary }],
                isSelected && [s.daySelected, { backgroundColor: c.primary }],
              ]}
              onPress={() => !item.empty && onDateSelect(item.date)}
              disabled={item.empty}
            >
              <Text
                style={[
                  s.dayText,
                  {
                    color: item.empty
                      ? "transparent"
                      : isSelected
                        ? "#fff"
                        : item.isToday
                          ? c.primary
                          : c.text,
                  },
                ]}
              >
                {item.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    container: { paddingBottom: 8 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    monthLabel: { fontSize: 15, fontWeight: "600", color: c.text },
    nav: { flexDirection: "row", gap: 4 },
    navBtn: { padding: 6, borderRadius: 8, backgroundColor: c.surfaceAlt },
    grid: { flexDirection: "row", flexWrap: "wrap" },
    dayHeader: { width: "14.28%", alignItems: "center", paddingVertical: 4 },
    dayHeaderText: { fontSize: 11, fontWeight: "600" },
    day: {
      width: "14.28%",
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
    dayEmpty: {},
    dayToday: { borderWidth: 1.5 },
    daySelected: {},
    dayText: { fontSize: 13, fontWeight: "500" },
  });

export default Calendar;
