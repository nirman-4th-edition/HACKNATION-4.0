import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { auth, firestore } from './src/firebase';
import { doc, setDoc, getDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

const Details = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        gender: 'Male',
        age: '',
        familyMembers: '',
        email: ''
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setFormData(prev => ({ ...prev, email: user.email }));
                    
                    // Check if user details already exist
                    const userDetailsRef = doc(firestore, 'userDetails', user.uid);
                    const userDoc = await getDoc(userDetailsRef);
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFormData(prev => ({
                            ...prev,
                            name: userData.name || '',
                            phoneNumber: userData.phoneNumber || '',
                            gender: userData.gender || 'Male',
                            age: userData.age ? userData.age.toString() : '',
                            familyMembers: userData.familyMembers ? userData.familyMembers.toString() : ''
                        }));
                    }
                } else {
                    Alert.alert('Error', 'Please sign in first');
                    router.replace('/');
                }
            } catch (error) {
                console.error("Error getting user details:", error);
                Alert.alert("Error", "Failed to load user data. Please try again.");
            }
        };

        getCurrentUser();
    }, []);

    const validateForm = () => {
        const errors = [];
        
        if (!formData.name.trim()) {
            errors.push('Please enter your name');
        }
        
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!formData.age || isNaN(formData.age) || parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) {
            errors.push('Please enter a valid age between 1 and 120');
        }

        if (errors.length > 0) {
            Alert.alert('Validation Error', errors.join('\n'));
            return false;
        }
        
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                Alert.alert('Error', 'No user found. Please sign in again.');
                router.replace('/');
                return;
            }

            const userData = {
                userId: user.uid,
                name: formData.name,
                email: user.email,
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
                age: parseInt(formData.age),
                familyMembers: formData.familyMembers || '0',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Store in userDetails collection
            const userDetailsRef = doc(collection(firestore, 'userDetails'), user.uid);
            await setDoc(userDetailsRef, userData, { merge: true });

            Alert.alert(
                'Success', 
                'Details saved successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/home')
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving details:', error);
            Alert.alert(
                'Error', 
                'Failed to save details. Please check your connection and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Complete Your Profile</Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={20} color="#bbb" style={styles.icon} />
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#bbb"
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            style={styles.input}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="phone" size={20} color="#bbb" style={styles.icon} />
                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#bbb"
                            value={formData.phoneNumber}
                            onChangeText={(value) => handleInputChange('phoneNumber', value)}
                            keyboardType="phone-pad"
                            style={styles.input}
                            maxLength={15}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="users" size={20} color="#bbb" style={styles.icon} />
                        <TouchableOpacity
                            style={styles.genderButton}
                            onPress={() => handleInputChange('gender', formData.gender === 'Male' ? 'Female' : 'Male')}
                        >
                            <Text style={styles.genderText}>{formData.gender}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="calendar" size={20} color="#bbb" style={styles.icon} />
                        <TextInput
                            placeholder="Age"
                            placeholderTextColor="#bbb"
                            value={formData.age}
                            onChangeText={(value) => handleInputChange('age', value)}
                            keyboardType="numeric"
                            style={styles.input}
                            maxLength={3}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="users" size={20} color="#bbb" style={styles.icon} />
                        <TextInput
                            placeholder="Number of Family Members (optional)"
                            placeholderTextColor="#bbb"
                            value={formData.familyMembers}
                            onChangeText={(value) => handleInputChange('familyMembers', value)}
                            keyboardType="numeric"
                            style={styles.input}
                            maxLength={2}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[
                            styles.buttonContainer,
                            isLoading && styles.buttonDisabled
                        ]}
                        disabled={isLoading}
                    >
                        <View style={styles.button}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Save Details</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 20,
        paddingHorizontal: 20
    },
    form: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E1E1E",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        padding: 0,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: "#ff7eb3",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    genderButton: {
        flex: 1,
        padding: 5,
    },
    genderText: {
        color: "#fff",
        fontSize: 16,
    }
});

export default Details;