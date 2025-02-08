import 'package:flutter/material.dart';
import 'package:mediq_remake/components/rotatingwidget.dart';
import 'package:mediq_remake/constants.dart';

class OrderStatusMarker extends StatelessWidget {
  final double size;
  final String status;
  const OrderStatusMarker(
      {super.key, required this.size, required this.status});

  @override
  Widget build(BuildContext context) {
    Widget finalWidget;

    if (status.toLowerCase() == "pending") {
      finalWidget = SizedBox(
        height: size - 10,
        width: size - 10,
        child: const RotatingWidget(
            duration: Duration(milliseconds: 5000),
            child: ColorFiltered(
              colorFilter: ColorFilter.mode(kRussianViolet, BlendMode.srcATop),
              child: Image(
                image: AssetImage("assets/spinner.png"),
              ),
            )),
      );
    } else if (status.toLowerCase() == "approved") {
      finalWidget =
          Icon(Icons.check_circle, size: size - 5, color: kRussianViolet);
    } else {
      finalWidget = Icon(Icons.cancel,
          size: size, color: const Color.fromARGB(255, 223, 71, 71));
    }

    return finalWidget;
  }
}
