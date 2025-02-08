import 'dart:async';

import 'package:flutter/material.dart';

import 'biodata.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(  // Added Center widget here
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center, // Ensures horizontal centering
            children: [
              Spacer(),
              // App Logo
              Image.asset('assets/logo.jpg', height: 200),

              SizedBox(height: 20), // Added space between logo and text

              // App Name
              Text(
                'Bright Minds',
                textAlign: TextAlign.center, // Ensures text is centered
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[700],
                ),
              ),
              Spacer(),
              // Floating Action Button to navigate to BioData page
              Container(
                width: 200,
                child: FloatingActionButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => BioData()),
                    );
                  },
                  backgroundColor: Colors.green[700],
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Center(
                      child: Row(
                        children: [
                          Image.asset('assets/google.png'),
                           SizedBox(width: 10,),
                           Text("Login with Google", style: TextStyle(color: Colors.black),)
                        ],
                      )
                    ),
                  ),
                ),
              ),
              SizedBox(height: 50),
            ],
          ),
        ),
      ),
    );
  }
}
