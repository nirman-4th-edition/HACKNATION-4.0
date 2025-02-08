import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mediq_admin/components/chipbutton.dart';
import 'package:mediq_admin/components/ordercard.dart';
import 'package:mediq_admin/components/roundedtextfield.dart';
import "package:http/http.dart" as http;
import 'package:mediq_admin/config.dart';
import 'package:mediq_admin/pages/hospitalregisterpage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MediQ Admin Tools',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'MediQ Admin Tools'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController controller = TextEditingController();

  List<Widget> allOrderChild = [
    const SizedBox(height: 5),
  ];

  Future<void> addOrderCards(String userID, String requestedBed,
      String hospitalID, int isSpecialServiceRequired) async {
    try {
      var response = await http
          .get(Uri.http(baseURL, 'api/getUserMetadata', {"userID": userID}));
      if (response.statusCode == 200) {
        Map jsonData = jsonDecode(response.body);
        debugPrint(jsonData.toString());
        setState(() {
          allOrderChild.add(OrderCard(
            fullName: jsonData["fullName"],
            bloodType: jsonData["bloodgroup"],
            gender: jsonData["gender"],
            address: jsonData["userAddress"],
            adhaar: jsonData["adhaar"],
            age: jsonData["age"].toString(),
            alergies: jsonData["alergies"],
            insuranceNumber: jsonData["insuranceNo"],
            phoneNumber: jsonData["phoneNumber"],
            requestedBed: requestedBed,
            hospitalID: hospitalID,
            userID: userID,
            isSpecialServiceRequired:
                isSpecialServiceRequired == 1 ? true : false,
            startMonitoringOrdersCallback: startMonitoringOrders,
          ));
          allOrderChild.add(const SizedBox(height: 20.0));
        });
      } else {
        debugPrint(
            "addOrderCards -> ${response.statusCode.toString()} returned! for userID = $userID");
      }
    } catch (e) {
      debugPrint("addOrderCards -> ${e.toString()}");
    }
  }

  void startMonitoringOrders() async {
    setState(() {
      allOrderChild = [];
    });

    try {
      var response = await http.get(
          Uri.http(baseURL, "api/getOrders", {"hospitalID": controller.text}));
      if (response.statusCode == 200) {
        List jsonData = jsonDecode(response.body);
        for (var i in jsonData) {
          addOrderCards(i["userID"], i["requestedBed"], i["hospitalID"],
              i["isSpecialServiceRequested"]);
        }
      } else {
        debugPrint("startMonitoringOrders -> ${response.statusCode} returned!");
      }
    } catch (e) {
      debugPrint("startMonitoringOrders -> ${e.toString()}");
    }

    try {
      // Refresh every 30 seconds.
      Future.delayed(refreshDuration, () {
        startMonitoringOrders();
        debugPrint("Order list refreshed with hospitalID = ${controller.text}");
      });
    } catch (e) {
      //pass
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: ListView(
          children: <Widget>[
            const SizedBox(height: 20.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 150,
                  height: 50,
                  child: RoundedTextField(
                    controller: controller,
                    obscureText: false,
                    borderColor: Colors.purpleAccent,
                    hintText: "Enter hospital ID",
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(15.0, 8.0, 8.0, 10.0),
                  child: ChipButton(
                      onClickedCallback: () {
                        startMonitoringOrders();
                      },
                      height: 50,
                      width: 70,
                      text: const Text("Monitor",
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold)),
                      isActivated: true),
                )
              ],
            ),
            const SizedBox(height: 20.0),
            const Align(
              alignment: Alignment.center,
              child: Text(
                'All Pendng Orders',
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 25.0,
                    fontWeight: FontWeight.w900),
              ),
            ),
            const SizedBox(height: 5),
            Align(
              alignment: Alignment.center,
              child: Text(
                'Order list will refresh automatically every ${refreshDuration.inSeconds} seconds',
                style: const TextStyle(color: Colors.black, fontSize: 13.0),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                children: allOrderChild,
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const HospitalRegisterPage(),
              ));
        },
        tooltip: 'Add hospital',
        child: const Icon(Icons.add),
      ),
    );
  }
}
