
import 'package:bright_minds/screens/writing.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import 'learning.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Greeting Text
            SizedBox(height: 20,),
            Text(
              'Hello Swastik!!',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),

            // Progress Bar
            LinearProgressIndicator(
              value: 0.4, // This represents 40% completion
              backgroundColor: Colors.grey[300],
              color: Colors.green[700],
              minHeight: 8,
            ),
            SizedBox(height: 20),

            Text(
              'Learning Modules',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black,
                decoration: TextDecoration.underline,
              ),
            ),
            SizedBox(height: 10),

            // Alphabet Module Card
            GestureDetector(
              onTap: ()=>{
              Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => LearningPage()),
              )
              },
              child: ModuleCard(
                icon: Icons.text_fields,
                title: 'Alphabets',
              ),
            ),

            SizedBox(height: 20),

            // Writing Exercise Section
            Text(
              'Writing Exercise',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),

            // Writing Exercise Card
            GestureDetector(
              onTap: ()=>{
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => WritingExercisePage()),
                )
              },
              child: ModuleCard(
                icon: Icons.text_fields,
                title: 'Alphabets',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ModuleCard extends StatelessWidget {
  final IconData icon;
  final String title;

  ModuleCard({required this.icon, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.green[700],
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.grey[300],
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              icon,
              size: 40,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 10),
          Text(
            title,
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }
}
