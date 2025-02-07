// pubspec.yaml dependencies:
// camera: ^0.10.5+9
// path_provider: ^2.1.2
// path: ^1.8.3
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:path/path.dart';
// ignore: unused_import
import 'package:path_provider/path_provider.dart';
import 'package:flutter/services.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final cameras = await availableCameras();
  runApp(MyApp(cameras: cameras));
}

class MyApp extends StatelessWidget {
  final List<CameraDescription> cameras;

  const MyApp({super.key, required this.cameras});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: CameraScreen(camera: cameras.first),
    );
  }
}

class CameraScreen extends StatefulWidget {
  final CameraDescription camera;

  const CameraScreen({super.key, required this.camera});

  @override
  State<CameraScreen> createState() => CameraScreenState();
}

class CameraScreenState extends State<CameraScreen> {
  bool _isFlashOn = false;
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;
  double? focusX;
  double? focusY;

  @override
  void initState() {
    super.initState();
    _controller = CameraController(
      widget.camera,
      ResolutionPreset.high,
    );
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    if (_isFlashOn) {
      _controller.setFlashMode(FlashMode.off);
    }
    _controller.dispose();
    super.dispose();
  }

  Future<void> onViewFinderTap(
      TapDownDetails details, BoxConstraints constraints) async {
    final offset = Offset(
      details.localPosition.dx / constraints.maxWidth,
      details.localPosition.dy / constraints.maxHeight,
    );

    setState(() {
      focusX = details.localPosition.dx;
      focusY = details.localPosition.dy;
    });

    await _controller.setFocusPoint(offset);
    await _controller.setExposurePoint(offset);
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

      // ignore: use_build_context_synchronously
      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => DisplayPictureScreen(imagePath: image.path),
        ),
      );
    } catch (e) {
      // Error handling
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          FutureBuilder<void>(
            future: _initializeControllerFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return LayoutBuilder(
                  builder: (context, constraints) {
                    return GestureDetector(
                      onTapDown: (details) =>
                          onViewFinderTap(details, constraints),
                      child: CameraPreview(_controller),
                    );
                  },
                );
              }
              return const Center(child: CircularProgressIndicator());
            },
          ),
          Center(
            child: Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  width: MediaQuery.of(context).size.width * 0.8,
                  height: MediaQuery.of(context).size.width * 0.8,
                  decoration: BoxDecoration(
                    border: Border.all(
                        color: Colors.white.withOpacity(0.3), width: 1.5),
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                Positioned(
                  top: -2,
                  child: Container(
                    width: 1.5,
                    height: 25,
                    color: Colors.white.withOpacity(0.3),
                  ),
                ),
                Positioned(
                  bottom: -2,
                  child: Container(
                    width: 1.5,
                    height: 25,
                    color: Colors.white.withOpacity(0.3),
                  ),
                ),
                Positioned(
                  left: -2,
                  child: Container(
                    width: 25,
                    height: 1.5,
                    color: Colors.white.withOpacity(0.3),
                  ),
                ),
                Positioned(
                  right: -2,
                  child: Container(
                    width: 25,
                    height: 1.5,
                    color: Colors.white.withOpacity(0.3),
                  ),
                ),
              ],
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
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
                      const Text(
                        'StreetSense',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                        ),
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
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              padding: const EdgeInsets.only(bottom: 32),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  GestureDetector(
                    onTap: () => _takePicture(context),
                    child: Container(
                      width: 72,
                      height: 72,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 4),
                      ),
                      child: const Icon(Icons.camera_alt, size: 32),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class DisplayPictureScreen extends StatelessWidget {
  final String imagePath;

  const DisplayPictureScreen({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Captured Image')),
      body: Image.file(File(imagePath)),
    );
  }
}
