import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMenu } from "../../contexts/MenuContext";
import { useTheme } from "../../contexts/ThemeContext";
import { colors } from "../../theme";
import { Icons } from "../common/Icons";
import { ThemeToggle } from "../common/ThemeToggle";

const Menu = ({ user, showFilter, onToggleFilter, onLogout, onDownload }) => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const s = makeStyles(c);
  const insets = useSafeAreaInsets();
  const handleItem = (cb) => {
    cb();
    setIsMenuOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={s.menuBtn}>
        <Icons.Menu size={22} color={c.text} />
      </TouchableOpacity>

      <Modal
        visible={isMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View style={[s.overlay, { backgroundColor: c.overlay }]}>
            <TouchableWithoutFeedback>
              <View style={[s.drawer, { backgroundColor: c.surface }]}>
                <View style={{ paddingTop: insets.top }}>
                  <View
                    style={[s.drawerHeader, { borderBottomColor: c.border }]}
                  >
                    <Text
                      style={[s.userName, { color: c.text }]}
                      numberOfLines={1}
                    >
                      {user}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsMenuOpen(false)}
                      style={s.closeBtn}
                    >
                      <Icons.X size={20} color={c.text} />
                    </TouchableOpacity>
                  </View>

                  <View style={s.section}>
                    <Text style={[s.sectionTitle, { color: c.textMuted }]}>
                      Theme
                    </Text>
                    <View style={s.menuItem}>
                      <ThemeToggle />
                      <Text style={[s.menuItemText, { color: c.text }]}>
                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                      </Text>
                    </View>
                  </View>

                  <View style={[s.divider, { backgroundColor: c.border }]} />

                  <View style={s.section}>
                    <Text style={[s.sectionTitle, { color: c.textMuted }]}>
                      Actions
                    </Text>
                    <TouchableOpacity
                      style={s.menuItem}
                      onPress={() => handleItem(onDownload)}
                    >
                      <Icons.Download size={20} color={c.primary} />
                      <Text style={[s.menuItemText, { color: c.text }]}>
                        Download Tasks
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.menuItem}
                      onPress={() => handleItem(onToggleFilter)}
                    >
                      {showFilter ? (
                        <Icons.X size={20} color={c.primary} />
                      ) : (
                        <Icons.Filter size={20} color={c.primary} />
                      )}
                      <Text style={[s.menuItemText, { color: c.text }]}>
                        {showFilter ? "Hide Filter" : "Show Filter"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.menuItem}
                      onPress={() => handleItem(onLogout)}
                    >
                      <Icons.Logout size={20} color={c.danger} />
                      <Text style={[s.menuItemText, { color: c.danger }]}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    menuBtn: { padding: 8, borderRadius: 10 },
    overlay: { flex: 1 },
    drawer: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "75%",
      maxWidth: 300,
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      elevation: 20,
    },
    drawerHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      paddingTop: 20,
      borderBottomWidth: 1,
    },
    userName: { fontSize: 16, fontWeight: "700", flex: 1, marginRight: 12 },
    closeBtn: { padding: 4 },
    section: { padding: 16 },
    sectionTitle: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 10,
    },
    menuItemText: { fontSize: 15, fontWeight: "500" },
    divider: { height: 1, marginHorizontal: 16 },
  });

export default Menu;
