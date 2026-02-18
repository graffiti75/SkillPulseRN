import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import { Icons } from "../common/Icons";

const EmptyState = () => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: c.primaryLight }]}>
        <Icons.Inbox size={40} color={c.primary} />
      </View>
      <Text style={[styles.title, { color: c.text }]}>No tasks yet</Text>
      <Text style={[styles.text, { color: c.textSecondary }]}>
        Tap the + button to create your first task and start tracking your
        productivity.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  text: { fontSize: 14, textAlign: "center", lineHeight: 22 },
});

export default EmptyState;
