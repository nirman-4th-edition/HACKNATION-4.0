import 'package:flutter/material.dart';
import 'package:mediq_remake/components/loginregisteritems.dart';
import 'package:mediq_remake/constants.dart';
import 'package:mediq_remake/pages/loginregisterpage.dart';
import 'package:mediq_remake/pages/mainpage.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: MaterialApp(
            theme: ThemeData.dark()
                .copyWith(scaffoldBackgroundColor: kBackgroundColor),
            debugShowCheckedModeBanner: false,
            home: const MainPage()));
  }
}
