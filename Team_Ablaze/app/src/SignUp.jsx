import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
// import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from "expo-router";

const SignUp = () => {
//   const navigation = useNavigation();
const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user data to Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        language: language,
        createdAt: serverTimestamp(),
      });

      // Navigate to Details component after successful authentication
      router.replace('../Details');
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.error("Firebase Error:", error);
      let errorMessage = "An error occurred during sign up";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already registered";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/password accounts are not enabled";
          break;
        case 'auth/weak-password':
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 10,
        }}
      >
        Create an account✨
      </Text>
      <Text style={{ color: "#bbb", marginBottom: 20 }}>
        Welcome! Please enter your details.
      </Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#bbb"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#bbb"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Language Selector */}
      <View style={styles.inputContainer}>
        <Text style={{ color: "#bbb", marginRight: 10 }}>Language:</Text>
        <TouchableOpacity
          onPress={() => setShowLanguageOptions(true)}
          style={styles.languageButton}
        >
          <Text style={{ color: "#fff" }}>
            {language === "en"
              ? "English"
              : language === "hi"
              ? "Hindi"
              : "Odia"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Language Dropdown Modal */}
      <Modal
        transparent={true}
        visible={showLanguageOptions}
        animationType="slide"
        onRequestClose={() => setShowLanguageOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <View style={styles.languageOptionsRow}>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("en");
                  setShowLanguageOptions(false);
                }}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("hi");
                  setShowLanguageOptions(false);
                }}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>Hindi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("od");
                  setShowLanguageOptions(false);
                }}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>Odia</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setShowLanguageOptions(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Register Button */}
      <TouchableOpacity 
        onPress={handleSubmit} 
        style={{ marginTop: 20 }}
        disabled={isLoading}
      >
        <View style={[styles.button, { backgroundColor: "#ff7eb3" }]}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={{ color: "#bbb", textAlign: "center", marginTop: 15 }}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: "#ff758c" }}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};


const styles = {
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  picker: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  languageButton: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  languageOptions: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
  },
  languageOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    backgroundColor: "#2E2E2E",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  optionText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff7eb3",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
};

export default SignUp;
