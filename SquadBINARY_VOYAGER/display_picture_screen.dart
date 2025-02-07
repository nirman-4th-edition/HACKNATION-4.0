// ignore_for_file: constant_identifier_names, avoid_print, sized_box_for_whitespace

import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image/image.dart' as img_lib;

class DisplayPictureScreen extends StatefulWidget {
  final String imagePath;
  final bool fromGallery;

  const DisplayPictureScreen({
    super.key,
    required this.imagePath,
    this.fromGallery = false,
  });

  @override
  State<DisplayPictureScreen> createState() => _DisplayPictureScreenState();
}

class _DisplayPictureScreenState extends State<DisplayPictureScreen> {
  static const API_KEY = "7v3Mm2xjjrLD5eHkRiV2";
  static const MODEL_ENDPOINT = "road-damage-detection-apxtk/5";
  Map<String, dynamic>? detections;
  bool isLoading = true;
  String? error;

  double getConfidenceThreshold(Size imageSize, Size damageSize) {
    double damageArea = damageSize.width * damageSize.height;
    double imageArea = imageSize.width * imageSize.height;
    double ratio = damageArea / imageArea;

    if (ratio > 0.5) return 20; // Very close shots
    if (ratio < 0.1) return 5; // Far shots
    return 10; // Default
  }

  String getDisplayClass(String originalClass) {
    originalClass = originalClass.toLowerCase();
    if (originalClass.contains('longitudinal') ||
        originalClass.contains('aligator')) {
      return 'CRACKS';
    }
    return originalClass.toUpperCase();
  }

  @override
  void initState() {
    super.initState();
    analyzeImage();
  }

  Future<void> analyzeImage() async {
    if (!mounted) return;

    try {
      final bytes = await File(widget.imagePath).readAsBytes();
      print('Image read successfully from: ${widget.imagePath}');
      print('Image size: ${bytes.length} bytes');

      final image = img_lib.decodeImage(bytes);
      if (image == null) throw Exception('Failed to decode image');

      final compressedImg = img_lib.copyResize(
        image,
        width: widget.fromGallery ? 620 : 640,
        height: widget.fromGallery
            ? 620
            : (640 * image.height / image.width).round(),
      );
      final compressedBytes = img_lib.encodeJpg(compressedImg, quality: 100);
      final base64Image = base64Encode(compressedBytes);

      final url = Uri.parse('https://detect.roboflow.com/$MODEL_ENDPOINT')
          .replace(queryParameters: {
        'api_key': API_KEY,
        'confidence': getConfidenceThreshold(
                Size(image.width.toDouble(), image.height.toDouble()),
                Size(compressedImg.width.toDouble(),
                    compressedImg.height.toDouble()))
            .toString(),
        'overlap': '20',
      });

      final response = await http
          .post(
            url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: base64Image,
          )
          .timeout(const Duration(seconds: 30));

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (!mounted) return;

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        print('API Response: $responseData');

        setState(() {
          detections = responseData;
          isLoading = false;
          error = null;
        });
      } else {
        throw Exception('Failed to analyze image: ${response.statusCode}');
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        isLoading = false;
        error = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121212),
      appBar: AppBar(
        title: const Text('Damage Analysis',
            style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.black,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: isLoading
          ? Stack(
              children: [
                Center(
                  child: SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: MediaQuery.of(context).size.height * 0.6,
                    child: Image.file(
                      File(widget.imagePath),
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Positioned.fill(
                  child: Container(
                    color: Colors.black.withOpacity(0.75),
                    child: const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation<Color>(
                                Color(0xFF4285F4)),
                          ),
                          SizedBox(height: 16),
                          Text('Analyzing image...',
                              style: TextStyle(color: Colors.white)),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            )
          : SingleChildScrollView(
              child: Column(
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: MediaQuery.of(context).size.height * 0.6,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        Image.file(
                          File(widget.imagePath),
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                        if (detections != null)
                          CustomPaint(
                            painter: DamagePainter(
                                detections!, MediaQuery.of(context).size),
                          ),
                      ],
                    ),
                  ),
                  if (error != null)
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          Text(
                            'Error: ${error!.replaceAll('Exception: ', '')}',
                            style: const TextStyle(color: Colors.white),
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF4285F4),
                            ),
                            onPressed: analyzeImage,
                            child: const Text('Retry',
                                style: TextStyle(color: Colors.white)),
                          ),
                        ],
                      ),
                    )
                  else if (detections != null &&
                      detections!['predictions'] != null)
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E1E1E),
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.3),
                              blurRadius: 10,
                            ),
                          ],
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Damage Detection Results',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF4285F4),
                                ),
                              ),
                              const SizedBox(height: 20),
                              ...detections!['predictions']
                                  .where((pred) => ![
                                        'white line blur',
                                        'bump',
                                        'cross walk blur',
                                        'white line',
                                        'wheel marks'
                                      ].contains(pred['class']
                                          .toString()
                                          .toLowerCase()))
                                  .map<Widget>((pred) {
                                return Container(
                                  margin: const EdgeInsets.only(bottom: 16),
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        color: const Color(0xFF4285F4)
                                            .withOpacity(0.2)),
                                    borderRadius: BorderRadius.circular(12),
                                    color: const Color(0xFF2A2A2A),
                                  ),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Row(
                                        children: [
                                          const Icon(
                                              Icons.warning_amber_rounded,
                                              color: Color(0xFF4285F4)),
                                          const SizedBox(width: 12),
                                          Text(
                                            getDisplayClass(
                                                pred['class'].toString()),
                                            style: const TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w600,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ],
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 12,
                                          vertical: 6,
                                        ),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF4285F4),
                                          borderRadius:
                                              BorderRadius.circular(20),
                                        ),
                                        child: Text(
                                          '${(pred['confidence'] * 100).toInt()}%',
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              }).toList(),
                            ],
                          ),
                        ),
                      ),
                    )
                  else
                    const Padding(
                      padding: EdgeInsets.all(16),
                      child: Text(
                        'No damage detected in this image. Try another image or angle.',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                ],
              ),
            ),
    );
  }
}

class DamagePainter extends CustomPainter {
  final Map<String, dynamic> detections;
  final Size screenSize;

  DamagePainter(this.detections, this.screenSize);

  @override
  void paint(Canvas canvas, Size size) {
    if (detections['predictions'] == null) return;

    for (var pred in detections['predictions'] as List) {
      if ((pred['width'] * pred['height']) /
              (detections['image']['width'] * detections['image']['height']) >
          0.7) {
        continue; // Skip if detection is too large
      }

      String className = pred['class'].toString().toLowerCase();
      if ([
        'white line blur',
        'bump',
        'cross walk blur',
        'white line',
        'wheel marks'
      ].contains(className)) {
        continue;
      }

      // Set colors and rename labels
      Color boxColor;
      String displayLabel = pred['class'];

      if (className.contains('pothole')) {
        boxColor = const Color(0xFF006400);
        displayLabel = "Potholes";
      } else if (className.contains('longitudinal')) {
        boxColor = const Color(0xFFFF0000);
        displayLabel = "Cracks";
      } else if (className.contains('aligator')) {
        boxColor = const Color(0xFFFF0000);
        displayLabel = "Cracks";
      } else {
        boxColor = const Color(0xFFFFFF00);
      }

      try {
        double x = (pred['x'] as num).toDouble();
        double y = (pred['y'] as num).toDouble();
        double w = (pred['width'] as num).toDouble();
        double h = (pred['height'] as num).toDouble();

        x = (x - w / 2) * size.width / detections['image']['width'];
        y = (y - h / 2) * size.height / detections['image']['height'];
        w = w * size.width / detections['image']['width'];
        h = h * size.height / detections['image']['height'];

        final rect = Rect.fromLTWH(x, y, w, h);
        canvas.drawRect(
            rect,
            Paint()
              ..color = boxColor
              ..style = PaintingStyle.stroke
              ..strokeWidth = 3.0);

        final labelText =
            '$displayLabel: ${(pred['confidence'] * 100).toInt()}%';
        final textPainter = TextPainter(
          text: TextSpan(
            text: labelText,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          textDirection: TextDirection.ltr,
        )..layout();

        canvas.drawRect(
          Rect.fromLTWH(x, y - 25, textPainter.width + 10, 25),
          Paint()..color = boxColor,
        );

        textPainter.paint(canvas, Offset(x + 5, y - 22));
      } catch (e) {
        print('Error drawing box: $e');
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
