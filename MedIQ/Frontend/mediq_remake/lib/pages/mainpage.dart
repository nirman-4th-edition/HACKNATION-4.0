import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_gradient_animation_text/flutter_gradient_animation_text.dart';
import 'package:location/location.dart';
import 'package:mediq_remake/b64utils.dart';
import 'package:mediq_remake/components/bookwindowoverlay.dart';
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/components/doctorsappointmenttable.dart';
import 'package:mediq_remake/components/hospitalcard.dart';
import 'package:mediq_remake/components/hospitalcardshimmer.dart';
import 'package:mediq_remake/components/orderstatusmarker.dart';
import 'package:mediq_remake/components/pricerating.dart';
import 'package:mediq_remake/components/shimmercontainer.dart';
import 'package:http/http.dart' as http;
import 'package:mediq_remake/constants.dart';
import 'package:mediq_remake/components/mapcontainer.dart';
import 'package:mediq_remake/helpers.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:wave_divider/wave_divider.dart';

class MainPage extends StatefulWidget {
  final String userID;
  const MainPage(
      {super.key, this.userID = "281893820" // Test data from the server
      });

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  bool isHospitalSelected = false;
  bool isModalOpen = false;
  Icon modalHeadIcon = const Icon(
    Icons.keyboard_arrow_up,
    color: kRussianViolet,
    size: 25,
  );

  // ------ All Order Items -----
  List<Widget> allOrders = [];
  dynamic allOrdersSetState;
  late Widget allOrdersTable;

  //  ----- User data ----
  ImageProvider? dp;
  String? userName;
  String? address;
  String? adhaar;
  String? bloodgroup;
  String? phoneNumber;

  // ----- Coordinates -----
  double? latitude;
  double? longitude;

  // ----- Modal Data -----
  List<Widget> hospitalCards = [];
  List<Widget> modalChildrens = [];

  // ----- Hospital Menu Data -----
  Widget? hospitalMenuMasterWidget;
  dynamic availableBedsSetState;
  int availableGeneral = 0;
  int availableOPD = 0;
  int availableEmergency = 0;

  late final MapContainer map;

  void placeGPSMarker() async {
    Location location = Location();
    LocationData locationData;
    try {
      locationData = await location.getLocation();
    } catch (e) {
      debugPrint("Cannot fetch location!");
      return;
    }
    debugPrint(
        "Geo Location: ${locationData.latitude}:${locationData.longitude}");
    map.mapContainerState
        .setPointerLocation(locationData.latitude, locationData.longitude);
  }

  void onMarkerChanged(double lat, double long) {
    latitude = lat;
    longitude = long;
    debugPrint(
        "------ onMarkerChangedCallback -----\nLatitude: $latitude Longitude: $longitude");
    setState(() {
      isHospitalSelected = false;
      isModalOpen = false;

      availableBedsSetState = null;

      rebuildModalChildrens();
    });
  }

  void bookBed(
    String bedType,
    String hospitalID,
  ) {
    debugPrint(bedType);
    OverlayState overlayState = Overlay.of(context);
    OverlayEntry? overlayEntry;
    overlayEntry = OverlayEntry(builder: (c2) {
      return BookWindowOverlay(
        bedKey: bedType,
        hospitalID: hospitalID,
        userID: widget.userID,
        overlayEntry: overlayEntry as OverlayEntry,
        onBookCompletedCallback: (isSuccess) {
          if (isSuccess) {
            overlayEntry?.remove();
          }
        },
      );
    });
    overlayState.insert(overlayEntry);
  }

  void updateHospitalBedInfo(String id) async {
    try {
      Map hospitalMetadata = await getHospitalBeds(id);
      availableGeneral = hospitalMetadata["availableGeneral"];
      availableEmergency = hospitalMetadata["availableEmergency"];
      availableOPD = hospitalMetadata["availableOPD"];
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  void openHospitalMenu(String id) {
    setState(() {
      hospitalMenuMasterWidget = null; // Reset the current hospital data
      availableBedsSetState = null; //Reset the available bed widget state
      isHospitalSelected = true;
      hospitalMenuMasterWidget = FutureBuilder(
        future: getHospitalMetadata(id),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              debugPrint(snapshot.error.toString());
              return const Center(
                  child: Text(
                "Error occured while loading hospital metadata",
                style: TextStyle(color: kRussianViolet, fontSize: 15),
              ));
            } else if (snapshot.hasData) {
              return Column(
                children: [
                  Align(
                    alignment: Alignment.topRight,
                    child: Padding(
                      padding: const EdgeInsets.all(5.0),
                      child: Text(snapshot.data!["hospitalName"],
                          style: const TextStyle(
                              color: kRussianViolet,
                              fontSize: 25.0,
                              fontWeight: FontWeight.w800),
                          softWrap: true),
                    ),
                  ),
                  Align(
                    alignment: Alignment.topRight,
                    child: Padding(
                        padding: const EdgeInsets.only(left: 5.0),
                        child: Text(snapshot.data!["address"],
                            softWrap: true,
                            style: const TextStyle(
                                fontSize: 18.0, color: kUltraViolet))),
                  ),
                  const SizedBox(height: 15),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Row(
                      children: [
                        Text(
                          snapshot.data!["status"] == "active"
                              ? "Accepting new patients"
                              : "Inactive",
                          style: const TextStyle(
                              fontSize: 14.0,
                              color: Color.fromARGB(255, 69, 63, 119)),
                        ),
                        const SizedBox(width: 5),
                        Icon(
                            snapshot.data!["status"] == "active"
                                ? Icons.check_circle
                                : Icons.help_outline,
                            color: kRussianViolet,
                            size: 20.0),
                        const Spacer(),
                        const Text("Price Rating: ",
                            style: TextStyle(
                                fontSize: 14.0,
                                color: Color.fromARGB(255, 69, 63, 119))),
                        PriceRating(rating: snapshot.data!["priceRating"])
                      ],
                    ),
                  ),
                  const SizedBox(height: 15),
                  const Row(
                    children: [
                      Spacer(),
                      SizedBox(
                          width: 200,
                          child: WaveDivider(color: kRussianViolet)),
                      Spacer()
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text("Available Bed Types",
                      style: TextStyle(
                          color: kRussianViolet,
                          fontSize: 25.0,
                          fontFamily: "Crimson Text")),
                  const SizedBox(height: 10),
                  StatefulBuilder(builder: (context, setState) {
                    availableBedsSetState ??= setState;

                    updateHospitalBedInfo(id);

                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: [
                            ChipButton(
                                height: 50,
                                width: 60,
                                activatedColor: kUltraViolet,
                                text: Text(availableGeneral.toString(),
                                    style: const TextStyle(
                                        fontSize: 20.0,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white)),
                                isActivated: true,
                                onClickedCallback: () =>
                                    bookBed("available_general", id)),
                            const SizedBox(height: 5),
                            const Text("General",
                                style: TextStyle(
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.w500,
                                    color: kRussianViolet))
                          ],
                        ),
                        Column(
                          children: [
                            ChipButton(
                                height: 50,
                                width: 60,
                                activatedColor: kUltraViolet,
                                text: Text(availableOPD.toString(),
                                    style: const TextStyle(
                                        fontSize: 20.0,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white)),
                                isActivated: true,
                                onClickedCallback: () =>
                                    bookBed("available_opd", id)),
                            const SizedBox(height: 5),
                            const Text("OPD",
                                style: TextStyle(
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.w500,
                                    color: kRussianViolet))
                          ],
                        ),
                        Column(
                          children: [
                            ChipButton(
                                height: 50,
                                width: 60,
                                activatedColor: kUltraViolet,
                                text: Text(availableEmergency.toString(),
                                    style: const TextStyle(
                                        fontSize: 20.0,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white)),
                                isActivated: true,
                                onClickedCallback: () =>
                                    bookBed("available_emergency", id)),
                            const SizedBox(height: 5),
                            const Text("Emergency",
                                style: TextStyle(
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.w500,
                                    color: kRussianViolet))
                          ],
                        )
                      ],
                    );
                  }),
                  const SizedBox(height: 10),
                  const Row(
                    children: [
                      Spacer(),
                      SizedBox(
                          width: 200,
                          child: WaveDivider(color: kRussianViolet)),
                      Spacer()
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    "Doctor's Schedule",
                    style: TextStyle(
                        color: kRussianViolet,
                        fontSize: 25.0,
                        fontFamily: "Crimson Text"),
                  ),
                  const SizedBox(height: 10),
                  ScrollConfiguration(
                    behavior: AppCustomScrollBehavior(),
                    child: SingleChildScrollView(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(15.0),
                        child: SizedBox(
                            height: 270,
                            width: double.infinity,
                            child: DoctorsAppointmentTable(
                                hospitalID: id, userID: widget.userID)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                ],
              );
            }
          }
          return const ShimmerContainer(
              height: double.infinity, width: double.infinity);
        },
      );
    });
  }

  void rebuildModalChildrens() {
    hospitalCards = [];
    isModalOpen
        ? modalHeadIcon = const Icon(
            Icons.keyboard_arrow_down,
            color: kRussianViolet,
            size: 25,
          )
        : modalHeadIcon = const Icon(
            Icons.keyboard_arrow_up,
            color: kRussianViolet,
            size: 25,
          );
    modalChildrens = [
      Padding(
        padding: const EdgeInsets.only(top: 8.0, bottom: 4.0),
        child: Align(
          alignment: Alignment.topCenter,
          child: modalHeadIcon,
        ),
      ),
      const Align(
        alignment: Alignment.topCenter,
        child: Text(
          "All Nearest Hospitals",
          style: TextStyle(
              fontSize: 20.0,
              color: Color.fromARGB(255, 90, 90, 90),
              fontWeight: FontWeight.w700),
        ),
      ),
    ];

    if (isModalOpen) {
      modalChildrens.add(FutureBuilder(
        future: getAllNearestHospitals(latitude, longitude),
        builder: (context, snapshot) {
          if (latitude == null && longitude == null) {
            return const Center(
              child: Text(
                "Place a marker to find the nearest hospital",
                style: TextStyle(color: Colors.black, fontSize: 14.0),
              ),
            );
          }

          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              debugPrint(snapshot.error.toString());
              return const Center(
                  child: Text("Error loading nearest Hospitals",
                      style: TextStyle(color: Colors.black)));
            } else if (snapshot.hasData) {
              debugPrint(snapshot.data.toString());
              List allNearestHospitalsMetaData = snapshot.data as List;
              if (allNearestHospitalsMetaData.isEmpty) {
                return const Center(
                  child: Text(
                    "No nearest hospitals found!",
                    style: TextStyle(color: Colors.black, fontSize: 14.0),
                  ),
                );
              }
              for (var elmnt in allNearestHospitalsMetaData) {
                String hospitalName = elmnt["hospitalName"];
                String hospitalAddress = elmnt["address"];
                String hospitalID = elmnt["hospitalID"];
                hospitalCards.add(Padding(
                  padding: const EdgeInsets.all(8),
                  child: HospitalCard(
                      onClickedCallback: (id, cardState) =>
                          openHospitalMenu(id),
                      hospitalAddress: hospitalAddress,
                      hospitalName: hospitalName,
                      hospitalID: hospitalID),
                ));
              }
              return Column(
                children: hospitalCards,
              );
            }
          }
          return const HospitalCardShimmer(height: 380, width: double.infinity);
        },
      ));
    }
  }

  void toggleModal() {
    setState(() {
      isModalOpen = !isModalOpen;
      rebuildModalChildrens();
    });
  }

  Future<Map> getUserData() async {
    if (dp != null &&
        userName != null &&
        address != null &&
        adhaar != null &&
        bloodgroup != null &&
        phoneNumber != null) {
      return {
        "userDP": dp,
        "userName": userName,
        "address": address,
        "adhaar": adhaar,
        "bloodgroup": bloodgroup,
        "phoneNumber": phoneNumber
      };
    }

    var response;
    response = await http.get(
        Uri.http(baseUrl, "api/getUserMetadata", {"userID": widget.userID}),
        headers: {"Accept": "application/json"});
    if (response.statusCode != 200) {
      debugPrint("getUserData Response Code: ${response.statusCode}");
      throw Exception("getUserData Response Code: ${response.statusCode}");
    }

    Map parsedJson = jsonDecode(response.body);

    await Future.delayed(const Duration(seconds: 3));
    return {
      "userDP": parsedJson["profilePhoto"],
      "userName": parsedJson["fullName"],
      "address": parsedJson["userAddress"],
      "adhaar": parsedJson["adhaar"],
      "bloodgroup": parsedJson["bloodgroup"],
      "phoneNumber": parsedJson["phoneNumber"]
    };
  }

  void fetchUserOrders() async {
    var response;
    response = await http.get(Uri.http(baseUrl, "api/getOrders",
        {"userID": widget.userID, "showPendingOnly": "0"}));
    if (response.statusCode == 200) {
      allOrders = [];
      if (allOrdersSetState != null) {
        allOrdersSetState(() {});
      }
      List parsedJson = jsonDecode(response.body);
      for (var entry in parsedJson) {
        int hospitalID = entry["hospitalID"];
        String status = entry["status"];

        allOrders.add(Padding(
          padding: const EdgeInsets.only(left: 15, right: 15),
          child: Row(
            mainAxisSize: MainAxisSize.max,
            children: [
              Text(hospitalID.toString(),
                  style: const TextStyle(color: Colors.black, fontSize: 17.0)),
              const Spacer(),
              OrderStatusMarker(size: 35, status: status)
            ],
          ),
        ));
        allOrders.add(const SizedBox(height: 5));
      }
      if (allOrdersSetState != null) {
        allOrdersSetState(() {});
      }
    }
  }

  void uploadUserDiagnostics() {
    //TODO: Upload b64 string of the diagnostics report file to the server.
  }

  @override
  void initState() {
    map = MapContainer(
        height: double.infinity,
        width: double.infinity,
        onMarkerChangedCallback: (lattitude, longitude) =>
            onMarkerChanged(lattitude as double, longitude as double));
    modalChildrens = [
      Padding(
        padding: const EdgeInsets.only(top: 8.0, bottom: 4.0),
        child: Align(
          alignment: Alignment.topCenter,
          child: modalHeadIcon,
        ),
      ),
      const Align(
        alignment: Alignment.topCenter,
        child: Text(
          "All Nearest Hospitals",
          style: TextStyle(
              fontSize: 20.0,
              color: Color.fromARGB(255, 90, 90, 90),
              fontWeight: FontWeight.w700),
        ),
      )
    ];

    allOrdersTable = StatefulBuilder(builder: (ctx, oSetState) {
      allOrdersSetState ??= oSetState;
      return ScrollConfiguration(
          behavior: ScrollConfiguration.of(ctx).copyWith(scrollbars: false),
          child: SizedBox(
            height: 129,
            width: double.infinity,
            child: ListView(
              scrollDirection: Axis.vertical,
              children: allOrders,
            ),
          ));
    });

    Timer.periodic(const Duration(seconds: 1, milliseconds: 500), (Timer t) {
      if (availableBedsSetState != null) {
        availableBedsSetState(() {});
      }
    });
    Timer.periodic(const Duration(seconds: 1), (Timer t) {
      fetchUserOrders();
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    fetchUserOrders();
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.max,
          children: [
            Container(
              width: 550,
              padding: const EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                  color: kUltraViolet,
                  borderRadius: BorderRadius.circular(15.0)),
              child: Column(
                children: [
                  const Align(
                      alignment: Alignment.topLeft,
                      child: GradientAnimationText(
                          text: Text(
                            "MediQ",
                            style: TextStyle(
                                fontSize: 35.0,
                                fontWeight: FontWeight.w900,
                                fontFamily: "Pacifico"),
                          ),
                          colors: [Color(0xFF80ed99), Color(0xFF80ffdb)],
                          duration: Duration(seconds: 5))),
                  const SizedBox(height: 20),
                  Align(
                    alignment: Alignment.topLeft,
                    child: FutureBuilder(
                        future: getUserData(),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.active) {
                            return const Center(
                                child: ShimmerContainer(
                                    height: 400, width: double.infinity));
                          } else if (snapshot.hasData) {
                            dp ??= MemoryImage(
                                dataFromBase64String(snapshot.data!["userDP"]));
                            userName ??= snapshot.data!["userName"];
                            address ??= snapshot.data!["address"];
                            adhaar ??= snapshot.data!["adhaar"];
                            bloodgroup ??= snapshot.data!["bloodgroup"];
                            phoneNumber ??= snapshot.data!["phoneNumber"];

                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Stack(
                                  children: [
                                    Row(
                                      children: [
                                        const Spacer(),
                                        CircleAvatar(
                                          radius: 130,
                                          backgroundColor:
                                              kLilac.withOpacity(0.5),
                                          child: CircleAvatar(
                                            radius: 120.0,
                                            backgroundImage: dp,
                                          ),
                                        ),
                                        const Spacer(),
                                      ],
                                    ),
                                    Align(
                                      alignment: Alignment.bottomRight,
                                      child: Padding(
                                        padding:
                                            const EdgeInsets.only(right: 20.0),
                                        child: GestureDetector(
                                          onTap: () => uploadUserDiagnostics(),
                                          child: Container(
                                            height: 40,
                                            width: 40,
                                            decoration: const BoxDecoration(
                                                shape: BoxShape.circle,
                                                color: kMauve),
                                            child: const Icon(Icons.article,
                                                color: kRussianViolet,
                                                size: 30),
                                          ),
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                                const SizedBox(height: 30),
                                const Padding(
                                  padding: EdgeInsets.only(left: 10, bottom: 2),
                                  child: Text(
                                    "Hi,",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20.0,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 10, bottom: 0),
                                  child: Text(
                                    userName.toString(),
                                    style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 45.0,
                                        fontFamily: "Dancing Script",
                                        fontWeight: FontWeight.w900),
                                  ),
                                ),
                                Row(
                                  children: [
                                    const Spacer(),
                                    SizedBox(
                                      height: 1,
                                      width: 200,
                                      child: WaveDivider(
                                        color: Colors.white.withOpacity(0.7),
                                      ),
                                    ),
                                    const Spacer()
                                  ],
                                ),
                                const SizedBox(height: 20),
                                Align(
                                  alignment: Alignment.center,
                                  child: Container(
                                    height: 220,
                                    width: 400,
                                    decoration: BoxDecoration(
                                        borderRadius:
                                            BorderRadius.circular(20.0),
                                        gradient: const LinearGradient(
                                            begin: Alignment.bottomLeft,
                                            end: Alignment.topRight,
                                            colors: [
                                              kRussianViolet,
                                              kAfricanViolet
                                            ])),
                                    child: Column(
                                      children: [
                                        const Align(
                                            alignment: Alignment.topCenter,
                                            child: Padding(
                                              padding: EdgeInsets.only(
                                                  top: 10, bottom: 20),
                                              child: Text(
                                                "Profile Essence",
                                                style: TextStyle(
                                                    color: kMauve,
                                                    fontSize: 12.0,
                                                    fontWeight:
                                                        FontWeight.w400),
                                              ),
                                            )),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10, left: 10),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.numbers,
                                                  size: 20.0, color: kLilac),
                                              const SizedBox(width: 10),
                                              const Text("User ID: ",
                                                  style: TextStyle(
                                                      color: kMauve,
                                                      fontSize: 15.0)),
                                              Text(widget.userID,
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15.0,
                                                      fontWeight:
                                                          FontWeight.bold))
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10, left: 10),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.home_filled,
                                                  size: 20.0, color: kLilac),
                                              const SizedBox(width: 10),
                                              const Text("Address: ",
                                                  style: TextStyle(
                                                      color: kMauve,
                                                      fontSize: 15.0)),
                                              Text(address.toString(),
                                                  softWrap: true,
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15.0,
                                                      fontWeight:
                                                          FontWeight.bold))
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10, left: 10),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.article,
                                                  size: 20.0, color: kLilac),
                                              const SizedBox(width: 10),
                                              const Text("Adhaar: ",
                                                  style: TextStyle(
                                                      color: kMauve,
                                                      fontSize: 15.0)),
                                              Text(adhaar.toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15.0,
                                                      fontWeight:
                                                          FontWeight.bold))
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10, left: 10),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.bloodtype,
                                                  size: 20.0, color: kLilac),
                                              const SizedBox(width: 10),
                                              const Text("BloodGroup: ",
                                                  style: TextStyle(
                                                      color: kMauve,
                                                      fontSize: 15.0)),
                                              Text(bloodgroup.toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15.0,
                                                      fontWeight:
                                                          FontWeight.bold))
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10, left: 10),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.phone,
                                                  size: 20.0, color: kLilac),
                                              const SizedBox(width: 10),
                                              const Text("Phone Number: ",
                                                  style: TextStyle(
                                                      color: kMauve,
                                                      fontSize: 15.0)),
                                              Text(phoneNumber.toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15.0,
                                                      fontWeight:
                                                          FontWeight.bold))
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 21),
                                Align(
                                  alignment: Alignment.topCenter,
                                  child: Container(
                                    width: 500,
                                    height: 200,
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(15),
                                        gradient: const LinearGradient(
                                            colors: [kLilac, kAfricanViolet])),
                                    child: Column(
                                      children: [
                                        const Align(
                                            alignment: Alignment.topCenter,
                                            child: Padding(
                                              padding: EdgeInsets.all(8.0),
                                              child: Text("All Orders",
                                                  style: TextStyle(
                                                      color: kRussianViolet,
                                                      fontSize: 17.0,
                                                      fontWeight:
                                                          FontWeight.bold)),
                                            )),
                                        const Padding(
                                          padding: EdgeInsets.only(
                                              left: 15.0,
                                              right: 15.0,
                                              bottom: 10.0),
                                          child: Row(
                                            children: [
                                              Text("Hospital ID",
                                                  style: TextStyle(
                                                      color: Colors.black)),
                                              Spacer(),
                                              Text("Status",
                                                  style: TextStyle(
                                                      color: Colors.black))
                                            ],
                                          ),
                                        ),
                                        allOrdersTable
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            );
                          } else {
                            if (snapshot.hasError &&
                                snapshot.connectionState ==
                                    ConnectionState.done) {
                              return const Center(
                                  child: Text(
                                "Error loading user data!",
                                style: TextStyle(color: Colors.white),
                              ));
                            } else {
                              return const Center(
                                  child: ShimmerContainer(
                                      height: 700, width: double.infinity));
                            }
                          }
                        }),
                  )
                ],
              ),
            ),
            const SizedBox(width: 10),
            Padding(
              padding: const EdgeInsets.only(right: 10.0),
              child: AnimatedContainer(
                duration: const Duration(seconds: 2),
                width: isHospitalSelected
                    ? 870
                    : MediaQuery.of(context).size.width - 586,
                curve: Curves.fastOutSlowIn,
                padding: const EdgeInsets.all(5.0),
                decoration: BoxDecoration(
                    color: kMauve, borderRadius: BorderRadius.circular(15.0)),
                child: Stack(children: [
                  Center(
                    child: ClipRRect(
                        borderRadius: BorderRadius.circular(15.0), child: map),
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: PointerInterceptor(
                      child: GestureDetector(
                        onTap: () => toggleModal(),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 500),
                          height: !isModalOpen ? 100 : 400,
                          width: 450,
                          decoration: BoxDecoration(
                              color: kIsabelline,
                              border: Border.all(color: kMauve, width: 2.4),
                              borderRadius: const BorderRadius.only(
                                  topLeft: Radius.circular(15.0),
                                  topRight: Radius.circular(15.0))),
                          child: ScrollConfiguration(
                              behavior: const ScrollBehavior()
                                  .copyWith(scrollbars: false),
                              child: ListView(
                                scrollDirection: Axis.vertical,
                                children: modalChildrens,
                              )),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(30.0),
                    child: Align(
                      alignment: Alignment.bottomLeft,
                      child: PointerInterceptor(
                          child: GestureDetector(
                        onTap: () => placeGPSMarker(),
                        child: Container(
                          height: 50,
                          width: 50,
                          decoration: const BoxDecoration(
                              shape: BoxShape.circle, color: kUltraViolet),
                          child: const Center(
                              child: Icon(Icons.my_location,
                                  color: Colors.white, size: 35)),
                        ),
                      )),
                    ),
                  )
                ]),
              ),
            ),

            // ------ Hospital Menu ------

            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: AnimatedContainer(
                duration: const Duration(seconds: 2),
                width: isHospitalSelected ? 460 : 0,
                curve: Curves.fastOutSlowIn,
                decoration: BoxDecoration(
                    color: kAfricanViolet,
                    borderRadius: BorderRadius.circular(15.0)),
                child: Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: ScrollConfiguration(
                      behavior: ScrollConfiguration.of(context).copyWith(
                          scrollbars: false,
                          physics: const NeverScrollableScrollPhysics()),
                      child: SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: SizedBox(
                            height: double.infinity,
                            width: isHospitalSelected ? 430 : 0,
                            child: hospitalMenuMasterWidget),
                      ),
                    )),
              ),
            )
          ],
        ),
      ),
    );
  }
}
