import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mediq_remake/components/obsoletehospitalcard.dart';
import 'package:mediq_remake/constants.dart';

Future<List<Widget>> getHospitalCards(
    double? lat, double? long, String userID) async {
  if (lat == null && long == null) {
    return [
      const Align(
          alignment: Alignment.center,
          child: Text(
            "Please place a marker first to find the nearest hospital",
            style: TextStyle(color: Colors.black),
          ))
    ];
  }

  await Future.delayed(const Duration(seconds: 2), () {});
  List<Widget> allHospitalCards = [];

  var response;
  try {
    response = await http.get(
        Uri.http(baseUrl, "api/getNearestHospitals", {
          "lat": lat.toString(),
          "long": long.toString(),
          "maxRangeInKM": "7"
        }),
        headers: {"Accept": "application/json"});
    debugPrint(response.statusCode.toString());
    if (response.statusCode == 200) {
      Map jsonData = jsonDecode(response.body);
      if (jsonData["response"].length == 0) {
        return [
          const Align(
              alignment: Alignment.center,
              child: Text(
                "No hospitals were found in your area!",
                style: TextStyle(color: Colors.black),
              ))
        ];
      }
      List allHospitalIDs = jsonData["response"];
      for (var element in allHospitalIDs) {
        allHospitalCards
            .add(ObsoleteHospitalCard(hospID: element, userID: userID));
      }
    }
  } catch (e) {
    debugPrint(e.toString());
    return [
      const Align(
          alignment: Alignment.center,
          child: Text(
            "Error occured while searching for hospitals!",
            style: TextStyle(color: Colors.black),
          ))
    ];
  }
  return allHospitalCards;
}
