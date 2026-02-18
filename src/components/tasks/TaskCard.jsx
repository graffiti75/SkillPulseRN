import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import { formatDateTime } from "../../utils/dateUtils";
import { Icons } from "../common/Icons";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const s = makeStyles(c);

  return (
    <View style={s.card}>
      <View style={s.header}>
        <Text style={s.taskId}>{task.id}</Text>
        <View style={s.actions}>
          <TouchableOpacity onPress={() => onEdit(task)} style={s.actionBtn}>
            <Icons.Edit size={16} color={c.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(task)}
            style={[s.actionBtn, s.deleteBtn]}
          >
            <Icons.Trash size={16} color={c.danger} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={s.description} numberOfLines={3}>
        {task.description}
      </Text>
      <View style={s.times}>
        <View style={s.timeRow}>
          <Icons.Clock size={13} color={c.textMuted} />
          <Text style={s.timeLabel}>Start: </Text>
          <Text style={s.timeValue}>{formatDateTime(task.startTime)}</Text>
        </View>
        <View style={s.timeRow}>
          <Icons.Clock size={13} color={c.textMuted} />
          <Text style={s.timeLabel}>End: </Text>
          <Text style={s.timeValue}>{formatDateTime(task.endTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: c.border,
      shadowColor: c.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    taskId: {
      fontSize: 11,
      color: c.textMuted,
      fontFamily: "monospace",
      fontWeight: "500",
    },
    actions: { flexDirection: "row", gap: 4 },
    actionBtn: { padding: 6, borderRadius: 8, backgroundColor: c.primaryLight },
    deleteBtn: { backgroundColor: c.dangerLight },
    description: {
      fontSize: 15,
      color: c.text,
      marginBottom: 12,
      lineHeight: 22,
    },
    times: { gap: 6 },
    timeRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    timeLabel: { fontSize: 12, color: c.textMuted, fontWeight: "600" },
    timeValue: { fontSize: 12, color: c.textSecondary, flex: 1 },
  });

export default TaskCard;
