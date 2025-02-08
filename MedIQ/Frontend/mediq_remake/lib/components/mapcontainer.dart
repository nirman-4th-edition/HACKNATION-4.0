import 'package:flutter/material.dart';
import 'package:flutter_osm_plugin/flutter_osm_plugin.dart';
import 'package:mediq_remake/constants.dart';

class MapContainer extends StatefulWidget {
  final double? height;
  final double? width;
  final double lattitude;
  final double longitude;
  final double zoomLevel;
  final Function(double? lattitude, double? longitude)? onMarkerChangedCallback;
  late final MapContainerState mapContainerState;
  MapContainer(
      {super.key,
      this.height,
      this.width,
      this.onMarkerChangedCallback,
      this.lattitude = 20.4776,
      this.longitude = 85.8276,
      this.zoomLevel = 14.67}) {
    mapContainerState = MapContainerState();
  }

  @override
  State<MapContainer> createState() => mapContainerState;
}

class MapContainerState extends State<MapContainer> {
  late final MapController mapController;

  GeoPoint? oldGeoPoint;
  GeoPoint? latestGeoPoint;

  @override
  void initState() {
    mapController = MapController(
        initPosition:
            GeoPoint(latitude: widget.lattitude, longitude: widget.longitude));
    mapController.listenerMapSingleTapping.addListener(onSingleTapOnMap);
    super.initState();
  }

  void setPointerLocation(latitude, longitude) async {
    debugPrint("setPointerLocation: $latitude:$longitude");
    if (oldGeoPoint == null) {
      latestGeoPoint =
          oldGeoPoint = GeoPoint(latitude: latitude, longitude: longitude);
      await mapController.addMarker(latestGeoPoint!,
          markerIcon: const MarkerIcon(
              icon: Icon(Icons.location_pin, color: kAfricanViolet, size: 45)));
      await mapController.moveTo(latestGeoPoint!, animate: true);
    } else {
      await mapController.removeMarker(oldGeoPoint!);
      oldGeoPoint = latestGeoPoint;
      latestGeoPoint = GeoPoint(latitude: latitude, longitude: longitude);
      if (oldGeoPoint != latestGeoPoint) {
        await mapController.addMarker(latestGeoPoint!,
            markerIcon: const MarkerIcon(
                icon:
                    Icon(Icons.location_pin, color: kAfricanViolet, size: 45)));
        await mapController.removeMarker(oldGeoPoint!);
      }
      await mapController.moveTo(latestGeoPoint!, animate: true);
    }
    widget.onMarkerChangedCallback!(
        latestGeoPoint?.latitude, latestGeoPoint?.longitude);
  }

  void onSingleTapOnMap() async {
    if (oldGeoPoint == null) {
      latestGeoPoint =
          oldGeoPoint = mapController.listenerMapSingleTapping.value!;
      await mapController.addMarker(latestGeoPoint!,
          markerIcon: const MarkerIcon(
              icon: Icon(Icons.location_pin, color: kAfricanViolet, size: 45)));
    } else {
      await mapController.removeMarker(oldGeoPoint!);
      oldGeoPoint = latestGeoPoint;
      latestGeoPoint = mapController.listenerMapSingleTapping.value!;
      await mapController.addMarker(latestGeoPoint!,
          markerIcon: const MarkerIcon(
              icon: Icon(Icons.location_pin, color: kAfricanViolet, size: 45)));
      await mapController.removeMarker(oldGeoPoint!);
    }
    widget.onMarkerChangedCallback!(
        latestGeoPoint!.latitude, latestGeoPoint!.longitude);
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: widget.height ?? 350,
        width: widget.width,
        child: OSMFlutter(
            controller: mapController,
            mapIsLoading: const Center(
                child: CircularProgressIndicator(color: kRussianViolet)),
            onMapIsReady: (p0) async {
              try {
                await mapController.setZoom(
                    zoomLevel: widget.zoomLevel, stepZoom: 0.1);
                await mapController.limitAreaMap(const BoundingBox(
                    north: 35.05, east: 94.04, south: 8.15, west: 68.80));
              } catch (e) {
                debugPrint(e.toString());
              }
            },
            osmOption: const OSMOption(
                userTrackingOption: UserTrackingOption(enableTracking: true))));
  }

  @override
  void dispose() {
    mapController.dispose();
    super.dispose();
  }
}
