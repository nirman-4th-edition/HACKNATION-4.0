import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/constants.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:http/http.dart' as http;

class DocAppointmentBookWindowOverlay extends StatelessWidget {
  final OverlayEntry? overlayEntry;
  final String hospitalID;
  final String userID;
  final String doctorName;
  final String shift;
  const DocAppointmentBookWindowOverlay(
      {super.key,
      required this.overlayEntry,
      required this.hospitalID,
      required this.doctorName,
      required this.shift,
      required this.userID});

  void bookAppointment() async {
    debugPrint(
        "bookAppointmentCallback --> $userID :: $hospitalID :: $doctorName :: $shift");
    Map payloadData = {
      "hospitalID": hospitalID,
      "userID": userID,
      "doctor_name": doctorName,
      "shift": shift
    };
    var response = await http.post(Uri.http(baseUrl, "api/bookDocAppointment"),
        body: jsonEncode(payloadData),
        headers: {"Content-Type": "application/json"});
    if (response.statusCode == 201) {
      overlayEntry?.remove();
    } else {
      debugPrint("bookAppointment --> httpStatusCode: ${response.statusCode}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Positioned(
          child: PointerInterceptor(
        child: GestureDetector(
          onTap: () => overlayEntry?.remove(),
          child: Container(
            height: MediaQuery.sizeOf(context).height,
            width: MediaQuery.sizeOf(context).width,
            color: Colors.black.withOpacity(0.4),
            child: Center(
              child: Container(
                height: 200,
                width: 500,
                decoration: BoxDecoration(
                  color: kIsabelline,
                  borderRadius: BorderRadius.circular(15.0),
                  boxShadow: [
                    BoxShadow(
                        color: const Color.fromARGB(255, 167, 167, 167)
                            .withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: const Offset(0, 3))
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 5),
                    const Align(
                      alignment: Alignment.topCenter,
                      child: Text("Confirm Appointment",
                          style: TextStyle(
                              color: kRussianViolet,
                              fontSize: 30.0,
                              fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(height: 5),
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0, bottom: 7.0),
                      child: Row(
                        children: [
                          const Text(
                            "Name: ",
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          ),
                          Text(
                            doctorName,
                            style: const TextStyle(
                                color: kRussianViolet,
                                fontSize: 18,
                                fontWeight: FontWeight.w400),
                          )
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0, bottom: 7.0),
                      child: Row(
                        children: [
                          const Text(
                            "Shift: ",
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          ),
                          Text(
                            shift,
                            style: const TextStyle(
                                color: kRussianViolet,
                                fontSize: 18,
                                fontWeight: FontWeight.w400),
                          )
                        ],
                      ),
                    ),
                    Align(
                      alignment: Alignment.bottomCenter,
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: ChipButton(
                            height: 50,
                            width: 70,
                            activatedColor: kRussianViolet,
                            text: const Text("Confirm",
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            isActivated: true,
                            onClickedCallback: () {
                              bookAppointment();
                            }),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      )),
    );
  }
}
