import 'package:flutter/material.dart';
import 'package:mediq_remake/constants.dart';

class GlowedUpButton extends StatefulWidget {
  final double height;
  final double width;
  final double blurRadius;
  final Text? buttonText;
  final Color? bgColor;
  final Color? glowColor;
  final Function()? onClickedCallback;
  const GlowedUpButton(
      {super.key,
      this.height = 50,
      this.width = 150,
      this.blurRadius = 30.0,
      this.buttonText,
      this.bgColor,
      this.glowColor,
      this.onClickedCallback});

  @override
  State<GlowedUpButton> createState() => _GlowedUpButtonState();
}

class _GlowedUpButtonState extends State<GlowedUpButton> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onClickedCallback,
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
            color: widget.bgColor ?? Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            border: Border.all(color: widget.glowColor ?? kBlueAccentColor),
            boxShadow: [
              BoxShadow(
                  color: widget.glowColor ?? kBlueAccentColor.withOpacity(0.6),
                  spreadRadius: 7,
                  blurRadius: widget.blurRadius)
            ]),
        child: Center(
          child: widget.buttonText,
        ),
      ),
    );
  }
}
