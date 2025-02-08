
import 'package:flutter/material.dart';

import 'home.dart';

class BioData extends StatefulWidget {
  @override
  _BioDataState createState() => _BioDataState();
}

class _BioDataState extends State<BioData> {
  String selectedAge = '4';
  String selectedClass = 'LKG';


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 30,
                    // backgroundImage: AssetImage('assets/profile.jpg'), // Replace with actual image
                  ),
                  SizedBox(width: 10,),
                  Text(
                    'Hello Swastik!!',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 40,),
              // Form Container
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green[400],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Age Dropdown
                    Text('Age', style: TextStyle(fontSize: 16)),
                    SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      value: selectedAge,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide.none,
                        ),
                      ),
                      items: ['4', '5', '6', '7', '8', '9', '10']
                          .map((age) => DropdownMenuItem(
                        value: age,
                        child: Text(age),
                      ))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          selectedAge = value!;
                        });
                      },
                    ),
                    SizedBox(height: 20),
                    // Class Dropdown
                    Text('Class', style: TextStyle(fontSize: 16)),
                    SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      value: selectedClass,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide.none,
                        ),
                      ),
                      items: ['LKG', 'UKG', '1', '2', '3', '4', '5']
                          .map((cls) => DropdownMenuItem(
                        value: cls,
                        child: Text(cls),
                      ))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          selectedClass = value!;
                        });
                      },
                    ),
                    SizedBox(height: 20),

                    // Submit Button
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                         // primary: Colors.pink[100],
                         // onPrimary: Colors.black,
                          padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),

                        onPressed: () {
                          // Handle form submission
                          print('Age: $selectedAge');
                          print('Class: $selectedClass');
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => HomePage()),
                          );
                        },
                        child: Text('Submit'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
