package com.example.uday.start_pages

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ImageButton
import android.widget.ListView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.example.uday.R
import com.example.uday.camera.video_activity
import com.example.uday.sos.sos_activity
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.mapbox.geojson.LineString
import com.mapbox.geojson.Point
import com.mapbox.maps.CameraOptions
import com.mapbox.maps.MapView
import com.mapbox.maps.Style
import com.mapbox.maps.extension.style.layers.addLayer
import com.mapbox.maps.extension.style.layers.generated.symbolLayer
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.geoJsonSource
import com.mapbox.maps.plugin.annotation.annotations
import com.mapbox.maps.plugin.annotation.generated.PointAnnotationOptions
import com.mapbox.maps.plugin.annotation.generated.PolygonAnnotationOptions
import com.mapbox.maps.plugin.annotation.generated.PolylineAnnotationOptions
import com.mapbox.maps.plugin.annotation.generated.createPointAnnotationManager
import com.mapbox.maps.plugin.annotation.generated.createPolygonAnnotationManager
import com.mapbox.maps.plugin.annotation.generated.createPolylineAnnotationManager

class gotham_map : Fragment() {

    private lateinit var mapView: MapView
    private lateinit var initial_location: Point
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var blue_zone: List<Point>
    private lateinit var mint_zone: List<Point>
    private lateinit var cyclone_map: List<Point>
    private lateinit var sos: ImageButton

    private val LOCATION_PERMISSION_REQUEST_CODE = 100

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_gotham_map, container, false)

// Initialize map view and location client
        mapView = view.findViewById(R.id.mapView)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

// Load the map style
        val initialLongitude = 77.4911222
        val initialLatitude = 26.6463603
        mapView.getMapboxMap().loadStyleUri(Style.SATELLITE_STREETS) { style ->
            // Set initial camera position
            mapView.getMapboxMap().setCamera(
                CameraOptions.Builder()
                    .center(Point.fromLngLat(initialLongitude, initialLatitude))
                    .zoom(2.5)
                    .build()
            )
            initial_location = Point.fromLngLat(initialLongitude, initialLatitude)
            cyclone()

            // Add the red marker icon to the map style
            val redMarkerDrawable =
                ContextCompat.getDrawable(requireContext(), R.drawable.red_marker)
            redMarkerDrawable?.let { drawable ->
                val bitmap = BitmapUtils.getBitmapFromDrawable(drawable)
                bitmap?.let {
                    style.addImage("red_marker", it)
                }
            }

            setupMap(style)
        }
// Handle "My Location" button click
        val myLocationButton: FloatingActionButton = view.findViewById(R.id.mylocation)
        myLocationButton.setOnClickListener {
            fetchAndCenterOnCurrentLocation()
        }

        sos = view.findViewById(R.id.sosm)
        sos.setOnClickListener {
            val intent1 = Intent(requireContext(), sos_activity::class.java)
            startActivity(intent1)
        }

// Show BottomSheet with categories for map options (Hospitals, Fire Stations, Police Stations)
        val showSheetButton: ImageButton = view.findViewById(R.id.firstresponders_datam)
        showSheetButton.setOnClickListener {
            showBottomSheet()
            Log.d("BottomSheet", "BottomSheet clicked")
        }

        return view
    }

        // Load GeoJSON file from the assets folder
        private fun loadGeoJsonFromAsset(context: Context, filename: String): String {
            return context.assets.open(filename).bufferedReader().use { it.readText() }
        }

        private fun setupMap(style: Style) {
            // Add icons for different categories
            addIconToStyle(style, "hospital_icon", R.drawable.hospital_icon)
            addIconToStyle(style, "fire_icon", R.drawable.fire_stations)
            addIconToStyle(style, "police_icon", R.drawable.police_icon)
        }

        // Add icon to map style
        private fun addIconToStyle(style: Style, iconName: String, iconRes: Int) {
            val iconDrawable = ContextCompat.getDrawable(requireContext(), iconRes)
            iconDrawable?.let {
                val bitmap = drawableToBitmap(it)
                bitmap?.let { bmp -> style.addImage(iconName, bmp) }
            }
        }

        // Show bottom sheet with list of options to choose locations to display
        private fun showBottomSheet() {
            val dialog = BottomSheetDialog(requireContext())
            val view = layoutInflater.inflate(R.layout.bottom_sheet_layout, null)

            val listView = view.findViewById<ListView>(R.id.listView)
            val options = listOf("Hospitals", "Fire Stations", "Police Stations")

            val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, options)
            listView.adapter = adapter

            listView.setOnItemClickListener { _, _, position, _ ->
                val selectedOption = options[position]
                dialog.dismiss()
                displayLocationsOnMap(selectedOption)
            }

            dialog.setContentView(view)
            dialog.show()
        }

        // Display selected locations on the map based on the category
        private fun displayLocationsOnMap(category: String) {
            // Determine the correct GeoJSON file based on the selected category
            val geoJsonFile = when (category) {
                "Hospitals" -> "hospitals.json"
                "Fire Stations" -> "fire_stations.json"
                "Police Stations" -> "police_stations.json"
                else -> return
            }

            // Load GeoJSON data
            val geoJsonData = loadGeoJsonFromAsset(requireContext(), geoJsonFile)

            mapView.getMapboxMap().getStyle { style ->
                // Remove old layers to prevent duplication
                style.removeStyleLayer("location_layer")
                style.removeStyleSource("location_source")

                // Create and add new GeoJSON source
                val locationSource = geoJsonSource("location_source") {
                    data(geoJsonData)
                }
                style.addSource(locationSource)

                // Select appropriate icon for the category
                val iconName = when (category) {
                    "Hospitals" -> "hospital_icon"
                    "Fire Stations" -> "fire_icon"
                    "Police Stations" -> "police_icon"
                    else -> return@getStyle
                }

                // Add Symbol Layer for markers with the selected icon
                val locationLayer = symbolLayer("location_layer", "location_source") {
                    iconImage(iconName)
                    iconAllowOverlap(true)
                    iconIgnorePlacement(true)
                }
                style.addLayer(locationLayer)
            }
        }

        fun drawableToBitmap(drawable: Drawable): Bitmap? {
            if (drawable is BitmapDrawable) {
                return drawable.bitmap
            }
            val width = drawable.intrinsicWidth
            val height = drawable.intrinsicHeight
            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            return bitmap
        }



        private fun requestLocationPermissions() {
        requestPermissions(
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
            LOCATION_PERMISSION_REQUEST_CODE
        )
    }

    private fun fetchAndCenterOnCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            requestLocationPermissions()
            return
        }
        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                // Center the map on the user's location
                centerMapOnLocation(location.longitude, location.latitude)
                var loc = Point.fromLngLat(location.longitude,location.latitude)
                check_danger(loc)

                // Add a marker at the user's location
                mapView.getMapboxMap().getStyle { style ->
                    val annotationApi = mapView.annotations
                    val pointAnnotationManager = annotationApi.createPointAnnotationManager()

                    pointAnnotationManager.deleteAll()

                    // Create a point annotation
                    val pointAnnotationOptions = PointAnnotationOptions()
                        .withPoint(Point.fromLngLat(location.longitude, location.latitude))
                        .withIconImage("red_marker")

                    // Add the point annotation to the map
                    pointAnnotationManager.create(pointAnnotationOptions)

                }
            } else {
                Toast.makeText(
                    requireContext(),
                    "Unable to fetch location. Turn on GPS.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    private fun centerMapOnLocation(longitude: Double, latitude: Double) {
        mapView.getMapboxMap().setCamera(
            CameraOptions.Builder()
                .center(Point.fromLngLat(longitude, latitude))
                .zoom(7.0) // Adjust zoom level for clarity
                .build()
        )
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                fetchAndCenterOnCurrentLocation()
            } else {
                Toast.makeText(requireContext(), "Permission denied!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    object BitmapUtils {
        fun getBitmapFromDrawable(drawable: Drawable): Bitmap? {
            return if (drawable is BitmapDrawable) {
                drawable.bitmap
            } else {
                val bitmap = Bitmap.createBitmap(
                    drawable.intrinsicWidth,
                    drawable.intrinsicHeight,
                    Bitmap.Config.ARGB_8888
                )
                val canvas = Canvas(bitmap)
                drawable.setBounds(0, 0, canvas.width, canvas.height)
                drawable.draw(canvas)
                bitmap
            }
        }
    }

    override fun onStart() {
        super.onStart()
        mapView.onStart()
    }

    override fun onStop() {
        super.onStop()
        mapView.onStop()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        mapView.onDestroy()
    }

    //Cyclone map
    fun cyclone() {
        val annotationApi = mapView?.annotations

        val polygonAnnotationManager = annotationApi?.createPolygonAnnotationManager()
        val polylineAnnotationManager = mapView.annotations.createPolylineAnnotationManager()

        mint_zone = listOf(
            Point.fromLngLat(85.4624392, 21.2712534),
            Point.fromLngLat(85.9191281, 21.5540530),
            Point.fromLngLat(86.3976794, 21.7022658),
            Point.fromLngLat(86.9720517, 21.6835018),
            Point.fromLngLat(87.6179557, 21.4008027),
            Point.fromLngLat(88.1905860, 21.0431827),
            Point.fromLngLat(88.5602121, 20.5865332),
            Point.fromLngLat(89.0642690, 19.9877267),
            Point.fromLngLat(89.4204164, 19.4162690),
            Point.fromLngLat(89.8753696, 18.7221999),
            Point.fromLngLat(90.2985772, 18.4807991),
            Point.fromLngLat(90.8775481, 18.3745982),
            Point.fromLngLat(91.6605497, 18.2241107),
            Point.fromLngLat(92.1762516, 17.8794790),
            Point.fromLngLat(92.4993239, 17.3759264),
            Point.fromLngLat(92.6096628, 16.7831279),
            Point.fromLngLat(92.5637060, 16.1028298),
            Point.fromLngLat(92.0574020, 15.6439862),
            Point.fromLngLat(91.3902136, 15.3799438),
            Point.fromLngLat(90.2300319, 15.1832013),
            Point.fromLngLat(89.1510563, 15.1533743),
            Point.fromLngLat(88.1299455, 15.2684669),
            Point.fromLngLat(87.2218626, 15.5097212),
            Point.fromLngLat(86.4720672, 16.2251981),
            Point.fromLngLat(85.8909319, 16.9391580),
            Point.fromLngLat(85.5305984, 17.6380334),
            Point.fromLngLat(85.2434897, 18.2244129),
            Point.fromLngLat(84.9785293, 18.7859986),
            Point.fromLngLat(84.7783186, 19.2834665),
            Point.fromLngLat(84.6738649, 19.7227763),
            Point.fromLngLat(84.6071174, 20.1444332),
            Point.fromLngLat(84.7343681, 20.5305267),
            Point.fromLngLat(85.0222023, 20.9167407),
            Point.fromLngLat(85.4624392, 21.2712534),
        )
        val polygonAnnotationOptions3: PolygonAnnotationOptions = PolygonAnnotationOptions()
            .withPoints(listOf(mint_zone))
            // Style the polygon that will be added to the map.
            .withFillColor("#A1D6B2")
            .withFillOpacity(0.2) // Outline color
        polygonAnnotationManager?.create(polygonAnnotationOptions3)

        val polylineAnnotationOptions3 = PolylineAnnotationOptions()
            .withGeometry(LineString.fromLngLats(mint_zone)) // Use the same points for the outline
            .withLineColor("#88D66C") // Stroke/outline color
            .withLineWidth(0.4) // Stroke width

        polylineAnnotationManager.create(polylineAnnotationOptions3)

        blue_zone = listOf(
            Point.fromLngLat(86.0761534, 20.7279429),
            Point.fromLngLat(86.2795055, 20.8101406),
            Point.fromLngLat(86.4942002, 20.8686851),
            Point.fromLngLat(86.8143281, 20.9006535),
            Point.fromLngLat(86.9778899, 20.8248114),
            Point.fromLngLat(87.1327595, 20.7181056),
            Point.fromLngLat(87.4383086, 20.4921741),
            Point.fromLngLat(87.7969651, 20.1357612),
            Point.fromLngLat(88.1324872, 19.6705684),
            Point.fromLngLat(88.4618174, 19.1960511),
            Point.fromLngLat(88.8113867, 18.6820246),
            Point.fromLngLat(89.1583546, 18.1138931),
            Point.fromLngLat(89.2770191, 17.6223516),
            Point.fromLngLat(89.1007957, 17.1812062),
            Point.fromLngLat(88.5733678, 16.8454885),
            Point.fromLngLat(88.0842174, 16.7477294),
            Point.fromLngLat(87.6869877, 16.8162493),
            Point.fromLngLat(87.2349540, 17.0592311),
            Point.fromLngLat(86.9380432, 17.4060474),
            Point.fromLngLat(86.4492460, 18.1906746),
            Point.fromLngLat(86.1800609, 18.5855735),
            Point.fromLngLat(85.9557630, 18.9712372),
            Point.fromLngLat(85.8128148, 19.2666463),
            Point.fromLngLat(85.6987226, 19.6084314),
            Point.fromLngLat(85.6341354, 19.9007354),
            Point.fromLngLat(85.6268370, 20.0892060),
            Point.fromLngLat(85.6610034, 20.2906579),
            Point.fromLngLat(85.7398336, 20.4729407),
            Point.fromLngLat(85.9060195, 20.6093057),
            Point.fromLngLat(86.0761534, 20.7279429),
        )
        val polygonAnnotationOptions2: PolygonAnnotationOptions = PolygonAnnotationOptions()
            .withPoints(listOf(blue_zone))
            // Style the polygon that will be added to the map.
            .withFillColor("#9694FF")
            .withFillOpacity(0.2) // Outline color
        polygonAnnotationManager?.create(polygonAnnotationOptions2)

        val polylineAnnotationOptions2 = PolylineAnnotationOptions()
            .withGeometry(LineString.fromLngLats(blue_zone)) // Use the same points for the outline
            .withLineColor("#88D66C") // Stroke/outline color
            .withLineWidth(0.4) // Stroke width

        polylineAnnotationManager.create(polylineAnnotationOptions2)

        cyclone_map = listOf(
            Point.fromLngLat(86.6524841, 19.9560899),
            Point.fromLngLat(86.7467848, 19.9896696),
            Point.fromLngLat(87.0032870, 19.9655221),
            Point.fromLngLat(87.1470647, 19.9349422),
            Point.fromLngLat(87.2261021, 19.8715229),
            Point.fromLngLat(87.3008317, 19.7941921),
            Point.fromLngLat(87.3569501, 19.6924884),
            Point.fromLngLat(87.3829109, 19.5585812),
            Point.fromLngLat(87.3520715, 19.3896326),
            Point.fromLngLat(87.2337301, 19.2210677),
            Point.fromLngLat(87.0724858, 19.1284416),
            Point.fromLngLat(86.9162549, 19.0785463),
            Point.fromLngLat(86.6720700, 19.0718932),
            Point.fromLngLat(86.4541295, 19.1892026),
            Point.fromLngLat(86.3642439, 19.2825323),
            Point.fromLngLat(86.3401058, 19.3831369),
            Point.fromLngLat(86.3172463, 19.5067340),
            Point.fromLngLat(86.3594218, 19.6525013),
            Point.fromLngLat(86.4061615, 19.7733859),
            Point.fromLngLat(86.4746408, 19.8539082),
            Point.fromLngLat(86.5528700, 19.9110162),
            Point.fromLngLat(86.6524841, 19.9560899),
        )
// Set options for the resulting fill layer.
        val polygonAnnotationOptions1: PolygonAnnotationOptions = PolygonAnnotationOptions()
            .withPoints(listOf(cyclone_map))
            // Style the polygon that will be added to the map.
            .withFillColor("#399918")
            .withFillOpacity(1.0) // Outline color
        polygonAnnotationManager?.create(polygonAnnotationOptions1)

        val polylineAnnotationOptions = PolylineAnnotationOptions()
            .withGeometry(LineString.fromLngLats(cyclone_map)) // Use the same points for the outline
            .withLineColor("#88D66C") // Stroke/outline color
            .withLineWidth(0.7) // Stroke width


        polylineAnnotationManager.create(polylineAnnotationOptions)

        val cyclone_line: List<Point> = listOf(
            Point.fromLngLat(86.8780682, 19.5012972),
            Point.fromLngLat(87.2707842, 18.9298677),
            Point.fromLngLat(87.8936492, 18.0066994),
            Point.fromLngLat(88.3678464, 17.3933010),
            Point.fromLngLat(89.0271218, 17.1493761),
            Point.fromLngLat(89.9492686, 16.7187629),
            Point.fromLngLat(91.0249806, 16.8106158),
            Point.fromLngLat(92.3106176, 16.9973193),
        )
        val polylineAnnotationOptions4 = PolylineAnnotationOptions()
            .withGeometry(LineString.fromLngLats(cyclone_line)) // Use the same points for the outline
            .withLineColor("#FF0000") // Stroke/outline color
            .withLineWidth(1.0) // Stroke width
        polylineAnnotationManager.create(polylineAnnotationOptions4)
    }

    //Checking if youser is in danger zone or not
    fun check_danger(userLocation: Point) {
        if (userLocation != initial_location) {
            when {
                isPointInPolygon(userLocation, blue_zone) -> {
                    Toast.makeText(
                        requireContext(),
                        "You are in fuckin danger!!!",
                        Toast.LENGTH_SHORT
                    )
                        .show()
                }

                isPointInPolygon(userLocation, mint_zone) -> {
                    Toast.makeText(
                        requireContext(),
                        "You are safe for a time being , haha",
                        Toast.LENGTH_SHORT
                    )
                        .show()
                }

                isPointInPolygon(userLocation, cyclone_map) -> {
                    Toast.makeText(
                        requireContext(),
                        "You are in the Cyclone Area. Take precautions!",
                        Toast.LENGTH_SHORT
                    ).show()
                }

                else -> {
                    Toast.makeText(
                        requireContext(),
                        "You are outside defined zones.",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    //Algorithm to find the point is in polygon or not
    fun isPointInPolygon(point: Point, polygon: List<Point>): Boolean {
        var intersects = 0
        val x = point.longitude()
        val y = point.latitude()

        for (i in polygon.indices) {
            val p1 = polygon[i]
            val p2 = polygon[(i + 1) % polygon.size]

            val x1 = p1.longitude()
            val y1 = p1.latitude()
            val x2 = p2.longitude()
            val y2 = p2.latitude()


            if ((y > y1) != (y > y2) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
                intersects++
            }
        }
        return intersects % 2 == 1
    }

}
