import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import { Icons } from "../common/Icons";

const FAB = ({ onClick }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: c.primary }]}
      onPress={onClick}
      activeOpacity={0.8}
    >
      <Icons.Plus size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
});

export default FAB;
