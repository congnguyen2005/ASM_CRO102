import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ⬅️ thêm state thông báo lỗi
  const dispatch = useDispatch();

  // Animation
  const leafAnim1 = useRef(new Animated.Value(0)).current;
  const leafAnim2 = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const animateLeaves = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(leafAnim1, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(leafAnim1, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(leafAnim2, { toValue: -1, duration: 2500, useNativeDriver: true }),
          Animated.timing(leafAnim2, { toValue: 0, duration: 2500, useNativeDriver: true }),
        ])
      ).start();
    };
    animateLeaves();
  }, []);

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    setErrorMessage(""); // reset lỗi
    // Kiểm tra ràng buộc
    if (!email || !password) {
      setErrorMessage("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }

    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(storedUser);
      if (email === savedEmail && password === savedPassword) {
        dispatch(loginSuccess(email));
        navigation.replace("Home");
      } else {
        setErrorMessage("Sai email hoặc mật khẩu!");
      }
    } else {
      setErrorMessage("Không tìm thấy tài khoản, vui lòng đăng ký.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#E8F5E9" }}>
        {/* HEADER */}
        <LinearGradient
          colors={["#A8E6CF", "#C5E1A5", "#F1F8E9"]}
          style={styles.headerGradient}
        >
          <Image source={require("../assets/bg.png")} style={styles.headerImage} resizeMode="cover" />
          <Animated.Image
            source={require("../assets/leaf1.png")}
            style={[styles.leafDecoration1, { transform: [{ rotate: leafAnim1.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "6deg"] }) }] }]}
          />
          <Animated.Image
            source={require("../assets/leaf2.png")}
            style={[styles.leafDecoration2, { transform: [{ rotate: leafAnim2.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "-6deg"] }) }] }]}
          />
          <Image source={require("../assets/flower.png")} style={styles.flowerDecoration} />
        </LinearGradient>

        {/* CONTENT */}
        <View style={styles.container}>
          <Text style={styles.title}>🌿 Chào mừng đến Vườn Cây Cảnh</Text>
          <Text style={styles.subTitle}>
            Nơi nuôi dưỡng niềm đam mê xanh. Đăng nhập để khám phá!
          </Text>

          {/* INPUT */}
          <View style={{ marginTop: 15 }}>
            <View style={[styles.inputContainer, emailFocused && { borderColor: "#4CAF50", borderWidth: 2 }]}>
              <Image source={require("../assets/email_icon.png")} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email của bạn"
                value={email}
                placeholderTextColor="#999"
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View style={[styles.inputContainer, passwordFocused && { borderColor: "#4CAF50", borderWidth: 2 }]}>
              <Image source={require("../assets/lock_icon.png")} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Mật khẩu"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={showPassword ? require("../assets/eye_open.png") : require("../assets/eye_close.png")}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            {/* THÔNG BÁO LỖI */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity>
              <Text style={styles.forgotText}>Quên mật khẩu? Hãy nhớ như chăm sóc cây!</Text>
            </TouchableOpacity>

            {/* LOGIN BUTTON */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <LinearGradient colors={["#66BB6A", "#43A047"]} style={styles.button}>
                <TouchableOpacity onPress={handleLogin} style={styles.buttonTouchable}>
                  <Text style={styles.buttonText}>🌱 Đăng nhập & Phát triển</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>Hoặc</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* SOCIAL BUTTONS */}
            <View style={styles.socialContainer}>
              <LinearGradient colors={["#FFEB3B", "#FFC107"]} style={styles.socialButton}>
                <TouchableOpacity style={styles.socialTouchable}>
                  <Image source={require("../assets/google.png")} style={styles.socialIcon} />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={["#2196F3", "#1976D2"]} style={styles.socialButton}>
                <TouchableOpacity style={styles.socialTouchable}>
                  <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* REGISTER LINK */}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.bottomText}>
                Chưa có tài khoản? <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Hãy trồng một cái mới!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  headerGradient: {
    width: "100%",
    height: height * 0.35,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  headerImage: {
    width: "90%",
    height: "80%",
    borderRadius: 50,
    opacity: 0.85,
  },
  leafDecoration1: { position: "absolute", top: 25, left: 20, width: 60, height: 60, opacity: 0.85 },
  leafDecoration2: { position: "absolute", bottom: 25, right: 20, width: 55, height: 55, opacity: 0.85 },
  flowerDecoration: { position: "absolute", top: 40, right: 50, width: 40, height: 40, opacity: 0.9 },
  eyeButton: { position: "absolute", right: 15, padding: 5 },
  eyeIcon: { width: 22, height: 22, tintColor: "#4CAF50" },
  container: {
    paddingHorizontal: 25,
    marginTop: -60,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    minHeight: height * 0.65,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#2E7D32", textAlign: "center", fontFamily: "serif", marginBottom: 5 },
  subTitle: { fontSize: 16, textAlign: "center", color: "#8D6E63", marginBottom: 25, fontStyle: "italic" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F8E9", padding: 14, borderRadius: 25, borderWidth: 1, borderColor: "#C8E6C9", marginBottom: 15 },
  inputIcon: { width: 24, height: 24, marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  forgotText: { textAlign: "right", color: "#4CAF50", marginBottom: 15, fontSize: 13, fontStyle: "italic" },
  button: { borderRadius: 35, marginTop: 10, shadowColor: "#4CAF50", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  buttonTouchable: { paddingVertical: 16, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#C8E6C9" },
  orText: { marginHorizontal: 10, color: "#4CAF50", fontWeight: "bold" },
  socialContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  socialButton: { borderRadius: 30, marginHorizontal: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  socialTouchable: { padding: 14, alignItems: "center" },
  socialIcon: { width: 42, height: 42 },
  bottomText: { textAlign: "center", marginTop: 20, color: "#757575", fontStyle: "italic" },
    errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
