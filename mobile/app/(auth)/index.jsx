import { View, Text, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native'
import {} from "expo-router";
import styles from "../../assets/styles/login.styles";
import { useState } from "react";
import {} from "@expo/vector-icons";
import COLORS from '../../constants/colors';
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading, login, isCheckingAuth} = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);

    if (!result.success) Alert.alert("Error", result.error);
  };

  if (isCheckingAuth) return null;
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/i.png")}
            style={styles.illustrationImage}
            resizeMode='contain'
          />
        </View>

        
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login