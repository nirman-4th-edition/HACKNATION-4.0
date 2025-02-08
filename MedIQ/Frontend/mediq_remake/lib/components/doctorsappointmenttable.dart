import "dart:convert";
import "dart:ui";

import "package:flutter/material.dart";
import "package:flutter_expandable_table/flutter_expandable_table.dart";
import "package:mediq_remake/components/docappointmentoverlay.dart";
import "package:mediq_remake/constants.dart";
import 'package:http/http.dart' as http;

const Color _primaryColor = kRussianViolet; //Color(0xFF1e2f36); //corner
const Color _accentColor = kRussianViolet; //background
const TextStyle _textStyle = TextStyle(color: Colors.white);

class _DefaultCellCard extends StatelessWidget {
  final Widget child;

  const _DefaultCellCard({
    required this.child,
  });

  @override
  Widget build(BuildContext context) => Container(
        color: _primaryColor,
        margin: const EdgeInsets.all(1),
        child: child,
      );
}

class DoctorsAppointmentTable extends StatelessWidget {
  final String hospitalID;
  final String userID;
  const DoctorsAppointmentTable(
      {super.key, required this.hospitalID, required this.userID});

  @override
  Widget build(BuildContext context) {
    ExpandableTableCell buildCell(String content, String shift,
            {CellBuilder? builder,
            required String userID,
            required String hospitalID,
            bool isClickable = false}) =>
        ExpandableTableCell(
          child: builder != null
              ? null
              : GestureDetector(
                  onTap: () {
                    if (!isClickable) {
                      return;
                    } else {
                      debugPrint(
                          "---- Table Cell Callback ----\nUserID: $userID\nHospID: $hospitalID\nShift: $shift\nName: $content");
                    }
                    OverlayState overlayState = Overlay.of(context);
                    OverlayEntry? overlayEntry;
                    overlayEntry = OverlayEntry(builder: (c2) {
                      return DocAppointmentBookWindowOverlay(
                          overlayEntry: overlayEntry,
                          hospitalID: hospitalID,
                          doctorName: content,
                          shift: shift,
                          userID: userID);
                    });
                    overlayState.insert(overlayEntry);
                  },
                  child: _DefaultCellCard(
                    child: Center(
                      child: Text(
                        content,
                        style: _textStyle,
                      ),
                    ),
                  ),
                ),
          builder: builder,
        );

    Future<ExpandableTable?> buildSimpleTable() async {
      Map jsonData;

      try {
        var response = await http.get(Uri.http(
            baseUrl, "api/getDocSchedule", {"hospitalID": hospitalID}));
        if (response.statusCode != 200) {
          throw Exception(
              "buildSimpleTable -> HttpResponseCode: ${response.statusCode}");
        }
        jsonData = jsonDecode(response.body);
      } catch (e) {
        debugPrint(e.toString());
        return null;
      }

      //Creation header
      final List<ExpandableTableHeader> headers = [];

      for (var elmnt in jsonData["headers"]) {
        headers.add(ExpandableTableHeader(
            width: 170,
            cell: buildCell(elmnt, "null",
                userID: userID, hospitalID: hospitalID)));
      }

      //Creation rows
      final List<ExpandableTableRow> rows = [];

      for (var i = 0; i < jsonData.keys.length - 1; i++) {
        rows.add(ExpandableTableRow(
            height: 65,
            firstCell: buildCell(
                jsonData.keys.toList()[i], jsonData.keys.toList()[i],
                userID: userID, hospitalID: hospitalID),
            cells: List<ExpandableTableCell>.generate(
                jsonData[jsonData.keys.toList()[i]].length,
                (index) => buildCell(jsonData[jsonData.keys.toList()[i]][index],
                    jsonData.keys.toList()[i],
                    userID: userID,
                    hospitalID: hospitalID,
                    isClickable: true))));
      }

      return ExpandableTable(
        headerHeight: 70,
        firstColumnWidth: 100,
        firstHeaderCell:
            buildCell("Shifts", "null", userID: userID, hospitalID: hospitalID),
        headers: headers,
        scrollShadowColor: _accentColor,
        rows: rows,
        visibleScrollbar: true,
        trackVisibilityScrollbar: true,
        thumbVisibilityScrollbar: true,
      );
    }

    return FutureBuilder(
        future: buildSimpleTable(),
        builder: (ctx, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.data != null) {
              return snapshot.data!;
            } else {
              return const Text("Error loading Doctor's Schedule");
            }
          } else {
            return const SizedBox(height: 270, width: double.infinity);
          }
        });
  }
}

class AppCustomScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.trackpad,
      };
}
