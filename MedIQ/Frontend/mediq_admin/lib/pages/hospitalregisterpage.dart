import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mediq_admin/components/chipbutton.dart';
import 'package:mediq_admin/components/roundedtextfield.dart';
import 'package:http/http.dart' as http;
import 'package:mediq_admin/config.dart';

class HospitalRegisterPage extends StatefulWidget {
  const HospitalRegisterPage({super.key});

  @override
  State<HospitalRegisterPage> createState() => _HospitalRegisterPageState();
}

class _HospitalRegisterPageState extends State<HospitalRegisterPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MediQ Admin Tools',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const RegisterPageHome(title: "MediQ Admin Tools"),
    );
  }
}

class RegisterPageHome extends StatefulWidget {
  final String title;
  const RegisterPageHome({super.key, required this.title});

  @override
  State<RegisterPageHome> createState() => _RegisterPageHomeState();
}

class _RegisterPageHomeState extends State<RegisterPageHome> {
  TextEditingController hospitalNameController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController latitudeController = TextEditingController();
  TextEditingController longitudeController = TextEditingController();
  TextEditingController availableOPDController = TextEditingController();
  TextEditingController availableEmergencyController = TextEditingController();
  TextEditingController availableTraumaController = TextEditingController();
  TextEditingController availableGeneralController = TextEditingController();

  void addHospitalToDatabase() async {
    if (hospitalNameController.text.isEmpty ||
        addressController.text.isEmpty ||
        emailController.text.isEmpty ||
        phoneNumberController.text.isEmpty ||
        latitudeController.text.isEmpty ||
        longitudeController.text.isEmpty ||
        availableOPDController.text.isEmpty ||
        availableEmergencyController.text.isEmpty ||
        availableTraumaController.text.isEmpty ||
        availableGeneralController.text.isEmpty) {
      showAlertDialog(
          context, "Make sure to fill up all the entries.", "Emptiness!");
      return;
    } else {
      Map payloadData = {
        "hospitalName": hospitalNameController.text,
        "available_opd": availableOPDController.text,
        "available_emergency": availableEmergencyController.text,
        "available_trauma": availableTraumaController.text,
        "available_general": availableGeneralController.text,
        "status": "active",
        "address": addressController.text,
        "email": emailController.text,
        "phoneNumber": phoneNumberController.text,
        "longitude": longitudeController.text,
        "latitude": latitudeController.text
      };
      try {
        var response = await http.post(Uri.http(baseURL, 'api/addHospital'),
            headers: {"Content-Type": "application/json"},
            body: jsonEncode(payloadData));
        Map jsonData = jsonDecode(response.body);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          showAlertDialog(context, jsonData["response"][0]["msg"], "Created!");
        } else {
          showAlertDialog(context, jsonData["errReason"], "Failed!");
        }
      } catch (e) {
        debugPrint("addHospitalToDatabase -> ${e.toString()}");
      }
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
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: hospitalNameController,
                obscureText: false,
                hintText: "Hospital name",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                icon: const Icon(
                  Icons.local_hospital_rounded,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: addressController,
                obscureText: false,
                hintText: "Hospital Address",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                icon: const Icon(
                  Icons.location_city_rounded,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: latitudeController,
                obscureText: false,
                hintText: "Latitude",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                icon: const Icon(
                  Icons.location_pin,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: longitudeController,
                obscureText: false,
                hintText: "Longitude",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                icon: const Icon(
                  Icons.location_pin,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: emailController,
                obscureText: false,
                hintText: "Email",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                icon: const Icon(
                  Icons.email_rounded,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              height: 50,
              width: 300,
              child: RoundedTextField(
                controller: phoneNumberController,
                obscureText: false,
                hintText: "Phone Number",
                borderColor: Colors.deepPurple,
                focusedColor: Colors.deepPurpleAccent,
                inputFormatters: <TextInputFormatter>[
                  FilteringTextInputFormatter.allow(RegExp(r'^[0-9]{0,10}')),
                ],
                icon: const Icon(
                  Icons.phone_rounded,
                  color: Colors.deepPurpleAccent,
                  size: 35.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                    height: 50,
                    width: 70,
                    child: RoundedTextField(
                      controller: availableOPDController,
                      obscureText: false,
                      hintText: "O",
                      inputFormatters: <TextInputFormatter>[
                        FilteringTextInputFormatter.allow(
                            RegExp(r'^[0-9]{0,3}')),
                      ],
                      borderColor: Colors.deepPurple,
                      focusedColor: Colors.deepPurpleAccent,
                    )),
                const SizedBox(width: 5),
                SizedBox(
                    height: 50,
                    width: 70,
                    child: RoundedTextField(
                      controller: availableEmergencyController,
                      obscureText: false,
                      hintText: "E",
                      inputFormatters: <TextInputFormatter>[
                        FilteringTextInputFormatter.allow(
                            RegExp(r'^[0-9]{0,3}')),
                      ],
                      borderColor: Colors.deepPurple,
                      focusedColor: Colors.deepPurpleAccent,
                    )),
                const SizedBox(width: 5),
                SizedBox(
                    height: 50,
                    width: 70,
                    child: RoundedTextField(
                      controller: availableTraumaController,
                      obscureText: false,
                      hintText: "T",
                      inputFormatters: <TextInputFormatter>[
                        FilteringTextInputFormatter.allow(
                            RegExp(r'^[0-9]{0,3}')),
                      ],
                      borderColor: Colors.deepPurple,
                      focusedColor: Colors.deepPurpleAccent,
                    )),
                const SizedBox(width: 5),
                SizedBox(
                    height: 50,
                    width: 70,
                    child: RoundedTextField(
                      controller: availableGeneralController,
                      obscureText: false,
                      hintText: "G",
                      inputFormatters: <TextInputFormatter>[
                        FilteringTextInputFormatter.allow(
                            RegExp(r'^[0-9]{0,3}')),
                      ],
                      borderColor: Colors.deepPurple,
                      focusedColor: Colors.deepPurpleAccent,
                    )),
              ],
            ),
          ),
          const SizedBox(height: 8),
          ChipButton(
              height: 50,
              width: 150,
              onClickedCallback: () => addHospitalToDatabase(),
              text: const Text(
                "Add Hospital",
                style:
                    TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
              isActivated: true)
        ]),
      ),
    );
  }
}

showAlertDialog(BuildContext context, String msg, String title) {
  // Create button
  Widget okButton = TextButton(
    child: const Text("OK"),
    onPressed: () {
      Navigator.of(context, rootNavigator: true).pop();
    },
  );

  // Create AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text(title),
    content: Text(msg),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
