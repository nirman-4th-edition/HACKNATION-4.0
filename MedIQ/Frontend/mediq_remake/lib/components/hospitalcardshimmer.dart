import 'package:animate_gradient/animate_gradient.dart';
import 'package:flutter/material.dart';

class HospitalCardShimmer extends StatelessWidget {
  final double height;
  final double width;
  final int totalNumberofShimmers;
  final List<Color> primaryColor;
  final List<Color> secondaryColor;
  const HospitalCardShimmer(
      {super.key,
      required this.height,
      required this.width,
      this.totalNumberofShimmers = 5,
      this.primaryColor = const [
        Color.fromARGB(255, 192, 192, 192),
        Colors.grey
      ],
      this.secondaryColor = const [
        Color.fromARGB(255, 145, 144, 144),
        Color.fromARGB(255, 136, 136, 136)
      ]});

  @override
  Widget build(BuildContext context) {
    List<Widget> shimmers = [];

    for (var i = 0; i < totalNumberofShimmers; i++) {
      shimmers.add(Padding(
        padding: const EdgeInsets.all(8.0),
        child: ClipRRect(
            borderRadius: BorderRadius.circular(15.0),
            child: SizedBox(
                width: double.infinity,
                height: 60,
                child: AnimateGradient(
                    primaryColors: primaryColor,
                    secondaryColors: secondaryColor,
                    reverse: true,
                    duration: const Duration(milliseconds: 900)))),
      ));
    }

    return SizedBox(
      height: height,
      width: width,
      child: Column(
        children: shimmers,
      ),
    );
  }
}
