import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

export default function CustomSOSApp() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);
  const emergencyContact = "+919937727008"; // Replace with actual emergency contact number

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to send coordinates');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleSOS = async () => {
    setIsSOSActive(true);
    const locationMessage = `SOS! Help needed. My location: ${location?.latitude}, ${location?.longitude}`;
    Alert.alert('Emergency Alert!', `SOS signal sent!\nLocation: ${location?.latitude}, ${location?.longitude}`);
    
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync([emergencyContact], locationMessage);
    } else {
      Alert.alert('SMS Not Available', 'Could not send SMS. Please call emergency services.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={30} color="white" />
        <Text style={styles.headerText}>SOS Emergency</Text>
      </View>
      
      {/* Main SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Text style={styles.sosText}>SEND SOS</Text>
      </TouchableOpacity>
      
      {/* Status Message */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{isSOSActive ? 'Signal Sent!' : 'Press Button to Send SOS'}</Text>
      </View>
      
      {/* Location Display */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>
          Location: {location ? `${location.latitude}, ${location.longitude}` : 'Fetching location...'}
        </Text>
      </View>
      
      {/* Message Input */}
      <TextInput
        style={styles.messageBox}
        placeholder="Type additional details..."
        placeholderTextColor="gray"
        value={message}
        onChangeText={setMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sosButton: {
    width: 180,
    height: 180,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 5,
    borderColor: 'white',
  },
  sosText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  statusBar: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
  },
  messageBox: {
    marginTop: 20,
    width: '90%',
    height: 60,
    backgroundColor: '#424242',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
});
