// ignore_for_file: use_build_context_synchronously, constant_identifier_names, avoid_print
import 'dart:async';
import 'dart:io';
import 'package:image/image.dart' as img_lib;
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import './display_picture_screen.dart';

class CameraScreen extends StatefulWidget {
  final CameraDescription camera;
  const CameraScreen({super.key, required this.camera});

  @override
  State<CameraScreen> createState() => CameraScreenState();
}

class CameraScreenState extends State<CameraScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;
  final ImagePicker _picker = ImagePicker();
  bool _isFlashOn = false;
  String _selectedButton = "StreetSense"; // Add this line
  bool _isMoreAppsPressed = false;
  Color _viewfinderColor = Colors.white.withOpacity(0.3);
  bool _isIdealDistance = false;
  Timer? _distanceCheckTimer;
  double _distanceRatio = 1.0; // Add this variable to class

  @override
  void initState() {
    super.initState();
    _controller = CameraController(
      widget.camera,
      ResolutionPreset.medium, // Change this line
      enableAudio: false,
    );
    _initializeControllerFuture = _controller.initialize().then((_) {
      if (mounted) {
        _startDistanceCheck();
      }
    });
  }

  @override
  void dispose() {
    _distanceCheckTimer?.cancel();
    if (_isFlashOn) {
      _controller.setFlashMode(FlashMode.off);
    }
    _controller.dispose();
    super.dispose();
  }

  Future<void> _openGallery(BuildContext context) async {
    try {
      final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
      if (image != null && mounted) {
        await Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => DisplayPictureScreen(
              imagePath: image.path,
              fromGallery: true,
            ),
          ),
        );
      }
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  Future<void> _takePicture(BuildContext context) async {
    try {
      await _initializeControllerFuture;
      final image = await _controller.takePicture();

      if (!mounted) return;

      await _controller.setFlashMode(FlashMode.off);
      setState(() {
        _isFlashOn = false;
      });

      if (!mounted) return;

      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => DisplayPictureScreen(imagePath: image.path),
        ),
      );
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  void _startDistanceCheck() {
    _distanceCheckTimer =
        Timer.periodic(const Duration(milliseconds: 300), (_) {
      _checkDistance();
    });
  }

  Future<void> _checkDistance() async {
    if (!mounted || !_controller.value.isInitialized) return;

    try {
      final image = await _controller.takePicture();
      final bytes = await File(image.path).readAsBytes();
      final img = img_lib.decodeImage(bytes);

      if (img == null) return;

      final screenWidth = MediaQuery.of(context).size.width;
      final viewfinderWidth = screenWidth * 0.8;
      final viewfinderArea = viewfinderWidth * viewfinderWidth;
      final imageArea = img.width * img.height.toDouble();
      final ratio = imageArea / viewfinderArea;

      setState(() {
        _distanceRatio = ratio; // Update the state with the distance ratio
        if (ratio > 4.0) {
          _viewfinderColor = Colors.red.withOpacity(0.5);
          _isIdealDistance = false;
        } else if (ratio < 1.0) {
          _viewfinderColor = Colors.red.withOpacity(0.5);
          _isIdealDistance = false;
        } else {
          _viewfinderColor = Colors.green.withOpacity(0.5);
          _isIdealDistance = true;
        }
      });

      await File(image.path).delete();
    } catch (e) {
      debugPrint('Distance check error: $e');
    }
  }

  String _getDistanceStatus() {
    if (_distanceRatio > 2.0) return 'Move back';
    if (_distanceRatio < 0.5) return 'Move closer';
    return 'Perfect distance';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121212),
      body: Stack(
        children: [
          FutureBuilder<void>(
            future: _initializeControllerFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return CameraPreview(_controller);
              }
              return const Center(child: CircularProgressIndicator());
            },
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.close, color: Colors.white),
                        onPressed: () async {
                          if (_isFlashOn) {
                            await _controller.setFlashMode(FlashMode.off);
                          }
                          SystemNavigator.pop();
                        },
                      ),
                      Row(
                        children: [
                          IconButton(
                            icon: Icon(
                              _isFlashOn ? Icons.flash_on : Icons.flash_off,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              setState(() {
                                _isFlashOn = !_isFlashOn;
                                _controller.setFlashMode(
                                  _isFlashOn ? FlashMode.torch : FlashMode.off,
                                );
                              });
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.more_vert,
                                color: Colors.white),
                            onPressed: () {},
                          ),
                        ],
                      ),
                    ],
                  ),
                  const Text(
                    'StreetSense',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: Container(
              width: MediaQuery.of(context).size.width * 0.8,
              height: MediaQuery.of(context).size.width * 0.8,
              decoration: BoxDecoration(
                border: Border.all(color: _viewfinderColor, width: 2.0),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Stack(
                children: [
                  Positioned(
                    top: -2,
                    left: MediaQuery.of(context).size.width * 0.4 - 12,
                    child: Container(
                      width: 24,
                      height: 4,
                      color: _viewfinderColor,
                    ),
                  ),
                  Positioned(
                    bottom: -2,
                    left: MediaQuery.of(context).size.width * 0.4 - 12,
                    child: Container(
                      width: 24,
                      height: 4,
                      color: _viewfinderColor,
                    ),
                  ),
                  Positioned(
                    left: -2,
                    top: MediaQuery.of(context).size.width * 0.4 - 12,
                    child: Container(
                      width: 4,
                      height: 24,
                      color: _viewfinderColor,
                    ),
                  ),
                  Positioned(
                    right: -2,
                    top: MediaQuery.of(context).size.width * 0.4 - 12,
                    child: Container(
                      width: 4,
                      height: 24,
                      color: _viewfinderColor,
                    ),
                  ),
                  if (!_isIdealDistance)
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Distance Ratio: ${_distanceRatio.toStringAsFixed(2)}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              backgroundColor: Colors.black54,
                            ),
                          ),
                          Text(
                            _getDistanceStatus(),
                            style: TextStyle(
                              color: _viewfinderColor,
                              fontSize: 14,
                              backgroundColor: Colors.black54,
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          ),
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Column(
              children: [
                Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GestureDetector(
                        onTap: () => _openGallery(context),
                        child: Container(
                          width: 64,
                          height: 64,
                          margin: const EdgeInsets.only(right: 24),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white, width: 2),
                          ),
                          child: const Icon(Icons.photo_library, size: 24),
                        ),
                      ),
                      Container(
                        alignment: Alignment.center,
                        height: 64,
                        child: GestureDetector(
                          onTap: () => _takePicture(context),
                          child: Container(
                            width: 64,
                            height: 64,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.white, width: 3),
                            ),
                            child: const Icon(Icons.camera_alt, size: 28),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildBottomButton(Icons.delete_outline, "WasteSense"),
                    _buildBottomButton(Icons.add_road, "StreetSense"),
                    _buildBottomButton(Icons.grid_view, "More Apps"),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomButton(IconData icon, String label) {
    bool isMoreApps = label == "More Apps";
    bool isMoreAppsPressed = isMoreApps && _isMoreAppsPressed;

    return GestureDetector(
      onTapDown: (_) {
        if (isMoreApps) {
          setState(() => _isMoreAppsPressed = true);
        }
      },
      onTapUp: (_) {
        if (isMoreApps) {
          setState(() => _isMoreAppsPressed = false);
        }
      },
      onTapCancel: () {
        if (isMoreApps) {
          setState(() => _isMoreAppsPressed = false);
        }
      },
      onTap: () {
        if (!isMoreApps) {
          setState(() => _selectedButton = label);
        }
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: !isMoreApps && label == _selectedButton || isMoreAppsPressed
              ? const Color(0xFF4285F4).withOpacity(0.2)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: [
            Icon(icon,
                color:
                    !isMoreApps && label == _selectedButton || isMoreAppsPressed
                        ? const Color(0xFF4285F4)
                        : Colors.white,
                size: 24),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color:
                    !isMoreApps && label == _selectedButton || isMoreAppsPressed
                        ? const Color(0xFF4285F4)
                        : Colors.white,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
