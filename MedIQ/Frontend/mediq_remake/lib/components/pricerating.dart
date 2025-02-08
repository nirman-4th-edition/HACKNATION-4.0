import 'package:flutter/material.dart';
import 'package:mediq_remake/constants.dart';

class PriceRating extends StatelessWidget {
  final int rating;
  final int totalRating;
  final double size;
  final Color unfilledColor;
  final Color filledColor;
  const PriceRating(
      {super.key,
      required this.rating,
      this.totalRating = 3,
      this.size = 20.0,
      this.unfilledColor = kUltraViolet,
      this.filledColor = Colors.white});

  @override
  Widget build(BuildContext context) {
    List<Widget> rates = [];
    for (var i = 0; i < rating; i++) {
      rates.add(Icon(Icons.currency_rupee, color: filledColor, size: size));
      rates.add(const SizedBox(width: 3));
    }
    for (var i = rating; i < totalRating; i++) {
      rates.add(Icon(Icons.currency_rupee, color: unfilledColor, size: size));
      rates.add(const SizedBox(width: 3));
    }
    return Row(
      children: rates,
    );
  }
}
