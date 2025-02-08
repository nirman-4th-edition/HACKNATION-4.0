import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/constants.dart';
import "package:http/http.dart" as http;
import 'package:pointer_interceptor/pointer_interceptor.dart';

class BookWindowOverlay extends StatelessWidget {
  final String bedKey;
  final String userID;
  final String hospitalID;
  final Function(bool isSuccess)? onBookCompletedCallback;
  final OverlayEntry overlayEntry;
  BookWindowOverlay(
      {super.key,
      required this.bedKey,
      required this.hospitalID,
      required this.userID,
      this.onBookCompletedCallback,
      required this.overlayEntry});

  String bookNowText = "Book Now";
  Color bookNowBkColor = kUltraViolet;

  void bookNow(String requestedBed, overlayEntry, bnState) async {
    bnState(() {
      bookNowText = "Booking...";
    });
    try {
      await Future.delayed(const Duration(seconds: 3), () {});
      Map payloadData = {
        "hospitalID": hospitalID,
        "orderBed": requestedBed,
        "userID": userID,
        "isSpecialServiceRequired": isSpecialServicesRequired ? "1" : "0"
      };

      var response = await http.post(Uri.http(baseUrl, 'api/bookHospitalBed'),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(payloadData));
      if (response.statusCode == 200) {
        bnState(() async {
          bookNowText = "Success";
          bookNowBkColor = kAccentColor2;
          await Future.delayed(const Duration(milliseconds: 600), () {
            onBookCompletedCallback!(true);
          });
        });
      } else {
        bnState(() async {
          bookNowText = "Failed";
          bookNowBkColor = const Color(0XFFe5383b);
          await Future.delayed(const Duration(milliseconds: 600), () {
            onBookCompletedCallback!(false);
          });
        });
      }
      try {
        await Future.delayed(const Duration(seconds: 4), () {
          bnState(() {
            bookNowText = "Book Now";
            bookNowBkColor = kUltraViolet;
          });
        });
      } catch (e) {
        //pass
      }
    } catch (e) {
      debugPrint(e.toString());
      bnState(() async {
        bookNowText = "Failed";
        bookNowBkColor = const Color(0XFFe5383b);
        await Future.delayed(const Duration(milliseconds: 600), () {
          onBookCompletedCallback!(false);
        });
      });
      try {
        await Future.delayed(const Duration(seconds: 4), () {
          bnState(() {
            bookNowText = "Book Now";
            bookNowBkColor = kBlueAccentColor;
          });
        });
      } catch (e) {
        //pass
      }
    }
  }

  bool isSpecialServicesRequired = false;
  void switchCallback(bool value, switchState) {
    switchState(() => isSpecialServicesRequired = value);
  }

  Future<List<Widget>> getBookWindowChild(
      String hospitalBedname, overlayEntry) async {
    await Future.delayed(const Duration(seconds: 2));
    List<Widget> childs = [];

    String hospitalBedDisplayName = "";

    if (hospitalBedname == "available_emergency") {
      hospitalBedDisplayName = "Emergency";
    } else if (hospitalBedname == "available_opd") {
      hospitalBedDisplayName = "OPD";
    } else if (hospitalBedname == "available_trauma") {
      hospitalBedDisplayName = "Trauma";
    } else if (hospitalBedname == "available_general") {
      hospitalBedDisplayName = "General";
    }

    try {
      var response = await http.get(
          Uri.http(baseUrl, "api/getUserMetadata", {"userID": userID}),
          headers: {"Accept": "application/json"});
      if (response.statusCode == 200) {
        Map jsonData = jsonDecode(response.body);
        String adhaarNumber = jsonData["adhaar"];
        int age = jsonData["age"];
        String alergies = jsonData["alergies"];
        String bloodgroup = jsonData["bloodgroup"];
        String fullName = jsonData["fullName"];
        String gender = jsonData["gender"];
        String address = jsonData["userAddress"];
        String phoneNumber = jsonData["phoneNumber"];

        childs.addAll([
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 8.0),
            child: Row(
              children: [
                const Icon(Icons.article, size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Adhaar: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(adhaarNumber,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 0.0, 10.0, 8.0),
            child: Row(
              children: [
                const Icon(Icons.account_circle_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Name: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(fullName.toString(),
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.access_time_filled_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Age: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(age.toString(),
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.group, size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Gender: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(gender,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.bloodtype_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Bloodgroup: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(bloodgroup,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.vaccines_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Alergies: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(alergies,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.house_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Address: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Flexible(
                  child: Text(address,
                      style: const TextStyle(
                          color: kBlueAccentColor,
                          fontSize: 15,
                          fontWeight: FontWeight.bold),
                      softWrap: true),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.phone_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Phone Number: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(phoneNumber,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 0.0),
            child: Row(
              children: [
                const Icon(Icons.single_bed_rounded,
                    size: 35.0, color: kUltraViolet),
                const SizedBox(width: 9.0),
                const Text("Requested Bed: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(hospitalBedDisplayName,
                    style: const TextStyle(
                        color: kBlueAccentColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          const SizedBox(height: 10.0),
          Row(
            children: [
              const SizedBox(width: 10.0),
              const Text("Request ambulance service? ",
                  style: TextStyle(
                      color: kBlueAccentColor,
                      fontSize: 15,
                      fontWeight: FontWeight.bold)),
              StatefulBuilder(builder: (context, switchState) {
                return Switch(
                  value: isSpecialServicesRequired,
                  onChanged: (value) => switchCallback(value, switchState),
                  activeTrackColor: kUltraViolet,
                  activeColor: kAfricanViolet,
                  inactiveTrackColor: const Color.fromARGB(255, 196, 196, 196),
                  inactiveThumbColor: Colors.white,
                );
              }),
            ],
          ),
          const SizedBox(height: 10.0),
          StatefulBuilder(builder: (context, bnState) {
            return ChipButton(
                height: 50.0,
                width: 90.0,
                onClickedCallback: () => bookNow(
                    hospitalBedDisplayName.toLowerCase(),
                    overlayEntry,
                    bnState),
                text: Text(bookNowText,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15.0,
                        fontWeight: FontWeight.bold)),
                isActivated: true,
                activatedColor: bookNowBkColor);
          })
        ]);
      } else {
        throw Exception(response.statusCode);
      }
    } catch (e) {
      throw Exception(e.toString());
    }

    return childs;
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> columnChildren = [];
    return Material(
      color: Colors.transparent,
      child: Positioned(
          child: PointerInterceptor(
              child: GestureDetector(
        onTap: () => overlayEntry.remove(),
        child: Container(
          height: MediaQuery.sizeOf(context).height,
          width: MediaQuery.sizeOf(context).width,
          color: Colors.black.withOpacity(0.4),
          child: Center(
            child: Container(
              height: 600,
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
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Text("Confirm Booking",
                        style: TextStyle(
                            color: kRussianViolet,
                            fontSize: 30.0,
                            fontWeight: FontWeight.bold)),
                    const SizedBox(height: 5),
                    SizedBox(
                      width: double.infinity,
                      height: 505,
                      child: FutureBuilder(
                          future: getBookWindowChild(bedKey, overlayEntry),
                          builder: (ctx, snapshot) {
                            if (snapshot.connectionState ==
                                    ConnectionState.waiting ||
                                snapshot.connectionState ==
                                    ConnectionState.active) {
                              return const Center(
                                  child: CircularProgressIndicator(
                                      color: kBlueAccentColor));
                            } else if (snapshot.hasData) {
                              columnChildren
                                  .addAll(snapshot.data as List<Widget>);
                              return SizedBox.expand(
                                child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    children: columnChildren),
                              );
                            } else {
                              columnChildren.addAll([
                                const SizedBox(height: 20.0),
                                const Center(
                                    child: Text("Error fetching user data",
                                        style: TextStyle(color: Colors.black)))
                              ]);
                              return SizedBox.expand(
                                child: Column(children: columnChildren),
                              );
                            }
                          }),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      ))),
    );
  }
}
