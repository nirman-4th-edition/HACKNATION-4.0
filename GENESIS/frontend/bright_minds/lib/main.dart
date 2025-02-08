import 'package:bright_minds/screens/splash.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(BrightMindsApp());
}

class BrightMindsApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
    );
  }
}
