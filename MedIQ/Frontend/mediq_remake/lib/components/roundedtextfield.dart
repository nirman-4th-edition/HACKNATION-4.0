import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mediq_remake/constants.dart';

class RoundedTextField extends StatelessWidget {
  final TextEditingController controller;
  final bool obscureText;
  final TextCapitalization textCapitalization;
  final String? hintText;
  final Icon? icon;
  final Function(String)? onChanged;
  final int? maxLines;
  final TextStyle? style;
  final TextInputType? keyboardType;
  final Color focusedColor;
  final Color borderColor;
  final List<TextInputFormatter>? inputFormatters;

  const RoundedTextField(
      {super.key,
      required this.controller,
      required this.obscureText,
      this.hintText,
      this.icon,
      this.onChanged,
      this.style,
      this.keyboardType,
      this.inputFormatters,
      this.maxLines = 1,
      this.focusedColor = kAccentColor2,
      this.borderColor = Colors.white,
      this.textCapitalization = TextCapitalization.none});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      textCapitalization: textCapitalization,
      keyboardType: keyboardType,
      onChanged: onChanged,
      inputFormatters: inputFormatters,
      style: style,
      maxLines: maxLines,
      decoration: InputDecoration(
          enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: borderColor),
              borderRadius: const BorderRadius.all(Radius.circular(15.0))),
          focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: focusedColor, width: 1.5),
              borderRadius: const BorderRadius.all(Radius.circular(10.0))),
          filled: true,
          fillColor: Colors.white,
          hintText: hintText,
          hintStyle: TextStyle(color: Colors.grey.shade400, fontSize: 15.0),
          icon: icon),
      cursorColor: kAccentColor1,
    );
  }
}
