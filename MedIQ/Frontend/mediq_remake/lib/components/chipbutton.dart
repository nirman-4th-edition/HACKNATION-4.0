import 'package:flutter/material.dart';
import 'package:mediq_remake/constants.dart';

class ChipButton extends StatelessWidget {
  final double width;
  final double height;
  final Color borderColor;
  final Color activatedColor;
  final Color inActivatedColor;
  final Text text;
  final bool isActivated;
  final Function()? onClickedCallback;

  const ChipButton(
      {super.key,
      required this.height,
      required this.width,
      required this.text,
      required this.isActivated,
      this.borderColor = kAccentColor2,
      this.activatedColor = kAccentColor2,
      this.inActivatedColor = Colors.white70,
      this.onClickedCallback});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClickedCallback,
      child: Container(
          height: height,
          width: width,
          decoration: BoxDecoration(
            color: isActivated ? activatedColor : inActivatedColor,
            borderRadius: const BorderRadius.all(Radius.circular(15)),
          ),
          child: Center(child: text)),
    );
  }
}
