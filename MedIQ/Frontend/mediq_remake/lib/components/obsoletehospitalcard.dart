import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/constants.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:shimmer_container/shimmer_container.dart';

class ObsoleteHospitalCard extends StatelessWidget {
  final String hospID;
  final double height;
  final String userID;
  ObsoleteHospitalCard(
      {super.key,
      required this.hospID,
      this.height = 90,
      required this.userID});

  String bookNowText = "Book Now";
  Color bookNowBkColor = kBlueAccentColor;

  void bookNow(String requestedBed, overlayEntry, bnState) async {
    bnState(() {
      bookNowText = "Booking...";
    });
    try {
      await Future.delayed(const Duration(seconds: 3), () {});
      Map payloadData = {
        "hospitalID": hospID,
        "orderBed": requestedBed,
        "userID": userID,
        "isSpecialServiceRequired": isSpecialServicesRequired ? "1" : "0"
      };

      var response = await http.post(Uri.http(baseUrl, 'api/bookHospitalBed'),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(payloadData));
      if (response.statusCode == 200) {
        bnState(() {
          bookNowText = "Success";
          bookNowBkColor = kAccentColor2;
        });
      } else {
        bnState(() {
          bookNowText = "Failed";
          bookNowBkColor = const Color(0XFFe5383b);
        });
      }
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
    } catch (e) {
      debugPrint(e.toString());
      bnState(() {
        bookNowText = "Failed";
        bookNowBkColor = const Color(0XFFe5383b);
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
        String insuranceNo = jsonData["insuranceNo"];
        String phoneNumber = jsonData["phoneNumber"];

        childs.addAll([
          Padding(
            padding: const EdgeInsets.fromLTRB(13.0, 8.0, 10.0, 8.0),
            child: Row(
              children: [
                const Icon(Icons.article, size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                const Icon(Icons.group, size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                const Icon(Icons.numbers_rounded,
                    size: 35.0, color: kAccentColor2),
                const SizedBox(width: 9.0),
                const Text("Insurance No: ",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontWeight: FontWeight.bold)),
                Text(insuranceNo,
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
                const Icon(Icons.phone_rounded,
                    size: 35.0, color: kAccentColor2),
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
                    size: 35.0, color: kAccentColor2),
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
                  activeTrackColor: kAccentColor2,
                  activeColor: kAccentColor1,
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

  void openBookWindow(String hospitalBedName, context) async {
    debugPrint("$hospID -> $hospitalBedName");
    OverlayState overlayState = Overlay.of(context);
    OverlayEntry? overlayEntry;
    overlayEntry = OverlayEntry(
      builder: (c2) {
        return Positioned(
            child: PointerInterceptor(
                child: GestureDetector(
          onTap: () {
            overlayEntry?.remove();
          },
          child: Container(
            height: MediaQuery.sizeOf(c2).height,
            width: MediaQuery.sizeOf(context).width,
            color: Colors.black.withOpacity(0.3),
            child: Center(
              child: GestureDetector(
                onTap: () {},
                child: Material(
                  color: Colors.transparent,
                  child: Container(
                    height: 660,
                    width: 500,
                    decoration: BoxDecoration(
                        color: const Color.fromARGB(255, 255, 255, 255),
                        borderRadius: BorderRadius.circular(15.0),
                        boxShadow: [
                          BoxShadow(
                              color: const Color.fromARGB(255, 167, 167, 167)
                                  .withOpacity(0.5),
                              spreadRadius: 5,
                              blurRadius: 7,
                              offset: const Offset(0, 3))
                        ]),
                    child: FutureBuilder(
                      future: getBookWindowChild(hospitalBedName, overlayEntry),
                      builder: (context, snapshot) {
                        List<Widget> columnChildren = [
                          const SizedBox(height: 25),
                          Row(
                            mainAxisSize: MainAxisSize.max,
                            children: [
                              const Spacer(),
                              const SizedBox(width: 15),
                              const Text("Confirm Booking",
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 30.0,
                                      fontWeight: FontWeight.w800)),
                              const Spacer(),
                              GestureDetector(
                                onTap: () => overlayEntry?.remove(),
                                child: const Padding(
                                  padding: EdgeInsets.only(right: 10.0),
                                  child: Icon(
                                    Icons.cancel_rounded,
                                    color: kBlueAccentColor,
                                    size: 35.0,
                                  ),
                                ),
                              )
                            ],
                          )
                        ];
                        if (snapshot.connectionState ==
                                ConnectionState.waiting ||
                            snapshot.connectionState ==
                                ConnectionState.active) {
                          return const Center(
                              child: CircularProgressIndicator(
                                  color: kBlueAccentColor));
                        } else if (snapshot.hasData) {
                          columnChildren.addAll(snapshot.data as List<Widget>);
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
                      },
                    ),
                  ),
                ),
              ),
            ),
          ),
        )));
      },
    );
    overlayState.insert(overlayEntry);
  }

  Future<Widget> getCard(c1) async {
    await Future.delayed(const Duration(seconds: 5), () {});
    try {
      var response = await http.get(
          Uri.http(baseUrl, "api/getHospitalMetadata",
              {"hospitalID": hospID.toString()}),
          headers: {"Accept": "application/json"});
      if (response.statusCode == 200) {
        Map jsonData = jsonDecode(response.body);
        String hospitalName = jsonData["hospitalName"];
        String hospitalAddress = jsonData["address"];
        int availableOpd = jsonData["available_opd"];
        int availableTrauma = jsonData["available_trauma"];
        int availableEmergency = jsonData["available_emergency"];
        int availableGeneral = jsonData["available_general"];

        return Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            height: height,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(15.0),
                color: const Color.fromARGB(255, 238, 238, 238),
                boxShadow: [
                  BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: const Offset(0, 3))
                ]),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  SizedBox(
                    width: 300,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(hospitalName,
                            style: const TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                                fontWeight: FontWeight.bold)),
                        Text(hospitalAddress,
                            style: const TextStyle(
                                color: kBlueAccentColor, fontSize: 13.0),
                            softWrap: true)
                      ],
                    ),
                  ),
                  const Spacer(),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
                        child: ChipButton(
                            onClickedCallback: () =>
                                openBookWindow("available_opd", c1),
                            height: 50,
                            width: 50,
                            activatedColor: const Color(0xFF240046),
                            text: Text(availableOpd.toString()),
                            isActivated: true),
                      ),
                      const SizedBox(height: 2),
                      const Text("OPD",
                          style: TextStyle(color: Colors.black, fontSize: 10.0))
                    ],
                  ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
                        child: ChipButton(
                            onClickedCallback: () =>
                                openBookWindow("available_emergency", c1),
                            height: 50,
                            width: 50,
                            activatedColor: const Color(0XFF3c096c),
                            text: Text(availableEmergency.toString()),
                            isActivated: true),
                      ),
                      const SizedBox(height: 2),
                      const Text("Emergency",
                          style: TextStyle(color: Colors.black, fontSize: 10.0))
                    ],
                  ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
                        child: ChipButton(
                            onClickedCallback: () =>
                                openBookWindow("available_trauma", c1),
                            height: 50,
                            width: 50,
                            activatedColor: const Color(0XFF5a189a),
                            text: Text(availableTrauma.toString()),
                            isActivated: true),
                      ),
                      const SizedBox(height: 2),
                      const Text("Trauma",
                          style: TextStyle(color: Colors.black, fontSize: 10.0))
                    ],
                  ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
                        child: ChipButton(
                            onClickedCallback: () =>
                                openBookWindow("available_general", c1),
                            height: 50,
                            width: 50,
                            activatedColor: const Color(0XFF7b2cbf),
                            text: Text(availableGeneral.toString()),
                            isActivated: true),
                      ),
                      const SizedBox(height: 2),
                      const Text("General",
                          style: TextStyle(color: Colors.black, fontSize: 10.0))
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      } else {
        return throw Exception(
            "Response Code: ${response.statusCode.toString()}");
      }
    } catch (e) {
      debugPrint(e.toString());
      throw Exception("$e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getCard(context),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting ||
            snapshot.connectionState == ConnectionState.active) {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: ShimmerContainer(
                width: double.infinity,
                height: height,
                radius: 15.0,
                highlightColor: const Color(0xffF9F9FB),
                baseColor: const Color(0xffE6E8EB)),
          );
        } else if (snapshot.hasData) {
          return snapshot.data ?? const SizedBox.shrink();
        } else {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              height: height,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15.0),
                  color: const Color.fromARGB(255, 238, 238, 238),
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: const Offset(0, 3))
                  ]),
              child: Center(
                child: Text(
                  "Error loading hospital metadata with ID = $hospID",
                  style: const TextStyle(color: Colors.black),
                ),
              ),
            ),
          );
        }
      },
    );
  }
}
