import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/components/auth/LoginScreen";
import Alert from "./src/components/common/Alert";
import Loading from "./src/components/common/Loading";
import { AuthProvider } from "./src/contexts/AuthContext";
import { MenuProvider } from "./src/contexts/MenuContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import { logout, onAuthChange } from "./src/firebase";
import TaskScreen from "./src/pages/TaskScreen";
import { colors } from "./src/theme";

function AppContent() {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (firebaseUser) => {
    setUser(firebaseUser);
    setAlert({ message: "Welcome back!", type: "success" });
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setUser(null);
      setAlert({ message: "Logged out successfully", type: "success" });
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingScreen, { backgroundColor: c.background }]}>
        <Loading />
      </View>
    );
  }

  return (
    <AuthProvider user={user} isLoading={isLoading}>
      <MenuProvider>
        <View style={[styles.container, { backgroundColor: c.background }]}>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          {user ? (
            <TaskScreen user={user} onLogout={handleLogout} />
          ) : (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )}
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}
        </View>
      </MenuProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
