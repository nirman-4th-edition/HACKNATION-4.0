import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mediq_remake/constants.dart';

Future<List> getAllNearestHospitals(double? lat, double? long) async {
  List allNearestHospitals = [];

  if (lat == null || long == null) {
    return allNearestHospitals;
  }

  await Future.delayed(const Duration(seconds: 4));

  var response;
  response = await http.get(Uri.http(baseUrl, "api/getNearestHospitals", {
    "maxRangeInKM": "7",
    "lat": lat.toString(),
    "long": long.toString(),
  }));
  if (response.statusCode == 200) {
    Map responseJson = jsonDecode(response.body);
    if (responseJson["response"].length == 0) {
      return allNearestHospitals;
    } else {
      for (var elmnt in responseJson["response"]) {
        response = await http.get(Uri.http(baseUrl, "api/getHospitalMetadata",
            {"hospitalID": elmnt.toString()}));
        if (response.statusCode == 200) {
          responseJson = jsonDecode(response.body);
          allNearestHospitals.add({
            "hospitalName": responseJson["hospitalName"],
            "address": responseJson["address"],
            "hospitalID": elmnt.toString()
          });
        }
      }
    }
  }

  return allNearestHospitals;
}

Future<Map> getHospitalMetadata(String id) async {
  // Intentional delays for the animations...
  await Future.delayed(const Duration(seconds: 3));

  Map hospitalMetadata = {};
  var response;
  response = await http
      .get(Uri.http(baseUrl, "api/getHospitalMetadata", {"hospitalID": id}));
  if (response.statusCode == 200) {
    Map parsedJson = jsonDecode(response.body);
    String hospitalName = parsedJson["hospitalName"],
        hospitalAddress = parsedJson["address"],
        email = parsedJson["email"],
        phoneNumber = parsedJson["phoneNumber"],
        status = parsedJson["status"];
    int availableOPD = parsedJson["available_opd"],
        availableEmergency = parsedJson["available_emergency"],
        availableTrauma = parsedJson["available_trauma"],
        availableGeneral = parsedJson["available_general"],
        priceRating = parsedJson["price_rating"];

    hospitalMetadata = {
      "hospitalName": hospitalName,
      "address": hospitalAddress,
      "email": email,
      "phoneNumber": phoneNumber,
      "status": status,
      "availableOPD": availableOPD,
      "availableEmergency": availableEmergency,
      "availableTrauma": availableTrauma,
      "availableGeneral": availableGeneral,
      "priceRating": priceRating
    };
    return hospitalMetadata;
  } else {
    return {};
  }
}

Future<Map> getHospitalBeds(String id) async {
  Map hospitalMetadata = {};
  var response;
  response = await http
      .get(Uri.http(baseUrl, "api/getHospitalMetadata", {"hospitalID": id}));
  if (response.statusCode == 200) {
    Map parsedJson = jsonDecode(response.body);
    int availableOPD = parsedJson["available_opd"],
        availableEmergency = parsedJson["available_emergency"],
        availableGeneral = parsedJson["available_general"];

    hospitalMetadata = {
      "availableOPD": availableOPD,
      "availableEmergency": availableEmergency,
      "availableGeneral": availableGeneral,
    };
    return hospitalMetadata;
  } else {
    return {};
  }
}
