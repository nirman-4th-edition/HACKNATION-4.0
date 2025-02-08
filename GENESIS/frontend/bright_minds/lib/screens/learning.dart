import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:audioplayers/audioplayers.dart';
import 'dart:io';
import 'dart:convert';
import 'dart:typed_data';

class LearningPage extends StatefulWidget {
  @override
  _LearningPageState createState() => _LearningPageState();
}

class _LearningPageState extends State<LearningPage> {
  TextEditingController textController = TextEditingController();
  final AudioPlayer audioPlayer = AudioPlayer();

  Future<void> _sendTextToApi() async {
    String inputText = textController.text.trim();

    if (inputText.isEmpty) {
      print("Text is empty!");
      return;
    }

    try {
      var url = Uri.parse('http://192.168.137.136:5000/text-to-speech');

      // Send POST request with JSON payload
      var response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({'text': inputText}),
      );

      print("response ${response}");
      //
      if (response.statusCode == 200) {
        // Convert response body to bytes
        Uint8List audioBytes = response.bodyBytes;

        print("audiobytes ${audioBytes}");
        // // Play the audio from bytes
        await audioPlayer.play(BytesSource(audioBytes));

      } else {
        print('Failed to get audio: ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.green[200],
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Alphabets',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
        centerTitle: true,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Text Input Field
            TextField(
              controller: textController,
              decoration: InputDecoration(
                hintText: 'Enter text here',
                filled: true,
                fillColor: Colors.purple[50],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            SizedBox(height: 20),

            // Convert to Speech Button
            Center(
              child: ElevatedButton(
                onPressed: _sendTextToApi,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  side: BorderSide(color: Colors.black),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Text(
                  'Click on convert text to speech',
                  style: TextStyle(color: Colors.black),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
