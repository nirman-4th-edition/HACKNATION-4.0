import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mediq_admin/components/chipbutton.dart';
import 'package:http/http.dart' as http;
import 'package:mediq_admin/config.dart';

class OrderCard extends StatelessWidget {
  final String fullName;
  final String bloodType;
  final String gender;
  final String insuranceNumber;
  final String adhaar;
  final String phoneNumber;
  final String address;
  final String age;
  final String alergies;
  final String requestedBed;
  final bool isSpecialServiceRequired;
  final String userID;
  final String hospitalID;
  final Function()? startMonitoringOrdersCallback;
  const OrderCard(
      {super.key,
      required this.fullName,
      required this.bloodType,
      required this.gender,
      required this.address,
      required this.adhaar,
      required this.age,
      required this.alergies,
      required this.insuranceNumber,
      required this.phoneNumber,
      required this.requestedBed,
      required this.userID,
      required this.hospitalID,
      required this.isSpecialServiceRequired,
      this.startMonitoringOrdersCallback});

  void processOrder(bool isAccepted) async {
    Map payloadData = {
      "isAccepted": isAccepted ? 1 : 0,
      "userID": userID,
      "hospitalID": hospitalID,
      "requestedBed": requestedBed
    };

    try {
      var response = await http.post(Uri.http(baseURL, "api/processOrder"),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(payloadData));

      if (response.statusCode == 200) {
        startMonitoringOrdersCallback!();
      } else {
        debugPrint(
            "processOrder -> ${response.statusCode.toString()} returned!");
      }
    } catch (e) {
      debugPrint("processOrder -> ${e.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      decoration: BoxDecoration(
          color: const Color.fromARGB(255, 230, 225, 252),
          borderRadius: BorderRadius.circular(15.0),
          boxShadow: [
            BoxShadow(
                color:
                    const Color.fromARGB(255, 124, 117, 143).withOpacity(0.5),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3))
          ]),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            Row(children: [
              const Text(
                "Full Name: ",
              ),
              Text(fullName,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Bloodtype: ",
              ),
              Text(bloodType,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Gender: ",
              ),
              Text(gender,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Age: ",
              ),
              Text(age,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Insurance Number: ",
              ),
              Text(insuranceNumber,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Adhaar: ",
              ),
              Text(adhaar,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Phone Number: ",
              ),
              Text(phoneNumber,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Address: ",
              ),
              Flexible(
                child: Text(address,
                    softWrap: true,
                    style: const TextStyle(
                        color: Color.fromARGB(255, 22, 2, 110),
                        fontWeight: FontWeight.bold)),
              )
            ]),
            Row(children: [
              const Text(
                "Alergies: ",
              ),
              Text(alergies,
                  softWrap: true,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Requested Bed: ",
              ),
              Text(requestedBed,
                  softWrap: true,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            Row(children: [
              const Text(
                "Ambulance Requested? : ",
              ),
              Text(isSpecialServiceRequired ? "Yes" : "No",
                  softWrap: true,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 22, 2, 110),
                      fontWeight: FontWeight.bold))
            ]),
            const SizedBox(height: 14.0),
            Align(
              alignment: Alignment.bottomCenter,
              child: Row(
                children: [
                  const Spacer(),
                  ChipButton(
                      height: 45,
                      width: 70,
                      onClickedCallback: () => processOrder(false),
                      activatedColor: const Color.fromARGB(255, 226, 87, 77),
                      text: const Text(
                        "Reject",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      isActivated: true),
                  const SizedBox(width: 10.0),
                  ChipButton(
                      height: 45,
                      width: 70,
                      onClickedCallback: () => processOrder(true),
                      activatedColor: const Color.fromARGB(255, 5, 180, 166),
                      text: const Text(
                        "Accept",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      isActivated: true),
                  const Spacer()
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
