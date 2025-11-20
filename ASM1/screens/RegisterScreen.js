import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{9,12}$/.test(phone);

  const handleRegister = async () => {
    setErrorMessage(""); // reset lỗi
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }
    if (!validatePhone(phone)) {
      setErrorMessage("Số điện thoại không hợp lệ (9-12 chữ số).");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải từ 6 ký tự trở lên.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    const userData = { fullName, email, phone, password };
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    alert("Đăng ký thành công!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#E8F5E9" }}>
        {/* Header */}
        <LinearGradient
          colors={["#A8E6CF", "#DCE775", "#F1F8E9"]}
          style={styles.headerGradient}
        >
          <Image
            source={require("../assets/bg.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/leaf1.png")}
            style={styles.leafDecoration1}
          />
          <Image
            source={require("../assets/leaf2.png")}
            style={styles.leafDecoration2}
          />
        </LinearGradient>

        <View style={styles.container}>
          <Text style={styles.title}>🌿 Đăng ký tài khoản</Text>
          <Text style={styles.subtitle}>
            Tham gia cộng đồng yêu cây cảnh của chúng tôi!
          </Text>

          {/* Input */}
          {[ 
            { placeholder: "Họ và tên", value: fullName, onChange: setFullName, icon: require("../assets/user_icon.png"), keyboard: "default" },
            { placeholder: "Email", value: email, onChange: setEmail, icon: require("../assets/email_icon.png"), keyboard: "email-address" },
            { placeholder: "Số điện thoại", value: phone, onChange: setPhone, icon: require("../assets/phone_icon.png"), keyboard: "phone-pad" },
          ].map((input, idx) => (
            <View key={idx} style={styles.inputContainer}>
              <Image source={input.icon} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={input.placeholder}
                value={input.value}
                onChangeText={input.onChange}
                keyboardType={input.keyboard}
              />
            </View>
          ))}

          {/* Password */}
          <View style={styles.inputContainer}>
            <Image source={require("../assets/lock_icon.png")} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? require("../assets/eye_open.png") : require("../assets/eye_close.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/lock_icon.png")} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={showConfirmPassword ? require("../assets/eye_open.png") : require("../assets/eye_close.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Hiển thị lỗi */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Text style={styles.policyText}>
            Bằng việc đăng ký, bạn đồng ý{" "}
            <Text style={styles.link}>Điều khoản & Điều kiện</Text> và{" "}
            <Text style={styles.link}>Chính sách riêng tư</Text>.
          </Text>

          {/* Register button */}
          <LinearGradient colors={["#66BB6A", "#43A047"]} style={styles.button}>
            <TouchableOpacity onPress={handleRegister} style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>🌱 Đăng ký ngay</Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={{ textAlign: "center", marginVertical: 15, color: "#388E3C" }}>Hoặc</Text>

          {/* Social buttons */}
          <View style={styles.socialRow}>
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

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkCenter}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  headerGradient: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "85%",
    height: 220,
    borderRadius: 50,
    opacity: 0.85,
  },
  leafDecoration1: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    opacity: 0.7,
  },
  leafDecoration2: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 45,
    height: 45,
    opacity: 0.7,
  },
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
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2E7D32",
    textAlign: "center",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 16,
    color: "#8D6E63",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F8E9",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    marginBottom: 18,
    shadowColor: "#A5D6A7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#4CAF50",
  },
  button: {
    borderRadius: 35,
    marginTop: 20,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonTouchable: {
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  policyText: {
    fontSize: 12,
    marginBottom: 15,
    color: "#757575",
    textAlign: "center",
  },
  link: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  socialButton: {
    borderRadius: 30,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  socialTouchable: {
    padding: 14,
    alignItems: "center",
  },
  socialIcon: {
    width: 42,
    height: 42,
  },
  linkCenter: {
    textAlign: "center",
    color: "#4CAF50",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
    errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});


export default RegisterScreen;
