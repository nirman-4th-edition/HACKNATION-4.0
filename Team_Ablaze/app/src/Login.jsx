import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const handleLogin = async () => {
    // Validate email format
    if (!email || !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Password strength check (optional but recommended)
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Successful Login:", {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        loginTimestamp: new Date().toISOString(),
      });
      // Additional checks after successful login
      if (userCredential.user.emailVerified) {
        navigation.replace("Home");
      } else {
        Alert.alert(
          "Email Verification",
          "Please verify your email before logging in.",
          [{ text: "OK", onPress: () => auth.signOut() }]
        );
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login attempts. Please try again later.";
          break;
      }

      Alert.alert("Login Error", errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address" // Use email keyboard type
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    marginTop: 15,
  },
});

export default Login;
