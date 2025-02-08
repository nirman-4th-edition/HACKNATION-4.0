import 'package:flutter/material.dart';
import 'package:mediq_remake/constants.dart';

class HospitalCard extends StatefulWidget {
  final String hospitalName;
  final String hospitalAddress;
  final String hospitalID;
  final Function(String, HospitalCardState)? onClickedCallback;
  HospitalCard(
      {super.key,
      required this.hospitalAddress,
      required this.hospitalName,
      required this.hospitalID,
      this.onClickedCallback});

  @override
  State<HospitalCard> createState() => HospitalCardState();
}

class HospitalCardState extends State<HospitalCard> {
  Color backgroundColor = kAfricanViolet;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => widget.onClickedCallback!(widget.hospitalID, this),
      child: Container(
        height: 60,
        width: double.infinity,
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15),
            border: Border.all(color: backgroundColor),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3))
            ]),
        child: Column(
          children: [
            Text(widget.hospitalName,
                style: const TextStyle(
                    color: kRussianViolet,
                    fontSize: 17.0,
                    fontWeight: FontWeight.bold)),
            Text(widget.hospitalAddress,
                style: const TextStyle(
                    color: Colors.black,
                    fontSize: 14.0,
                    fontWeight: FontWeight.w200))
          ],
        ),
      ),
    );
  }
}
