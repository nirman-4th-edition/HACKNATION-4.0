import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';

const Details = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('Male'); // Default gender
    const [age, setAge] = useState('');
    const [familyMembers, setFamilyMembers] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log({
            name,
            phoneNumber,
            gender,
            age,
            familyMembers,
        });
        // You can add further logic to process the data
    };

    return (
        <View style={{ padding: 20, backgroundColor: '#FFFFFF' }}>
            <Text style={{ fontSize: 24 }}>User Details</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Text>Gender</Text>
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={{ marginBottom: 10 }}
            >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
                keyboardType="numeric" // Numeric keyboard for age input
            />
            <TextInput
                placeholder="Family Members (optional)"
                value={familyMembers}
                onChangeText={setFamilyMembers}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Details;
