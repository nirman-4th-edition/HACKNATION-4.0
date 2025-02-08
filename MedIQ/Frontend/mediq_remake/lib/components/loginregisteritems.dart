// ignore_for_file: prefer_typing_uninitialized_variables, unused_local_variable

import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart';
import 'package:flutter_gradient_animation_text/flutter_gradient_animation_text.dart';
import "package:flutter/material.dart";
import 'package:mediq_remake/b64utils.dart';
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/components/glowedupbutton.dart';
import 'package:mediq_remake/components/roundedtextfield.dart';
import 'package:mediq_remake/constants.dart';
import 'package:mediq_remake/pages/mainpage.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';

class LoginRegisterItems extends StatefulWidget {
  final Function(double newHeight)? changeContainerHeight;
  const LoginRegisterItems({super.key, this.changeContainerHeight});

  @override
  State<LoginRegisterItems> createState() => _LoginRegisterItemsState();
}

class _LoginRegisterItemsState extends State<LoginRegisterItems> {
  TextEditingController adhaarController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController policyController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController alergiesController = TextEditingController();
  TextEditingController ageController = TextEditingController();
  String? selectedBloodType;
  String selectedGender = "None";

  String? profilePhotoB64String;

  List<Widget> widgetTree = [];

  List<Widget> widgetTreeHeader = [
    const Align(
      alignment: Alignment.topCenter,
      child: GradientAnimationText(
          text: Text(
            "MediQ",
            style: TextStyle(
                fontSize: 55.0,
                fontWeight: FontWeight.w900,
                fontFamily: "Pacifico"),
          ),
          colors: [Color(0xFF80ed99), Color(0xFF80ffdb)],
          duration: Duration(seconds: 5)),
    ),
    const SizedBox(height: 25),
    Row(
      children: [
        const Spacer(flex: 1),
        Expanded(flex: 2, child: Divider(color: Colors.white.withOpacity(0.3))),
        const Spacer(flex: 1)
      ],
    ),
  ];

  List<Widget> loginWidgetTree = [];
  List<Widget> registerWidgetTree = [];

  @override
  void initState() {
    selectedBloodType = "Bloodgroup";
    loginWidgetTree.addAll([
      const SizedBox(height: 15),
      const Text("Login",
          style: TextStyle(
              fontFamily: "Caveat",
              color: Color.fromARGB(255, 231, 231, 231),
              fontWeight: FontWeight.bold,
              fontSize: 45.0)),
      const SizedBox(height: 25.0),
      RoundedTextField(
          controller: adhaarController,
          style:
              const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          obscureText: false,
          icon: const Icon(
            Icons.article,
            color: kAccentColor1,
            size: 35.0,
          ),
          hintText: "Registered Adhaar Number",
          inputFormatters: <TextInputFormatter>[
            FilteringTextInputFormatter.allow(RegExp(r'^[0-9]{0,12}')),
          ]),
      const SizedBox(height: 100.0),
      GlowedUpButton(
        onClickedCallback: login,
        glowColor: kAccentColor1,
        buttonText: const Text("Login",
            style: TextStyle(
                fontSize: 15.0,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 88, 88, 88))),
      ),
      const SizedBox(height: 140.0),
      Row(children: [
        const Spacer(flex: 1),
        Expanded(flex: 2, child: Divider(color: Colors.white.withOpacity(0.3))),
        const Spacer(flex: 1)
      ]),
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "Don't have an account? ",
            style: TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.w300,
                color: Colors.white),
          ),
          GestureDetector(
            onTap: switchToRegister,
            child: const Text("Let's create one!",
                style: TextStyle(
                    fontSize: 12.0,
                    fontWeight: FontWeight.bold,
                    color: kAccentColor1)),
          )
        ],
      )
    ]);

    registerWidgetTree.addAll([
      const Text("Register",
          style: TextStyle(
              fontFamily: "Caveat",
              color: Color.fromARGB(255, 231, 231, 231),
              fontWeight: FontWeight.bold,
              fontSize: 45.0)),
      const SizedBox(height: 10.0),
      RoundedTextField(
          controller: adhaarController,
          style:
              const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          obscureText: false,
          icon: const Icon(
            Icons.article,
            color: kAccentColor1,
            size: 35.0,
          ),
          hintText: "Adhaar Number",
          inputFormatters: <TextInputFormatter>[
            FilteringTextInputFormatter.allow(RegExp(r'^[0-9]{0,12}')),
          ]),
      const SizedBox(
        height: 7,
      ),
      RoundedTextField(
          controller: nameController,
          style:
              const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          obscureText: false,
          icon: const Icon(
            Icons.account_circle,
            color: kAccentColor1,
            size: 35.0,
          ),
          hintText: "Full Name"),
      const SizedBox(
        height: 7,
      ),
      RoundedTextField(
          controller: addressController,
          style:
              const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          obscureText: false,
          icon: const Icon(
            Icons.house_rounded,
            color: kAccentColor1,
            size: 35.0,
          ),
          hintText: "Address"),
      const SizedBox(
        height: 7,
      ),
      RoundedTextField(
        controller: phoneNumberController,
        style:
            const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        obscureText: false,
        icon: const Icon(
          Icons.phone_rounded,
          color: kAccentColor1,
          size: 35.0,
        ),
        hintText: "Phone Number",
        inputFormatters: <TextInputFormatter>[
          FilteringTextInputFormatter.allow(RegExp(r'^[0-9]{0,10}')),
        ],
      ),
      const SizedBox(height: 7),
      RoundedTextField(
          controller: alergiesController,
          style:
              const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          obscureText: false,
          icon: const Icon(
            Icons.vaccines_rounded,
            color: kAccentColor1,
            size: 35.0,
          ),
          hintText: "Alergies (If Any)"),
      const SizedBox(height: 10),
      Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: RoundedTextField(
              style: const TextStyle(
                  color: Colors.black, fontWeight: FontWeight.bold),
              icon: const Icon(Icons.access_time, color: kAccentColor1),
              controller: ageController,
              obscureText: false,
              inputFormatters: <TextInputFormatter>[
                FilteringTextInputFormatter.allow(RegExp(r'^[0-9]{0,3}')),
              ],
              hintText: "Age",
            ),
          ),
          const SizedBox(width: 20),
          const Icon(Icons.bloodtype, color: kAccentColor1, size: 35),
          const SizedBox(width: 5),
          StatefulBuilder(
            builder: (context, setState) {
              return DropdownButton(
                value: selectedBloodType,
                items: <String>[
                  'Bloodgroup',
                  'A+',
                  'A-',
                  'B+',
                  'B-',
                  'AB+',
                  'AB-',
                  'O+',
                  'O-',
                  'Unknown'
                ].map((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(
                      value,
                      style: const TextStyle(color: Colors.white, fontSize: 15),
                    ),
                  );
                }).toList(),
                onChanged: (v) {
                  selectedBloodType = v.toString();
                  setState(() {
                    selectedBloodType;
                    debugPrint(selectedBloodType);
                  });
                },
              );
            },
          ),
          const SizedBox(width: 45),
          StatefulBuilder(builder: (context, setState) {
            return Row(children: [
              ChipButton(
                  onClickedCallback: () =>
                      changeSelectedGender("male", setState),
                  height: 40,
                  width: 60,
                  text: const Text("Male",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                  isActivated: selectedGender == "male"),
              const SizedBox(width: 10),
              ChipButton(
                  onClickedCallback: () =>
                      changeSelectedGender("female", setState),
                  height: 40,
                  width: 60,
                  text: const Text("Female",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                  isActivated: selectedGender == "female")
            ]);
          }),
        ],
      ),
      const SizedBox(height: 10),
      Align(
        alignment: Alignment.topLeft,
        child: Padding(
          padding: const EdgeInsets.only(left: 30),
          child: ChipButton(
              height: 50,
              width: 100,
              text: const Text("Profile Photo",
                  style: TextStyle(color: Color.fromARGB(255, 119, 119, 119))),
              isActivated: true,
              activatedColor: Colors.white,
              onClickedCallback: () => pickUserFile()),
        ),
      ),
      const SizedBox(height: 30),
      GlowedUpButton(
        blurRadius: 20.0,
        onClickedCallback: register,
        glowColor: kAccentColor1,
        buttonText: const Text("Register",
            style: TextStyle(
                fontSize: 15.0,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 88, 88, 88))),
      ),
      const SizedBox(height: 12.0),
      Row(children: [
        const Spacer(flex: 1),
        Expanded(flex: 2, child: Divider(color: Colors.white.withOpacity(0.3))),
        const Spacer(flex: 1)
      ]),
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "Already have an account? ",
            style: TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.w300,
                color: Colors.white),
          ),
          GestureDetector(
            onTap: switchToLogin,
            child: const Text("Login Now.",
                style: TextStyle(
                    fontSize: 12.0,
                    fontWeight: FontWeight.bold,
                    color: kAccentColor1)),
          )
        ],
      )
    ]);

    widgetTree.addAll(widgetTreeHeader);
    widgetTree.addAll(loginWidgetTree);
    super.initState();
  }

  void login() async {
    if (adhaarController.text == "" || adhaarController.text.length != 12) {
      showAlertDialog(
          context,
          "You've entered an invalid adhaar number. Please recheck your adhaar ID.",
          "Login Error");
      adhaarController.text = "";
      return;
    }

    var response;
    try {
      var response = await http.get(
          Uri.http(
              baseUrl, "api/retrieveUserID", {"adhaar": adhaarController.text}),
          headers: {"Accept": "application/json"});
      if (response.statusCode != 200) {
        showAlertDialog(
            context,
            "No user found for the provided adhaar number from the database. Please recheck your Adhaar ID or register yourself first.",
            "Login Error");
      } else {
        Map parsedJson = jsonDecode(response.body);
        openMainPage(parsedJson["userId"]);
      }
    } catch (e) {
      showAlertDialog(
          context,
          "There was an error connecting the API server. Please try again after sometime!",
          "Connection Error");
      return;
    }
  }

  void register() async {
    if (nameController.text == "" ||
        addressController.text == "" ||
        adhaarController.text == "" ||
        adhaarController.text.length < 12 ||
        selectedBloodType == "Bloodgroup" ||
        phoneNumberController.text.length < 10 ||
        ageController.text == "" ||
        int.parse(ageController.text) > 110 ||
        int.parse(ageController.text) < 2 ||
        selectedGender == "None" ||
        profilePhotoB64String == null) {
      showAlertDialog(context, "Please fill up all the details correctly!",
          "Registration Error");

      return;
    }

    Map payloadData = {
      'fullName': nameController.text,
      'userAddress': addressController.text,
      'adhaar': adhaarController.text,
      'bloodGroup': selectedBloodType,
      'alergies': alergiesController.text,
      'insuranceNo': "", //Obsolete entry.
      'phoneNumber': phoneNumberController.text,
      'age': ageController.text,
      'gender': selectedGender,
      "profilePhoto": profilePhotoB64String
    };

    var payload = jsonEncode(payloadData);
    var response;

    try {
      response = await http.post(Uri.http(baseUrl, "api/addUser"),
          body: payload, headers: {"Content-Type": "application/json"});
    } catch (e) {
      showAlertDialog(
          context,
          "There was an error connecting the API server. Please try again after sometime!",
          "Connection Error");
    }
    if (response.statusCode == 201) {
      Map parsedJson = jsonDecode(response.body);
      debugPrint(parsedJson.toString());
      String msg = parsedJson["response"][0]["msg"];
      int userID = int.parse(
          RegExp(r'User added to the database with id = (.*)')
              .firstMatch(msg)
              ?.group(1) as String);
      openMainPage(userID);
    } else {
      Map parsedJson = jsonDecode(response.body);
      showAlertDialog(
          context,
          "Failed to add user data!\n${parsedJson["response"][0]["msg"]}}",
          "Registration Error");
    }
  }

  void changeSelectedGender(String newGender, chipButtonState) {
    debugPrint("Selected Gender: $newGender");
    chipButtonState(() {
      selectedGender = newGender;
    });
  }

  void switchToLogin() {
    widget.changeContainerHeight!(700);
    setState(() {
      widgetTree = [];
      widgetTree.addAll(widgetTreeHeader);
      widgetTree.addAll(loginWidgetTree);
    });
  }

  void switchToRegister() {
    widget.changeContainerHeight!(805);
    setState(() {
      widgetTree = [];
      widgetTree.addAll(widgetTreeHeader);
      widgetTree.addAll(registerWidgetTree);
    });
  }

  void openMainPage(int userID) {
    debugPrint("Opening MainPage with userID $userID");

    Navigator.of(context).pushReplacement(MaterialPageRoute(
        builder: (context) => MainPage(userID: userID.toString())));
  }

  void pickUserFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
        allowedExtensions: ["jpg", "jpeg", "png"], type: FileType.custom);
    if (result != null) {
      Uint8List fileBytes = result.files.first.bytes!;
      profilePhotoB64String = base64String(fileBytes);
      debugPrint(
          "Profile Photo selected! Base64 Length: ${profilePhotoB64String!.length}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: widgetTree,
    );
  }
}

showAlertDialog(BuildContext context, String msg, String title) {
  // Create button
  Widget okButton = PointerInterceptor(
    child: TextButton(
      child: const Text("OK"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    ),
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
