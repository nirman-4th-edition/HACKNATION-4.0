import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:mediq_remake/components/hospitalcardmaker.dart';
import 'package:mediq_remake/components/loginregisteritems.dart';
import 'package:mediq_remake/components/mapcontainer.dart';
import 'package:mediq_remake/constants.dart';
import 'package:flutter_gradient_animation_text/flutter_gradient_animation_text.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';

class ObsoleteMainPage extends StatelessWidget {
  String userID;
  ObsoleteMainPage({super.key, required this.userID});

  late final List<Widget> actionButtons;
  bool isModalOpen = false;
  double? sLatitude;
  double? sLongitude;

  void onMarkerChangedCallback(lat, long) {
    debugPrint("onMarkerChangedCallback: $lat:$long");
    sLatitude = lat;
    sLongitude = long;
  }

  Widget? allNearestHospitals;
  int modalButtonOpacity = 1;

  void openModal(context, setState) async {
    if (isModalOpen) {
      return;
    } else {
      isModalOpen = true;
      setState(() {
        modalButtonOpacity = 0;
      });
      await showModalBottomSheet(
          context: context,
          backgroundColor: Colors.transparent,
          isDismissible: false,
          enableDrag: true,
          isScrollControlled: true,
          builder: (context) => PointerInterceptor(child: getModal(context)));
      isModalOpen = false;
      setState(() {
        modalButtonOpacity = 1;
      });
    }
  }

  Widget getModal(context) => DraggableScrollableSheet(
        minChildSize: 0.7,
        initialChildSize: 0.7,
        maxChildSize: 0.8,
        builder: (context, scrollController) => Container(
          width: 550,
          height: MediaQuery.sizeOf(context).height / 1.3,
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20.5),
                  topRight: Radius.circular(20.5)),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 5,
                    blurRadius: 7,
                    offset: const Offset(0, 3))
              ]),
          child: LayoutBuilder(builder: (context, constraints) {
            return ConstrainedBox(
              constraints: BoxConstraints(
                  minHeight: constraints.maxHeight,
                  minWidth: constraints.maxWidth),
              child: IntrinsicHeight(
                child: ListView(
                  controller: scrollController,
                  children: [
                    GestureDetector(
                      onTap: () {
                        Navigator.of(context).pop();
                        isModalOpen = false;
                        allNearestHospitals = null;
                      },
                      child: const Icon(
                        Icons.keyboard_arrow_down_rounded,
                        color: kBlueAccentColor,
                        size: 45.0,
                      ),
                    ),
                    const Center(
                      child: const Text(
                        "All Nearest Hospitals",
                        style: TextStyle(
                            color: Colors.black,
                            fontSize: 25.0,
                            fontWeight: FontWeight.w700),
                      ),
                    ),
                    const SizedBox(height: 10),
                    FutureBuilder(
                      future: getHospitalCards(sLatitude, sLongitude, userID),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                                ConnectionState.waiting ||
                            snapshot.connectionState ==
                                ConnectionState.active) {
                          return const Center(
                            child: Text(
                              "Searching for nearest hospitals...",
                              style: TextStyle(color: Colors.black),
                            ),
                          );
                        } else if (snapshot.hasData) {
                          return Column(
                            children: snapshot.data as List<Widget>,
                          );
                        } else {
                          return const Center(
                            child: Text(
                              "Error occured while searching nearest hospitals!",
                              style: TextStyle(color: Colors.white),
                            ),
                          );
                        }
                      },
                    )
                  ],
                ),
              ),
            );
          }),
        ),
      );

  @override
  Widget build(BuildContext context) {
    MapContainer map = MapContainer(
        onMarkerChangedCallback: (lattitude, longitude) {
          onMarkerChangedCallback(lattitude, longitude);
        },
        height: MediaQuery.sizeOf(context).height,
        width: MediaQuery.sizeOf(context).width);

    return SafeArea(
      child: Scaffold(
        extendBodyBehindAppBar: true,
        appBar: PreferredSize(
          preferredSize: const Size.fromHeight(85.0),
          child: PointerInterceptor(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(boxShadow: [
                  BoxShadow(
                      color: kBlueAccentColor.withOpacity(0.6),
                      spreadRadius: 5,
                      blurRadius: 30.0)
                ]),
                child: Center(
                  child: AppBar(
                    clipBehavior: Clip.none,
                    elevation: 3,
                    primary: true,
                    shadowColor: Colors.white,
                    iconTheme:
                        const IconThemeData(size: 140, color: Colors.white),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0)),
                    backgroundColor: kBlueAccentColor,
                    title: const Column(
                      children: [
                        SizedBox(height: 14),
                        Padding(
                          padding: EdgeInsets.only(left: 20.0),
                          child: GradientAnimationText(
                              text: Text(
                                "MediQ",
                                style: TextStyle(
                                    fontSize: 30.0,
                                    fontWeight: FontWeight.w900,
                                    fontFamily: "Pacifico"),
                              ),
                              colors: [Color(0xFF80ed99), Color(0xFF80ffdb)],
                              duration: Duration(seconds: 5)),
                        ),
                      ],
                    ),
                    actions: [
                      Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: PointerInterceptor(
                          intercepting: false,
                          debug: true,
                          child: GestureDetector(
                            onTap: () async {
                              debugPrint("Fetching geo location");
                              Location location = Location();
                              LocationData locationData;
                              try {
                                locationData = await location.getLocation();
                              } catch (e) {
                                showAlertDialog(
                                    context,
                                    "Cannot retrieve location data",
                                    "Location Error");
                                return;
                              }
                              debugPrint(
                                  "Geo Location: ${locationData.latitude}:${locationData.longitude}");
                              map.mapContainerState.setPointerLocation(
                                  locationData.latitude,
                                  locationData.longitude);
                            },
                            child: const Icon(Icons.my_location,
                                color: Colors.white, size: 40),
                          ),
                        ),
                      ),
                      Padding(
                        padding:
                            const EdgeInsets.fromLTRB(15.0, 15.0, 45.0, 15.0),
                        child: GestureDetector(
                            onTap: () {
                              debugPrint("Opening Profile");
                            },
                            child: const Icon(Icons.account_circle,
                                color: Colors.white, size: 40)),
                      )
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        body: Stack(
          children: [
            map,
            Align(
              alignment: Alignment.bottomCenter,
              child: PointerInterceptor(
                  child: StatefulBuilder(builder: (cntx, setState) {
                return GestureDetector(
                  onTap: () {
                    debugPrint("Opening Modal");
                    openModal(context, setState);
                  },
                  child: Opacity(
                    opacity: modalButtonOpacity as double,
                    child: Container(
                      width: 610,
                      height: 100,
                      decoration: BoxDecoration(
                          borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(20.5),
                              topRight: Radius.circular(20.5)),
                          color: Colors.white,
                          boxShadow: [
                            BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                spreadRadius: 5,
                                blurRadius: 7,
                                offset: const Offset(0, 3))
                          ]),
                      child: const Padding(
                        padding: EdgeInsets.only(top: 15.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.keyboard_arrow_up_rounded,
                              color: kBlueAccentColor,
                              size: 45.0,
                            ),
                            Text(
                              "All Nearest Hospitals",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 25.0,
                                  fontWeight: FontWeight.w700),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              })),
            ),
          ],
        ),
      ),
    );
  }
}
