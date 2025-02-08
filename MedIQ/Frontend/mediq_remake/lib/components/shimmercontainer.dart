import 'package:animate_gradient/animate_gradient.dart';
import 'package:flutter/material.dart';

class ShimmerContainer extends StatelessWidget {
  final double height;
  final double width;
  final List<Color> primaryGradientColors;
  final List<Color> secondayGradientColors;

  const ShimmerContainer(
      {super.key,
      required this.height,
      required this.width,
      this.primaryGradientColors = const [
        Color.fromARGB(157, 97, 71, 170),
        Color.fromARGB(162, 129, 90, 192)
      ],
      this.secondayGradientColors = const [
        Color.fromARGB(171, 193, 158, 224),
        Color.fromARGB(171, 177, 133, 219)
      ]});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      width: width,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.max,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 30),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(15.0),
              child: SizedBox(
                width: 400,
                height: 300,
                child: AnimateGradient(
                    primaryColors: primaryGradientColors,
                    secondaryColors: secondayGradientColors,
                    reverse: true,
                    duration: const Duration(milliseconds: 750)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(4.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(15.0),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: AnimateGradient(
                    primaryColors: primaryGradientColors,
                    secondaryColors: secondayGradientColors,
                    reverse: true,
                    duration: const Duration(milliseconds: 750)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(4.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(15.0),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: AnimateGradient(
                    primaryColors: primaryGradientColors,
                    secondaryColors: secondayGradientColors,
                    reverse: true,
                    duration: const Duration(milliseconds: 750)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(4.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(15.0),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: AnimateGradient(
                    primaryColors: primaryGradientColors,
                    secondaryColors: secondayGradientColors,
                    reverse: true,
                    duration: const Duration(milliseconds: 750)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(4.0),
            child: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(15.0),
                  child: SizedBox(
                      width: 150,
                      height: 50,
                      child: AnimateGradient(
                          primaryColors: primaryGradientColors,
                          secondaryColors: secondayGradientColors,
                          reverse: true,
                          duration: const Duration(milliseconds: 750))),
                ),
                const SizedBox(width: 10),
                ClipRRect(
                  borderRadius: BorderRadius.circular(15.0),
                  child: SizedBox(
                      width: 200,
                      height: 50,
                      child: AnimateGradient(
                          primaryColors: primaryGradientColors,
                          secondaryColors: secondayGradientColors,
                          reverse: true,
                          duration: const Duration(milliseconds: 750))),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
