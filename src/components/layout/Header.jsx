import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import Menu from "./Menu";

const Header = ({
  user,
  taskCount,
  filteredCount,
  showFilter,
  onToggleFilter,
  onLogout,
  onDownload,
}) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  return (
    <View
      style={[
        styles.header,
        { backgroundColor: c.surface, borderBottomColor: c.border },
      ]}
    >
      <View style={styles.inner}>
        <Menu
          user={user}
          showFilter={showFilter}
          onToggleFilter={onToggleFilter}
          onLogout={onLogout}
          onDownload={onDownload}
        />
        <View style={styles.center}>
          {taskCount > 0 && (
            <Text style={[styles.stats, { color: c.textSecondary }]}>
              {filteredCount}/{taskCount} tasks
            </Text>
          )}
        </View>
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    zIndex: 10,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  center: { flex: 1, alignItems: "center" },
  spacer: { width: 38 },
  stats: { fontSize: 13, fontWeight: "500" },
});

export default Header;
