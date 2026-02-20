import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { login, signUp } from "../../firebase";
import { colors } from "../../theme";
import { Icons } from "../common/Icons";

const LoginScreen = ({ onLoginSuccess }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? "dark" : "light"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    setError("");
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) onLoginSuccess(result.user);
    else setError(result.error);
  };

  const handleSignUp = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    setError("");
    const result = await signUp(email, password);
    setIsLoading(false);
    if (result.success) onLoginSuccess(result.user);
    else setError(result.error);
  };

  const s = makeStyles(c);

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.card}>
          {/* Logo */}
          <View style={s.logoContainer}>
            <View style={s.logoIcon}>
              <Icons.Pulse size={28} color={c.primary} />
            </View>
            <Text style={s.title}>SkillPulse</Text>
            <Text style={s.subtitle}>
              Track your tasks, boost your productivity
            </Text>
          </View>

          {/* Error */}
          {!!error && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}

          {/* Email */}
          <View style={s.formGroup}>
            <Text style={s.label}>Email</Text>
            <View style={s.inputWrapper}>
              <View style={s.inputIcon}>
                <Icons.Mail size={16} color={c.textMuted} />
              </View>
              <TextInput
                style={s.input}
                placeholder="you@example.com"
                placeholderTextColor={c.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={s.formGroup}>
            <Text style={s.label}>Password</Text>
            <View style={s.inputWrapper}>
              <View style={s.inputIcon}>
                <Icons.Lock size={16} color={c.textMuted} />
              </View>
              <TextInput
                style={[s.input, { paddingRight: 44 }]}
                placeholder="••••••••"
                placeholderTextColor={c.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={s.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icons.EyeOff size={18} color={c.textMuted} />
                ) : (
                  <Icons.Eye size={18} color={c.textMuted} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View style={s.btnGroup}>
            <TouchableOpacity
              style={[
                s.btnPrimary,
                (!email || !password || isLoading) && s.btnDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={s.btnPrimaryText}>Log In</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                s.btnSecondary,
                (!email || !password || isLoading) && s.btnDisabled,
              ]}
              onPress={handleSignUp}
              disabled={isLoading || !email || !password}
            >
              <Text style={[s.btnSecondaryText, { color: c.primary }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
    card: {
      backgroundColor: c.surface,
      borderRadius: 20,
      padding: 28,
      shadowColor: c.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 5,
    },
    logoContainer: { alignItems: "center", marginBottom: 28 },
    logoIcon: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: c.primaryLight,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    title: { fontSize: 26, fontWeight: "700", color: c.text, marginBottom: 6 },
    subtitle: { fontSize: 14, color: c.textSecondary, textAlign: "center" },
    errorBox: {
      backgroundColor: c.dangerLight,
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.danger,
    },
    errorText: { color: c.danger, fontSize: 13, textAlign: "center" },
    formGroup: { marginBottom: 16 },
    label: {
      fontSize: 13,
      fontWeight: "600",
      color: c.textSecondary,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surfaceAlt,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 12,
    },
    inputIcon: { marginRight: 8 },
    input: { flex: 1, height: 48, color: c.text, fontSize: 15 },
    eyeBtn: { padding: 8 },
    btnGroup: { gap: 10, marginTop: 8 },
    btnPrimary: {
      backgroundColor: c.primary,
      borderRadius: 12,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    btnPrimaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    btnSecondary: {
      backgroundColor: c.primaryLight,
      borderRadius: 12,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: c.primary,
    },
    btnSecondaryText: { fontSize: 16, fontWeight: "600" },
    btnDisabled: { opacity: 0.5 },
  });

export default LoginScreen;
